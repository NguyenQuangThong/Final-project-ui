import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

function Meeting() {
  var peerConnection;
  let navigate = useNavigate();
  document.title = 'Meeting room';
  let user = JSON.parse(localStorage.getItem('user'));
  let classroom = JSON.parse(localStorage.getItem('classroom'));
  let className = classroom.className;
  const [otherUser, setOtherUser] = useState('Other');
  let count = 0;
  let count1 = 0;
  const [linkTag, setLinkTag] = useState(
    <h1 style={{ margin: 5 }}>
      <Link target="_blank" rel="noopener noreferrer" to="/other-profile" style={{ textDecoration: 'none' }}>
        Participant
      </Link>
    </h1>,
  );

  function leave() {
    console.log('Ending call');
    peerConnection.close();
    signalingWebsocket.close();
    const localVideo = document.getElementById('local');
    const mediaStream = localVideo.srcObject;
    const tracks = mediaStream.getTracks();
    tracks.forEach((track) => track.stop());
    localStorage.removeItem('otherId');
    navigate('/class/detail');
  }

  var signalingWebsocket = new WebSocket('ws://localhost:8080/signal');

  signalingWebsocket.onmessage = function (msg) {
    if (Object.keys(JSON.parse(msg.data)).length === 6 && count < 1) {
      localStorage.setItem('otherId', JSON.parse(msg.data).accountId);
      count++;
    }

    console.log('Got message', msg.data);
    var signal = JSON.parse(msg.data);
    switch (signal.type) {
      case 'offer':
        handleOffer(signal);
        break;
      case 'answer':
        handleAnswer(signal);
        break;
      // In local network, ICE candidates might not be generated.
      case 'candidate':
        handleCandidate(signal);
        break;
      default:
        break;
    }
    if (count1 < 1) if (window.confirm('You have a call. Do you want to take it?')) disPlayLocalVideoStream(true);
  };

  // signalingWebsocket.onopen = init();

  function sendSignal(signal) {
    if (signalingWebsocket.readyState === 1) {
      signalingWebsocket.send(JSON.stringify(signal));
    }
  }

  /*
   * Initialize
   */
  function init() {
    console.log('Connected to signaling endpoint. Now initializing.');
    preparePeerConnection();
  }

  /*
   * Prepare RTCPeerConnection & setup event handlers.
   */
  function preparePeerConnection() {
    // Using free public google STUN server.
    const configuration = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };

    // Prepare peer connection object
    peerConnection = new RTCPeerConnection(configuration);
    peerConnection.onnegotiationneeded = async () => {
      console.log('onnegotiationneeded');
      sendOfferSignal();
    };
    peerConnection.onicecandidate = function (event) {
      if (event.candidate) {
        sendSignal(event);
      }
    };

    signalingWebsocket.addEventListener('open', (e) => signalingWebsocket.send(JSON.stringify(user)));

    // };

    /*
     * Track other participant's remote stream & display in UI when available.
     *
     * This is how other participant's video & audio will start showing up on my
     * browser as soon as his local stream added to track of peer connection in
     * his UI.
     */
    peerConnection.addEventListener('track', displayRemoteStream);
  }

  /*
   * Display my local webcam & audio on UI.
   */

  const disPlayLocalVideoStream = async (firstTime) => {
    count1++;
    signalingWebsocket.onopen = init();

    console.log('Requesting local stream');
    const localVideo = document.getElementById('local');
    let localVideoStream;

    try {
      // Capture local video & audio stream & set to local <video> DOM
      // element
      const videoStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      console.log('Received local stream');
      localVideo.srcObject = videoStream;
      localVideoStream = videoStream;
      logVideoAudioTrackInfo(localVideoStream);
      console.log('Local:' + videoStream);

      // For first time, add local stream to peer connection.
      if (firstTime) {
        setTimeout(function () {
          addLocalStreamToPeerConnection(localVideoStream);
        }, 2000);
      }

      // Send offer signal to signaling server endpoint.
      sendOfferSignal();
      return videoStream;
    } catch (e) {
      alert(`getUserMedia() error: ${e.name}`);
      throw e;
    }
    console.log('Start complete');
  };

  // Display my screen on my UI
  const disPlayLocalScreenStream = async (firstTime) => {
    // preparePeerConnection();

    console.log('Requesting local stream');
    const localScreen = document.getElementById('local');
    let localScreenStream;

    // Capture local video & audio stream & set to local <video> DOM
    // element
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: { width: { ideal: 1920, max: 1920 }, height: { ideal: 1080, max: 1080 } },
      });

      const localVideo = document.getElementById('local');
      const mediaStream = localVideo.srcObject;
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());

      let videoTrack = screenStream.getVideoTracks()[0];
      let sender = peerConnection.getSenders().find(function (s) {
        return s.track.kind === videoTrack.kind;
      });
      sender.replaceTrack(videoTrack);

      // peerConnection.getLocalStreams().forEach(function (stream) {
      //   peerConnection.removeStream(stream);
      // });

      console.log('Received local stream');
      localScreen.srcObject = screenStream;
      localScreenStream = screenStream;
      logVideoAudioTrackInfo(localScreenStream);
      console.log('Local:' + screenStream);
    } catch (e) {}

    console.log('Start complete');
  };

  /*
   * Add local webcam & audio stream to peer connection so that other
   * participant's UI will be notified using 'track' event.
   *
   * This is how my video & audio is sent to other participant's UI.
   */
  async function addLocalStreamToPeerConnection(localStream) {
    console.log('Starting addLocalStreamToPeerConnection');
    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
    console.log('localStream tracks added');
  }

  /*
   * Display remote webcam & audio in UI.
   */
  function displayRemoteStream(e) {
    console.log('displayRemoteStream');
    const remote = document.getElementById('remote');
    if (remote.srcObject !== e.streams[0]) {
      remote.srcObject = e.streams[0];
      console.log('pc2 received remote stream');
    }
  }

  /*
   * Send offer to signaling server. This is kind of telling server that my webcam &
   * audio is ready, so notify other participant of my information so that he can
   * view & hear me using 'track' event.
   */
  function sendOfferSignal() {
    console.log('Send user');
    signalingWebsocket.send(JSON.stringify(user));
    peerConnection.createOffer(
      function (offer) {
        sendSignal(offer);
        peerConnection.setLocalDescription(offer);
      },
      function (error) {
        alert('Error creating an offer');
      },
    );
  }

  /*
   * Handle the offer sent by other participant & send back answer to complete the
   * handshake.
   */
  function handleOffer(offer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    // create and send an answer to an offer
    peerConnection.createAnswer(
      function (answer) {
        peerConnection.setLocalDescription(answer);
        sendSignal(answer);
      },
      function (error) {
        alert('Error creating an answer');
      },
    );
  }

  /*
   * Finish the handshake by receiving the answer. Now Peer-to-peer connection is
   * established between my browser & other participant's browser. Since both
   * participants are tracking each others stream, they both will be able to view &
   * hear each other.
   */
  function handleAnswer(answer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    console.log('connection established successfully!!');
  }

  /*
   * Add received ICE candidate to connection. ICE candidate has information about
   * how to connect to remote participant's browser. In local LAN connection, ICE
   * candidate might not be generated.
   */
  function handleCandidate(candidate) {
    alert('handleCandidate');
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }

  /*
   * Logs names of your webcam & microphone to console just for FYI.
   */
  function logVideoAudioTrackInfo(localStream) {
    const videoTracks = localStream.getVideoTracks();
    const audioTracks = localStream.getAudioTracks();
    if (videoTracks.length > 0) {
      console.log(`Using video device: ${videoTracks[0].label}`);
    }
    if (audioTracks.length > 0) {
      console.log(`Using audio device: ${audioTracks[0].label}`);
    }
  }

  const turnOffScreenShare = async (e) => {
    console.log('Requesting local stream');
    const localVideo = document.getElementById('local');
    let localVideoStream;

    // Capture local video & audio stream & set to local <video> DOM
    // element
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      const local = document.getElementById('local');
      const mediaStream = local.srcObject;
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());

      let videoTrack = videoStream.getVideoTracks()[0];
      let sender = peerConnection.getSenders().find(function (s) {
        return s.track.kind === videoTrack.kind;
      });
      sender.replaceTrack(videoTrack);

      // peerConnection.getLocalStreams().forEach(function (stream) {
      //   peerConnection.removeStream(stream);
      // });

      console.log('Received local stream');
      localVideo.srcObject = videoStream;
      localVideoStream = videoStream;
      logVideoAudioTrackInfo(localVideoStream);
      console.log('Local:' + videoStream);
    } catch (e) {}

    console.log('Start complete');
  };

  const turnOffCamera = (e) => {
    document.getElementById('local').captureStream().getVideoTracks()[0].enabled = false;
  };

  const turnOnCamera = (e) => {
    document.getElementById('local').captureStream().getVideoTracks()[0].enabled = true;
  };

  const turnOffMicro = (e) => {
    document.getElementById('local').captureStream().getAudioTracks()[0].enabled = false;
  };

  const turnOnMicro = (e) => {
    document.getElementById('local').captureStream().getAudioTracks()[0].enabled = true;
  };

  return (
    <div className="container">
      <div className="container">
        <div className="row">
          <div className="col" style={{ textAlign: 'center' }}>
            <h1>Welcome to Group_{className}</h1>
            <br></br>
            {/* <h3 style={{ margin: 5 }}>{otherUser}</h3> */}
            {linkTag}
            <video
              style={{ width: '150vh', height: '50vh' }}
              id="remote"
              poster="https://img.icons8.com/fluent/48/000000/person-male.png"
              autoPlay
            ></video>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ textAlign: 'center' }}>
            <div>
              <h3 style={{ margin: 5 }}>{user.username}(You)</h3>
              <video
                style={{ width: 'auto', height: '20vh' }}
                id="local"
                poster="https://img.icons8.com/fluent/48/000000/person-male.png"
                autoPlay
                muted
              ></video>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'inline-block', textAlign: 'center' }} className="container">
        <button
          className="btn btn-primary"
          onClick={() => {
            disPlayLocalVideoStream(true);
          }}
        >
          <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={() => disPlayLocalScreenStream(false)}>
          <FontAwesomeIcon icon={faShareFromSquare}></FontAwesomeIcon>
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={turnOffScreenShare}>
          <FontAwesomeIcon icon={faLinkSlash}></FontAwesomeIcon>
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={turnOffCamera}>
          <FontAwesomeIcon icon={faVideoSlash}></FontAwesomeIcon>
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={turnOnCamera}>
          <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={turnOffMicro}>
          <FontAwesomeIcon icon={faMicrophoneSlash}></FontAwesomeIcon>
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={turnOnMicro}>
          <FontAwesomeIcon icon={faMicrophone}></FontAwesomeIcon>
        </button>
        &nbsp;
        <button id="leaveButton" onClick={leave} className="btn btn-primary">
          <FontAwesomeIcon icon={faPhoneSlash}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
export default Meeting;

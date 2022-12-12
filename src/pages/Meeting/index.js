import axios from 'axios';
import React, { useState, useEffect } from 'react';
function Meeting() {
  var peerConnection;

  function leave() {
    console.log('Ending call');
    peerConnection.close();
    signalingWebsocket.close();
    window.location.href = '/class/detail';
  }

  var signalingWebsocket = new WebSocket('ws://localhost:8080/signal');

  signalingWebsocket.onmessage = function (msg) {
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
  };

  signalingWebsocket.onopen = init();

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
    // displayLocalStreamAndSignal(true);
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

  //   useEffect(() => {
  //     const displayLocalStreamAndSignal = async ()
  //   })
  const disPlayLocalVideoStream = async (firstTime) => {
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

      // const screenStream = await navigator.mediaDevices.getDisplayMedia({
      //   audio: true,
      //   video: true,
      // });

      console.log('Received local stream');
      localVideo.srcObject = videoStream;
      localVideoStream = videoStream;
      logVideoAudioTrackInfo(localVideoStream);
      console.log('Local:' + videoStream);

      // remoteScreen.srcObject = remoteScreenStream;
      // remoteScreenStream = screenStream;
      // logVideoAudioTrackInfo(remoteScreenStream);
      // console.log('Remote:' + remoteScreen);

      // For first time, add local stream to peer connection.
      if (firstTime) {
        setTimeout(function () {
          addLocalStreamToPeerConnection(localVideoStream);
          // addLocalStreamToPeerConnection(remoteScreenStream);
        }, 2000);
      }

      // Send offer signal to signaling server endpoint.
      sendOfferSignal();
      // return stream;
    } catch (e) {
      alert(`getUserMedia() error: ${e.name}`);
      throw e;
    }
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
    const remoteVideo = document.getElementById('remote');
    // const remoteScreen = document.getElementById('remoteScreen');
    if (remoteVideo.srcObject !== e.streams[0]) {
      remoteVideo.srcObject = e.streams[0];
      console.log('pc2 received remote stream');
    }
    // if (remoteScreen.srcObject !== e.streams[0]) {
    //   remoteScreen.srcObject = e.streams[0];
    // }
  }

  /*
   * Send offer to signaling server. This is kind of telling server that my webcam &
   * audio is ready, so notify other participant of my information so that he can
   * view & hear me using 'track' event.
   */
  function sendOfferSignal() {
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
    <div>
      <div>
        <img
          style={{ float: 'left', width: 'auto', height: '50px' }}
          alt=""
          src="https://itsallbinary.com/wp-content/uploads/2017/03/final_itsallbinary.gif"
        />
        <h3 style={{ position: 'relative', left: 10 }}>
          WebRTC Video Conferencing <br />
          Application Demo
        </h3>
      </div>

      <div className="container">
        <div className="row">
          <div className="col" style={{ textAlign: 'center' }}>
            <h3 style={{ margin: 5 }}>Other</h3>
            <video
              style={{ width: '50vh', height: '50vh' }}
              id="remote"
              poster="https://img.icons8.com/fluent/48/000000/person-male.png"
              autoPlay
            ></video>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ textAlign: 'center' }}>
            <div>
              <h3 style={{ margin: 5 }}>You</h3>
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

      <button
        onClick={() => {
          disPlayLocalVideoStream(true);
        }}
      >
        Call
      </button>
      <button
        onClick={async () => {
          let localVideoStream;
          const screenStream = await navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: true,
          });

          console.log('Received local stream');
          localVideoStream = screenStream;
          logVideoAudioTrackInfo(localVideoStream);
          console.log('Local:' + screenStream);
          addLocalStreamToPeerConnection(true);
        }}
      >
        Share screen
      </button>
      <div>
        <button onClick={turnOffCamera}>Turn off camera</button>
        <button onClick={turnOnCamera}>Turn on camera</button>
      </div>
      <div>
        <button onClick={turnOffMicro}>Turn off micro</button>
        <button onClick={turnOnMicro}>Turn on micro</button>
      </div>

      <div className="box">
        <button id="leaveButton" style={{ backgroundColor: '#008cba', color: 'white' }} onClick={leave}>
          Leave Video Conference
        </button>
      </div>
    </div>
  );
}
export default Meeting;

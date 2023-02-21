import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
function Chat() {
  const [stompClient, setStompClient] = useState(null);
  const [name, setName] = useState(null);
  const [text, setText] = useState(null);
  const [connectButton, setConnectButton] = useState(true);
  const [disConnectButton, setDisConnectButton] = useState(true);

  useEffect(() => {
    connect();
  }, []);

  function setConnected(value) {
    setConnectButton(!value);
    setDisConnectButton(!value);
  }

  function setUser(e) {
    setName(e.target.value);
  }

  function setMessage(e) {
    setText(e.target.value);
  }

  function connect() {
    var connection = Stomp.over(new SockJS('https://localhost:8080/gs-guide-websocket'));
    setStompClient(connection);
    connection.connect({}, function (frame) {
      setConnected(true);
      console.log('Connected: ' + frame);
      connection.subscribe('/topic/messages', function (messageOutput) {
        showMessageOutput(JSON.parse(messageOutput.body));
      });
    });
  }

  function disconnect() {
    if (stompClient != null) {
      stompClient.disconnect();
    }
    setConnected(false);
    console.log('Disconnected');
  }

  function sendMessage() {
    stompClient.send('/app/chat', {}, JSON.stringify({ from: name, text: text }));
  }

  function showMessageOutput(messageOutput) {
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(
      document.createTextNode(messageOutput.from + ': ' + messageOutput.text + ' (' + messageOutput.time + ')'),
    );
    response.appendChild(p);
  }

  return (
    <div>
      <div>
        <input type="text" id="from" placeholder="Choose a nickname" onChange={setUser} />
      </div>
      <br />
      <div>
        {/* <button id="connect" onClick={connect} disabled={connectButton ? false : true}>
          Connect
        </button> */}
        <button id="disconnect" onClick={disconnect} disabled={disConnectButton ? true : false}>
          Disconnect
        </button>
      </div>
      <br />
      <div id="conversationDiv" style={{ visibility: !connectButton ? 'visible' : 'hidden' }}>
        <input type="text" id="text" placeholder="Write a message..." onChange={setMessage} />
        <button id="sendMessage" onClick={sendMessage}>
          Send
        </button>
        <p id="response"></p>
      </div>
    </div>
  );
}
export default Chat;

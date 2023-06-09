import React from 'react';
import { useState, useEffect } from 'react';
import { render } from 'react-dom';

const statuses = {
  work: "work",
  rest: "rest",
  off: "off"
}

const workTime = 1200;
const restTime = 20;

const formatTime = time => {
  let m = Math.floor(time / 60)
  let s = (time - (m * 60))
  if (s < 10) {
    s = '0' + s;
  }
  if (m < 10) {
    m = '0' + m;
  }
  const convertedTime = m + ':' + s;
  return convertedTime;
}

const playBell = () => {
  const bell = new Audio('./sounds/bell.wav');
  bell.play();
};

const App = () => {
  const [status, setStatus] = useState(statuses.off)
  const [time, setTime] = useState(0)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (time === 0) {
      if (status === statuses.work) {
        playBell();
        setStatus(statuses.rest)
        setTime(restTime);
      } else if (status === statuses.rest) {
        playBell();
        setStatus(statuses.work)
        setTime(workTime);
      }
    }
  }, [time]);

  const startTimer = () => {
    setTime(workTime);
    setStatus(statuses.work);
    setTimer(setInterval(() => {
      setTime(time => time - 1);
    }, 1000));
  }

  const stopTimer = () => {
    setTimer(clearInterval);
    setTime(0);
    setStatus(statuses.off);
  }

  const closeApp = () => {
    window.close();
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === statuses.off && <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>}
      {status === statuses.off && <p>This app will help you track your time and inform you when it's time to rest.</p>}
      {status === statuses.work && <img src="./images/work.png" />}
      {status === statuses.rest && <img src="./images/rest.png" />}
      {status !== statuses.off && <div className="timer">
        {formatTime(time)}
      </div>}
      {status === statuses.off && <button className="btn" onClick={startTimer}>Start</button>}
      {status !== statuses.off && <button className="btn" onClick={stopTimer}>Stop</button>}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
}

render(<App />, document.querySelector('#app'));

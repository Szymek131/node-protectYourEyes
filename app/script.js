import React from 'react';
import { useState } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off')
  const [time, setTime] = useState(0)
  const [timer, setTimer] = useState(null)

  const formatTime = time => {
    let m = Math.floor(time / 60)
    let s = (time - (m * 60))
    if (s < 10) {
      s = '0' + s;
    }
    if (m < 10) {
      m = '0' + m;
    }
    const convertedTime = (m) + ':' + s;
    return convertedTime;
  }

  if (time === 0) {
    if (status === 'work') {
      setStatus('rest')
      setTime(20);
    } else if (status === 'rest') {
      setStatus('work')
      setTime(1200);
    }
  }

  const startTimer = () => {
    setTime(10);
    setStatus('work');
    setTimer(setInterval(() => {
      setTime(time => time - 1);
    }, 1000));
  }

  const stopTimer = () => {
    setTimer(null);
    setTime(0);
    setStatus('off');
  }

  const closeApp = () => {
    window.close();
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>}
      {status === 'off' && <p>This app will help you track your time and inform you when it's time to rest.</p>}
      {status === 'work' && <img src="./images/work.png" />}
      {status === 'rest' && <img src="./images/rest.png" />}
      {status !== 'off' && <div className="timer">
        {formatTime(time)}
      </div>}
      {status === 'off' && <button className="btn" onClick={startTimer}>Start</button>}
      {status !== 'off' && <button className="btn" onClick={stopTimer}>Stop</button>}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
}

render(<App />, document.querySelector('#app'));

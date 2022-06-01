import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  const [jarak, setJarak] = useState("0");
  const [text, setText] = useState("");

  useInterval(async () => {
    const response = await axios.get("http://localhost:5000/range/last");
    const { range } = response.data;
    setJarak(range);
    if (jarak <= 10) {
      setText("Danger");
    } else if (jarak >= 11 && jarak <= 20) {
      setText("Safe");
    } else {
      setText("Far");
    }
  }, 0);

  return (
    <div className='container text-center mt-5'>
      <h1>{jarak}
      </h1>
      <h1>
        <span class="badge rounded-pill bg-secondary">{text}</span>
      </h1>
    </div>
  );
}

export default App;

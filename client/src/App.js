import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';

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

  
  useInterval(() => {
      const rand = Math.floor(Math.random() * 10);
      setJarak(rand);
  }, 2000);

  return (
    <div className='container text-center mt-5'>
      {jarak}
    </div>
  );
}

export default App;

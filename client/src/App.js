import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  LineChart,
  ResponsiveContainer,
  Legend, Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const pdata = [
  {
    name: 'PHP',
    student: 5,
    fees: 10
  },
  {
    name: 'Java',
    student: "10",
    fees: 5
  },
  {
    name: 'C#',
    student: "10",
    fees: 4
  },
  {
    name: 'C++',
    student: "10",
    fees: 8
  },
];

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
  const [statistic, setStatistic] = useState([]);

  useInterval(async () => {
    const response = await axios.get("http://localhost:5000/range/last");
    const response2 = await axios.get("http://localhost:5000/range");
    const datas = response2.data;
    setStatistic(datas);
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
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={statistic} margin={{ right: 300 }}>
          <CartesianGrid />
          <XAxis
            interval={'preserveStartEnd'} />
          <YAxis></YAxis>
          <Legend />
          <Tooltip />
          <Line dataKey="range"
            stroke="black" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <h1>
        {jarak} cm
      </h1>
      <h1>
        <span class="badge rounded-pill bg-secondary">{text}</span>
      </h1>
    </div>
  );
}

export default App;

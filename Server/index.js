import express from 'express';
import { Ranges } from './models/Sensor.js';
import db from './config/Database.js';

const app = express();
const PORT = 5000;

try {
    await db.authenticate();
    // await Ranges.sync();
    console.log("Database connected");

} catch(err) {
    console.log(err);
}

app.use(express.json());

app.get("/hello", async(req, res) => {
  res.json({message: "Masuk gan!"});
})

app.post("/add", async(req, res) => {
  const { range } = req.body;
  try {
      console.log(req);
      console.log(req.body);
      console.log(range);
      await Ranges.create({
        range: range
      });
      res.status(200).json({message: "Berhasi mengirim data!"});
  } catch(err) {
    console.log(err);
    res.json({message: "Error internal"});
  }
})

app.listen(PORT, () => console.log("Server running at http://localhost:5000"));
import express from 'express';
// import db from './config/Database.js';

const app = express();
const PORT = 5000;

// try {
//     await db.authenticate();
//     console.log("Database connected");
// } catch(err) {
//     console.log(err);
// }

app.use(express.json());

app.get("/hello", async(req, res) => {
  res.json({message: "Masuk gan!"});
})

app.listen(PORT, () => console.log("Server running at http://localhost:5000"));
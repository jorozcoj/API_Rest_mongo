import express from "express";
import { config } from "dotenv";
import { mongoose } from "mongoose";
import  bodyParser  from "body-parser";
//import {movieRutes} from './routes/movie-route'
config();
//import  {router}  from "./routes/movie-route";
import {obtener} from './routes/movie-route';

const app = express();
app.use(bodyParser.json())

//establecer conección a la base de datos
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
const db = mongoose.connection

app.use('/movies',obtener)

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(201).send("Hello world from mongoDB and Node APp");
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

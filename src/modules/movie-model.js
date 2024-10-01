import { mongoose } from "mongoose";

export const moviesSchema = new mongoose.Schema({
  id: Int,
  title: String,
  year: Date,
  director: String,
  duration: Int,
  poster: URL,
  genre: String,
  rate: Int,
});

import { Schema, model } from "mongoose";

const FileSchema = new Schema({
  nombre: String,
  extension: String,
  fechaCarga: String,
});

export const File = model("files", FileSchema);

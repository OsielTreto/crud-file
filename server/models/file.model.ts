import { Schema, model } from "mongoose";

const FileSchema = new Schema({
  nombre: String,
  extension: String,
  fechaCarga: String,
  pdf: Buffer, // Campo para almacenar el contenido del archivo PDF
});

export const File = model("files", FileSchema);

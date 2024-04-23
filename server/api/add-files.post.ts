import { File } from "../models/file.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const fileCreado = await File.create({
    nombre: body.nombre,
    extension: body.extension,
    fechaCarga: body.fechaCarga,
  });
  return fileCreado;
});

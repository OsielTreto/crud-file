import { File } from "../models/file.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await File.findByIdAndUpdate(body._id, {
    nombre: body.nombre,
    extension: body.extension,
    fechaCarga: body.fechaCarga,
  });
  return body;
});

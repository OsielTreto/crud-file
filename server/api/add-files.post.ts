import { File } from "../models/file.model";

export default defineEventHandler(async (event) => {
  console.log("event ", event);
  // if (!event.request.files || !event.request.files.pdf) {
  //   return new Response("No se proporcionó un archivo PDF", { status: 400 });
  // }

  const body = await readBody(event);
  // const pdfFile = event.request.files.pdf;

  const fileCreado = await File.create({
    nombre: body.nombre,
    extension: body.extension,
    fechaCarga: body.fechaCarga,
    // file: pdfFile.content,
  });
  return fileCreado;
});

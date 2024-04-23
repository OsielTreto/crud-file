import { File } from "~/server/models/file.model";
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    const peliculaEliminada = await File.findByIdAndDelete(id);

    return peliculaEliminada;
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "El id no es valido",
    });
  }
});

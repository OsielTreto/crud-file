import { File } from "../models/file.model";

export default defineEventHandler(async (event) => {
  // const body = await readBody(event)
  // return { body }
  return {
    archivos: await File.find(),
  };
});

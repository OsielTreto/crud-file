import { defineStore } from "pinia";
import axios from "axios";

interface IState {
  files: IFiles[];
  fileActual: IFiles | null;
}

export const useFilesStore = defineStore("files", {
  state: (): IState => ({
    files: [],
    fileActual: null,
  }),

  actions: {
    async getFiles() {
      try {
        const { data } = await axios.get("http://localhost:4000/data");

        this.files = data as any;
        console.log("getFiles ");
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async addFiles(body: {
      nombre: string;
      fechaReporte: string;
      file: string;
    }) {
      try {
        const messageStore = useMessageStore();

        // await axios.post("/api/add-files", body, {
        const response = await axios.post("http://localhost:4000/data", body);
        console.log("response ", response.status);

        if (response.status == 200 || response.status == 201) {
          messageStore.setMessage(
            "success",
            "Alta exitosa",
            "El reporte se ha guardado con exito"
          );
          console.log("Alta exitosa");
        } else {
          messageStore.setMessage(
            "error",
            "A ocurrido un error",
            "Error al guardar el reporte"
          );
          console.log("Error");
        }

        // navigateTo("/");
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async deleteFiles(id: string) {
      try {
        const messageStore = useMessageStore();

        // await axios.delete(`/api/delete-files/${id}`);
        const response = await axios.delete(`http://localhost:4000/data/${id}`);
        // this.files = this.files.filter((val) => val.id !== id);
        console.log("response", response);

        if (response.status == 200 || response.status == 201) {
          messageStore.setMessage(
            "success",
            "",
            "El reporte se ha eliminado con exito"
          );
          console.log("Alta exitosa");
        } else {
          messageStore.setMessage(
            "error",
            "A ocurrido un error",
            "Error al eliminar el reporte"
          );
          console.log("Error");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    setFileActual(files: IFiles | null) {
      this.fileActual = files;
    },

    async editFiles(body: IFiles) {
      try {
        await axios.patch("/api/edit-files", body);
        navigateTo("/");
      } catch (error) {
        console.error("Error al actualizar:", error);
      }
    },
  },
});

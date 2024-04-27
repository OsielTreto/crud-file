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
      const { apiBase } = useRuntimeConfig().public;
      const messageStore = useMessageStore();

      try {
        const { data } = await axios.get(`${apiBase}`);

        this.files = data as any;
        // console.log("getFiles ");
      } catch (error) {
        messageStore.setMessage(
          "error",
          "Ha ocurrido un error",
          "Error al consultar: " + error
        );
      }
    },

    async addFiles(body: {
      nombre: string;
      fechaReporte: string;
      file: string;
    }) {
      const { apiBase } = useRuntimeConfig().public;

      const messageStore = useMessageStore();
      try {
        // await axios.post("/api/add-files", body, {
        const response = await axios.post(`${apiBase}`, body);
        // console.log("response ", response.status);

        if (response.status == 200 || response.status == 201) {
          messageStore.setMessage(
            "success",
            "Alta exitosa",
            "El reporte se ha guardado con éxito"
          );
          // console.log("Alta exitosa");
        } else {
          messageStore.setMessage(
            "error",
            "Ha ocurrido un error",
            "Error al guardar el reporte"
          );
          // console.log("Error");
        }

        // navigateTo("/");
      } catch (error) {
        messageStore.setMessage(
          "error",
          "Ha ocurrido un error",
          "Error al guardar: " + error
        );
      }
    },

    async deleteFiles(id: string) {
      const { apiBase } = useRuntimeConfig().public;

      const messageStore = useMessageStore();
      try {
        // await axios.delete(`/api/delete-files/${id}`);
        const response = await axios.delete(`${apiBase}/${id}`);
        // this.files = this.files.filter((val) => val.id !== id);
        // console.log("response", response);

        if (response.status == 200 || response.status == 201) {
          messageStore.setMessage(
            "success",
            "",
            "El reporte se ha eliminado con éxito"
          );
          // console.log("Alta exitosa");
        } else {
          messageStore.setMessage(
            "error",
            "Ha ocurrido un error",
            "Error al eliminar el reporte"
          );
          // console.log("Error");
        }
      } catch (error) {
        messageStore.setMessage(
          "error",
          "Ha ocurrido un error",
          "Error al eliminar: " + error
        );
      }
    },

    setFileActual(files: IFiles | null) {
      this.fileActual = files;
      // console.log("this.fileActual ", this.fileActual);
    },

    async editFiles(id: string, body: IFiles) {
      const { apiBase } = useRuntimeConfig().public;

      const messageStore = useMessageStore();
      try {
        // await axios.patch("/api/edit-files", body);
        const response = await axios.put(`${apiBase}/${id}`, body);
        if (response.status == 200 || response.status == 201) {
          messageStore.setMessage(
            "success",
            "Actualizacion exitosa",
            "El reporte se ha actualizado con exito"
          );
          // console.log("Alta exitosa");
        } else {
          messageStore.setMessage(
            "error",
            "Ha ocurrido un error",
            "Error al actualizar el reporte"
          );
          // console.log("Error");
        }
      } catch (error) {
        // console.error("Error al actualizar:", error);
        messageStore.setMessage(
          "error",
          "Ha ocurrido un error",
          "Error al actualizar: " + error
        );
      }
    },
  },
});

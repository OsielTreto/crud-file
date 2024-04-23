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
        const { data } = await axios.get("/api/get-list-files");
        console.log("data ", data);

        this.files = (data as any).archivos;
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async addFiles(body: {
      nombre: string;
      extension: string;
      fechaCarga: string;
    }) {
      try {
        await axios.post("/api/add-files", body);
        navigateTo("/");
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async deleteFiles(id: string) {
      try {
        await axios.delete(`/api/delete-files/${id}`);
        this.files = this.files.filter((val) => val._id !== id);

        navigateTo("/");
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

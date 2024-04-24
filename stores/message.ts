import { defineStore } from "pinia";

interface IState {
  typeDialog: string | null;
  title: string | null;
  message: string | null;
}

export const useMessageStore = defineStore("message", {
  state: (): IState => ({
    typeDialog: null,
    title: null,
    message: null,
  }),
  actions: {
    cleanDialog() {
      this.message = null;
      this.typeDialog = null;
      this.title = null;
    },
    setMessage(typeDialog: string, title: string, message: string) {
      this.typeDialog = typeDialog;
      this.title = title;
      this.message = message;
    },
  },
});

<template>
  <VDialog persistent v-model="show" width="40vw">
    <div class="dialog-confirm">
      <VRow justify="end">
        <VBtn variant="flat" icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </VBtn>
      </VRow>
      <VRow justify="center">
        <VCol
          cols="12"
          class="text-h6 text-uppercase os-title"
          style="margin-top: -50px"
        >
          Información del archivo
        </VCol>
      </VRow>
      <VRow justify="center" class="px-5">
        <VCol cols="6" class="font-weight-bold"> Nombre: </VCol>
        <VCol cols="6"> {{ file.nombreArchivo }} </VCol>
        <VCol cols="6" class="font-weight-bold"> Extensión: </VCol>
        <VCol cols="6"> {{ file.extension }} </VCol>

        <VCol cols="6" class="font-weight-bold"> Tamaño: </VCol>
        <VCol cols="6"> {{ file.size }} </VCol>
        <VCol cols="10">
          <VBtn color="primary" block @click="handleDownload"> Descargar </VBtn>
        </VCol>
      </VRow>
    </div>
  </VDialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    file: {
      type: Object,
      required: true,
    },
  },

  created() {
    // console.log("file", this.file);
  },

  methods: {
    handleDownload() {
      // console.log("Descargar");

      const byteCharacters = atob(this.file.contenidoBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = this.file.nombreArchivo;

      // Agregar el enlace al DOM y hacer clic en él para iniciar la descarga
      document.body.appendChild(link);
      link.click();

      // Limpiar el enlace y liberar la URL del objeto blob
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
  },
});
</script>

<style scoped></style>

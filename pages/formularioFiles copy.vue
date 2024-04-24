<template>
  <v-container class="centrar">
    <v-row justify="center">
      <v-col cols="12">
        <Form
          ref="formAdd"
          :title="title"
          @submit="procesarFormulario"
          @cancel="navigateTo('/')"
          :form="form"
        />
      </v-col>
    </v-row>
    <!-- <VCard width="450" class="ma-auto">
      <VCardTitle> {{ title }} reporte </VCardTitle>
      <VCardText>
        <VForm @submit.prevent="procesarFormulario">
          <VTextField v-model="form.nombreReporte" label="Nombre" />

          <v-date-picker
            label="Fecha"
            locale="es"
            justify="space-around"
            v-model="selectedDate"
            show-adjacent-months
          ></v-date-picker>

          <v-file-input
            v-model="selectedFile"
            label="Seleccionar archivo"
            accept=".pdf"
          ></v-file-input>

          <VBtn variant="tonal" :loading="loading" type="submit" block
            >Guardar</VBtn
          >
          <VBtn
            class="mt-2"
            variant="tonal"
            color="error"
            :disabled="loading"
            block
            @click="navigateTo('/')"
            >Cancelar</VBtn
          >
        </VForm>
      </VCardText>
    </VCard> -->
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedFile = ref<File | null>(null);
const selectedDate = ref<string | null>(null);
const base64String = ref<string | null>(null);
let json: {
  nombreArchivo: string | undefined;
  extension: string | undefined;
  contenidoBase64: string | null;
} = { nombreArchivo: undefined, extension: undefined, contenidoBase64: null };

const loading = ref(false);
const fileStore = useFilesStore();
const { addFiles, editFiles, setFileActual } = fileStore;
const { fileActual } = storeToRefs(fileStore);

const form = reactive({
  nombreReporte: fileActual.value ? fileActual.value.nombreReporte : "",
});

const convertAndSave = async () => {
  if (selectedFile.value) {
    const reader = new FileReader();

    reader.onload = async () => {
      base64String.value = reader.result as string;
      await saveToJson();
    };

    reader.readAsDataURL(selectedFile.value);
  } else {
    console.error("No se ha seleccionado ningún archivo.");
  }
};

const saveToJson = async () => {
  json = {
    nombreArchivo: selectedFile.value?.name,
    extension: selectedFile.value?.type,
    contenidoBase64: base64String.value,
  };
  console.log("saveToJson", json);

  console.log("send", { ...form, fecha: selectedDate.value, file: json });
  await addFiles({ ...form, fechaReporte: selectedDate.value, file: json }); // Ahora json está disponible
};

const procesarFormulario = async () => {
  loading.value = true;
  await convertAndSave(); // Espera a que convertAndSave() se complete
  if (fileActual.value) {
    await editFiles({ ...form, _id: fileActual.value._id });
  }
  loading.value = false;
};

const probar = () => {
  loading.value = true;
  console.log("selectedFile", selectedFile);
  console.log("form ", form);
  loading.value = false;
};

const title = computed(() => (fileActual.value ? "Editar" : "Agregar"));

onUnmounted(() => {
  setFileActual(null);
});
</script>

<style scoped>
.centrar {
  display: flex;
  height: 80vh;
}
</style>

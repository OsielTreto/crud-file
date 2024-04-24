<template>
  <VContainer class="centrar">
    <VRow justify="center">
      <VCol cols="12">
        <Form
          ref="formAdd"
          :title="title"
          @handleForm="guardarForm"
          @cancel="navigateTo('/')"
          :form="form"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";

let selectedFile = ref<File | null>(null);
let selectedDate = ref<string | null>(null);
let base64String = ref<string | null>(null);
let json: {
  nombreArchivo: string | undefined;
  extension: string | undefined;
  contenidoBase64: string | null;
} = { nombreArchivo: undefined, extension: undefined, contenidoBase64: null };

const loading = ref(false);
const fileStore = useFilesStore();
const { addFiles, editFiles, setFileActual } = fileStore;
const { fileActual } = storeToRefs(fileStore);

let form = reactive({
  nombreReporte: fileActual.value ? fileActual.value.nombreReporte : "",
});

const convertAndSave = async () => {
  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = async () => {
      base64String.value = reader.result as string;
      await saveToJson();
    };

    reader.readAsDataURL(selectedFile);
  } else {
    console.error("No se ha seleccionado ningún archivo.");
  }
};

const saveToJson = async () => {
  json = {
    nombreArchivo: selectedFile.name,
    extension: selectedFile.type,
    contenidoBase64: base64String.value,
  };
  console.log("saveToJson", json);

  console.log("send", { ...form, fecha: selectedDate, file: json });
  await addFiles({ ...form, fechaReporte: selectedDate, file: json }); // Ahora json está disponible
};

const guardarForm = async (obj: any) => {
  selectedDate = obj.fechaReporte;
  selectedFile = obj.selectedFile;
  form.nombreReporte = obj.nombreReporte;

  await procesarFormulario();
};

const procesarFormulario = async () => {
  loading.value = true;
  await convertAndSave(); // Espera a que convertAndSave() se complete
  if (fileActual.value) {
    await editFiles({ ...form, _id: fileActual.value._id });
  }
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

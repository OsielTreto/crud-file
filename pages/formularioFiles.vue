<template>
  <VContainer class="centrar">
    <VCard width="450" class="ma-auto">
      <VCardTitle> {{ title }} archivos </VCardTitle>
      <VCardText>
        <VForm @submit.prevent="procesarFormulario">
          <VTextField v-model="form.nombre" label="Nombre" />
          <VTextField v-model="form.extension" label="Extension" />
          <VTextField v-model="form.fechaCarga" label="FechaCarga" />
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
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
const loading = ref(false);
const fileStore = useFilesStore();
const { addFiles, editFiles, setFileActual } = fileStore;
const { fileActual } = storeToRefs(fileStore);

const form = reactive({
  nombre: fileActual.value ? fileActual.value.nombre : "",
  extension: fileActual.value ? fileActual.value.extension : "",
  fechaCarga: fileActual.value ? fileActual.value.fechaCarga : "",
});

const procesarFormulario = async () => {
  loading.value = true;
  if (fileActual.value) {
    await editFiles({ ...form, _id: fileActual.value._id });
  } else {
    await addFiles(form);
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

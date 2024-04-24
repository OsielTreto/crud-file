<template>
  <VContainer>
    <VRow>
      <VCol cols="12" class="text-h4 pa-5">Reportes</VCol>
      <VCol cols="3">
        <VBtn block variant="tonal" @click="getFiles()"> Consultar </VBtn>
      </VCol>

      <VCol cols="12">
        <v-card flat>
          <template v-slot:text>
            <VTextField
              v-model="search"
              label="Filtrar"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            />
          </template>

          <VDataTable :headers="headers" :items="files" :search="search">
            <template v-slot:item.acciones="{ item }">
              <VBtn
                variant="text"
                color="warning"
                icon="mdi-file-edit"
                @click="navegarFormulario(item)"
              />
              <VBtn
                variant="text"
                color="error"
                icon="mdi-delete"
                @click="handleDelete(item)"
              />
            </template>

            <template v-slot:item.documento="{ item }">
              <VBtn
                variant="text"
                color="primary"
                prepend-icon="mdi-file-document"
                @click="navegarFormulario(item)"
              >
                {{ item.file.nombreArchivo }}</VBtn
              >
            </template>
          </VDataTable>
        </v-card>
      </VCol>
    </VRow>
    <VRow justify="end">
      <VCol cols="auto">
        <VBtn
          color="primary"
          icon="mdi-plus"
          @click="navigateTo('/formularioFiles')"
        />
      </VCol>
    </VRow>
    <DialogConfirm
      :show="show"
      :action="action"
      :reporte="reporte"
      @cancel="
        show = false;
        idReporte = null;
        reporte = null;
        action = null;
      "
      @confirm="handleDeleteFiles()"
    />
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

const search = ref("");
const headers = ref([
  {
    align: "start",
    key: "nombreReporte",
    sortable: true,
    title: "Nombre",
  },
  {
    align: "start",
    key: "fechaReporte",
    title: "Fecha",
  },
  {
    align: "start",
    key: "documento",
    title: "Archivo",
    sortable: false,
  },
  {
    align: "start",
    key: "acciones",
    title: "Acciones",
    sortable: false,
  },
]);

const fileStore = useFilesStore();

const { getFiles, deleteFiles, setFileActual } = fileStore;

// const { obtenerPeliculas, eliminar, setPeliculaActual } = peliculaStore;
const { files } = storeToRefs(fileStore);
await getFiles();
const reporte = ref<string | null>(null);
const idReporte = ref<string | null>(null);
const action = ref<string | null>(null);

const show = ref<boolean>(false);

const handleDelete = (file: IFiles) => {
  console.log(file);
  show.value = true;
  reporte.value = file.nombreReporte;
  idReporte.value = file.id;
  action.value = "eliminar";
};

const navegarFormulario = (file: IFiles) => {
  setFileActual(file);
  navigateTo("/formularioFiles");
};

const handleDeleteFiles = async () => {
  await deleteFiles(idReporte.value);
  show.value = false;
  await getFiles();
};
</script>

<style scoped></style>

<template>
  <VContainer>
    <VRow>
      <VCol>
        <VBtn icon="mdi-plus" @click="navigateTo('/formularioFiles')" />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VTable>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Extension</th>
              <th>Fecha carga</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in files">
              <td>{{ i.nombre }}</td>
              <td>{{ i.extension }}</td>
              <td>{{ i.fechaCarga }}</td>
              <td>
                <VBtn
                  variant="text"
                  color="warning"
                  icon="mdi-file-edit"
                  @click="navegarFormulario(i)"
                />
                <VBtn
                  variant="text"
                  color="error"
                  icon="mdi-delete"
                  @click="deleteFiles(i._id)"
                />
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const fileStore = useFilesStore();

const { getFiles, deleteFiles, setFileActual } = fileStore;

// const { obtenerPeliculas, eliminar, setPeliculaActual } = peliculaStore;
const { files } = storeToRefs(fileStore);

await getFiles();

const navegarFormulario = (file: IFiles) => {
  setFileActual(file);
  navigateTo("/formularioFiles");
};
</script>

<style scoped></style>

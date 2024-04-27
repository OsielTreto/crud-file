<template>
  <div>
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

      <VDataTable
        :headers="columns"
        :items="data"
        :search="search"
        :items-per-page-options="pageOptions"
      >
        <template v-slot:item.acciones="{ item }">
          <VBtn variant="plain" color="secondary" icon="mdi-file-edit" />
          <VBtn variant="plain" color="secondary" icon="mdi-delete" />
        </template>

        <template v-slot:item.documento="{ item }">
          <VBtn
            variant="plain"
            color="primary"
            prepend-icon="mdi-file-document"
          >
            {{ item.file.nombreArchivo }}</VBtn
          >
        </template>
      </VDataTable>
    </v-card>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  //   name: "table",
  props: {
    data: {
      type: [Object, Array],
      description: "El mismo formato aceptado por Vuetify",
      required: true,
      default: () => [],
    },

    columns: {
      type: [Object, Array],
      description: "El mismo formato aceptado por Vuetify",
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      search: null,
      pageOptions: [
        { value: 5, title: "5" },
        { value: 10, title: "10" },
        { value: 50, title: "50" },
        { value: 100, title: "100" },
        { value: -1, title: "$vuetify.dataFooter.itemsPerPageAll" },
      ],
    };
  },
});
</script>

<style scoped></style>

<template>
  <div>
    <v-card>
      <v-card-title class="text-h4 pa-5 text-uppercase os-title"
        >{{ title }} reporte</v-card-title
      >
      <v-card-text>
        <VForm ref="formAdd" @submit.prevent="save" class="pa-5">
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                variant="solo"
                mask="/^[a-zA-Z\s]*$/"
                v-model="nombreReporte"
                label="Nombre"
                :rules="[(value) => !!value || 'Nombre es requerido.']"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VDialog max-width="300px" persistent lazy>
                <template v-slot:activator="{ props: activatorProps }">
                  <VTextField
                    variant="solo"
                    v-model="date"
                    label="Fecha"
                    prepend-inner-icon="mdi-calendar-range"
                    readonly
                    v-bind="activatorProps"
                    :rules="[(value) => !!value || 'Fecha es requerido.']"
                  ></VTextField>
                </template>

                <template v-slot:default="{ isActive }">
                  <VRow justify="space-around" class="dialog">
                    <v-date-picker
                      color="primary"
                      full-width
                      v-model="selectedDate"
                      shortDate
                    ></v-date-picker>

                    <VCol cols="6">
                      <VBtn
                        style="margin-top: -50px"
                        block
                        flat
                        @click="isActive.value = false"
                        color="cancel"
                        >Cancelar</VBtn
                      >
                    </VCol>
                    <VCol cols="6">
                      <VBtn
                        style="margin-top: -50px"
                        block
                        flat
                        color="primary"
                        @click="
                          saveDate();
                          isActive.value = false;
                        "
                        >Guardar</VBtn
                      >
                    </VCol>
                  </VRow>
                </template>
              </VDialog>
            </VCol>

            <VCol cols="12" md="6">
              <VFileInput
                variant="solo"
                v-model="selectedFile"
                label="Archivo"
                accept=".pdf"
                prepend-icon=""
                prepend-inner-icon="mdi-file"
                :rules="[
                  (value) =>
                    !!value.length || `El archivo es requerido ${value}`,
                ]"
              />
            </VCol>

            <!-- <VCol cols="12" md="6">
              <VBtn
                class="mt-2"
                variant="flat"
                color="cancel"
                block
                @click="console.log('selectedFile ', selectedFile.size)"
                rounded="lg"
                >PDF</VBtn
              >
            </VCol> -->
          </VRow>

          <VRow justify="end">
            <v-col cols="12" md="4">
              <VBtn
                class="mt-2"
                variant="flat"
                color="cancel"
                :disabled="loading"
                block
                @click="$emit('cancel')"
                rounded="lg"
                >Cancelar</VBtn
              >
            </v-col>

            <v-col cols="12" md="4">
              <VBtn
                class="mt-2"
                variant="flat"
                :loading="loading"
                color="primary"
                type="submit"
                rounded="lg"
                block
                >Guardar</VBtn
              >
            </v-col>
          </VRow>
        </VForm>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

function formatearFecha(fecha: Date): string {
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const año = fecha.getFullYear();

  const diaFormateado = dia < 10 ? `0${dia}` : `${dia}`;
  const mesFormateado = mes < 10 ? `0${mes}` : `${mes}`;

  return `${diaFormateado}/${mesFormateado}/${año}`;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

const fileStore = useFilesStore();

const { fileActual } = storeToRefs(fileStore);

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showDatePicker: false,
      nombreReporte: "",
      date: null,
      selectedDate: null,
      dateFormat: "DD/MM/YYYY",
      //   selectedDate: ref<string | null>(null),
      // selectedFile: ref<File | null>(null),
      selectedFile: null,
      loading: false,
      customFormat: "DD/MM/YYYY",
    };
  },

  created() {
    // console.log("fileActual ", fileActual.value.file);
    if (!!fileActual && !!fileActual.value) {
      this.nombreReporte = fileActual.value.nombreReporte;
      this.date = fileActual.value.fechaReporte;
      // console.log("fileActual.value.file ", fileActual.value.file);

      this.selectedFile = {
        name: fileActual.value.file.nombreArchivo,
      };
    }
  },

  computed: {
    fileRules() {
      return [(value) => !!value || "El archivo es requerido."];
    },
  },

  methods: {
    async save(event) {
      const result = await event;

      if (!!result.valid) {
        this.$emit("handleForm", {
          nombreReporte: this.nombreReporte,
          fechaReporte: this.date,
          selectedFile: this.selectedFile,
          sizeFile: formatBytes(this.selectedFile.size),
        });
      }
      // if (!!this.nombreReporte && !this.date && !this.selectedFile) {
      // } else {
      // console.log("emit handleForm");
      // console.log(formatBytes(this.selectedFile.size));
      //
      // }
    },

    saveDate() {
      this.date = formatearFecha(this.selectedDate);
      // console.log("this.date ", this.date);
    },
  },
});
</script>

<style scoped></style>

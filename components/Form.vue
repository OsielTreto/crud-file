<template>
  <div>
    <div class="text-h4 pa-5">{{ title }} reporte</div>
    <VForm @submit.prevent="save">
      <VRow>
        <VCol cols="12" md="6">
          <VTextField
            variant="solo"
            mask="/^[a-zA-Z\s]*$/"
            v-model="nombreReporte"
            label="Nombre"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VDialog max-width="300px" persistent lazy>
            <template v-slot:activator="{ props: activatorProps }">
              <VTextField
                variant="solo"
                v-model="date"
                label="Seleccionar fecha"
                prepend-inner-icon="mdi-calendar-range"
                readonly
                v-bind="activatorProps"
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
            label="Seleccionar archivo"
            accept=".pdf"
            prepend-icon=""
            prepend-inner-icon="mdi-file"
          />
        </VCol>
      </VRow>

      <VRow>
        <v-col cols="12" md="4" offset="4">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

function formatearFecha(fecha: Date): string {
  // Obtener los componentes de la fecha
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11
  const año = fecha.getFullYear();

  // Formatear los componentes con ceros a la izquierda si es necesario
  const diaFormateado = dia < 10 ? `0${dia}` : `${dia}`;
  const mesFormateado = mes < 10 ? `0${mes}` : `${mes}`;

  // Devolver la fecha en formato dd/mm/aaaa
  return `${diaFormateado}/${mesFormateado}/${año}`;
}

const messageStore = useMessageStore();

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
      selectedFile: ref<File | null>(null),
      loading: false,
      customFormat: "DD/MM/YYYY",
    };
  },

  methods: {
    save() {
      if (!this.nombreReporte || !this.date || !this.selectedFile) {
        messageStore.setMessage(
          "warning",
          "Apreciable usuario",
          "Ingrese los campos faltantes"
        );
      } else {
        // console.log("emit handleForm");
        this.$emit("handleForm", {
          nombreReporte: this.nombreReporte,
          fechaReporte: this.date,
          selectedFile: this.selectedFile,
        });
      }
    },

    saveDate() {
      this.date = formatearFecha(this.selectedDate);
      console.log("this.date ", this.date);
    },
  },
});
</script>

<style scoped></style>

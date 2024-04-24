<template>
  <VDialog persistent v-model="show" width="auto">
    <!-- <v-card
      :text="`¿Desea ${action} el reporte ${reporte}?`"
      :title=""
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="$emit('cancel')"> Cancelar </v-btn>

        <v-btn @click="$emit('confirm')"> Aceptar </v-btn>
      </template>
    </v-card> -->
    <div class="dialog-confirm">
      <VRow justify="center">
        <VCol cols="12 " class="text-uppercase text-h5">
          {{ `${action} reporte` }}
        </VCol>
        <VCol cols="12"> {{ `¿Desea ${action} el reporte ${reporte}?` }} </VCol>
        <VCol cols="12" md="3" offset="6">
          <VBtn
            class="mt-2"
            variant="flat"
            color="cancel"
            block
            @click="$emit('cancel')"
            rounded="lg"
            >Cancelar</VBtn
          >
        </VCol>
        <VCol cols="12" md="3">
          <VBtn
            class="mt-2"
            variant="flat"
            color="primary"
            @click="$emit('confirm')"
            rounded="lg"
            block
            >Aceptar</VBtn
          >
        </VCol>
      </VRow>
    </div>
  </VDialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },

    action: {
      type: String,
      default: null,
    },

    reporte: {
      type: String,
      default: null,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>

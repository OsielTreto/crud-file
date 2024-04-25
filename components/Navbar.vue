<template>
  <v-app-bar app color="primary" class="px-10">
    <v-toolbar-title>
      <div>
        <v-img
          :width="60"
          aspect-ratio="4/3"
          cover
          src="../img/pemex.png"
          alt="Pemex"
        ></v-img>
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="navigateTo('/')">Reportes</v-btn>
      <v-btn @click="navigateTo('/contact')">Contacto</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
});
</script>

<style scoped></style>

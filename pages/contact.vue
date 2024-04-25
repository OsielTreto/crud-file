<template>
  <VContainer>
    <VRow align="center" style="height: 70vh">
      <VCol cols="12">
        <v-card class="MarcoCamara">
          <v-card-text>
            <div class="pa-5">
              <div class="osiel text-h2">Hola soy Osiel</div>
              <div class="pt-5 desarrollador text-h3">Y soy desarrollador</div>
              <div
                class="mt-3"
                style="
                  height: 2px;
                  width: 60%;
                  background-color: rgb(29, 29, 29);
                "
              />
              <VRow justify="start">
                <VCol cols="auto" class="py-6">
                  <VBtn
                    variant="text"
                    class="redsocial_inicio"
                    href="https://www.facebook.com/Osiel.Treto.1"
                    target="_blank"
                    icon="mdi-facebook"
                  >
                  </VBtn>
                </VCol>
                <VCol cols="auto" class="py-6">
                  <VBtn
                    variant="text"
                    class="redsocial_inicio"
                    href="https://www.linkedin.com/in/osieltreto"
                    target="_blank"
                    icon="mdi-linkedin"
                  >
                  </VBtn>
                </VCol>
                <VCol cols="auto" class="py-6">
                  <VBtn
                    variant="text"
                    class="redsocial_inicio"
                    href="https://github.com/OsielTreto"
                    target="_blank"
                    icon="mdi-github"
                  >
                  </VBtn>
                </VCol>
                <VCol cols="auto" class="py-6">
                  <VBtn
                    variant="text"
                    class="redsocial_inicio"
                    href="https://www.instagram.com/leizo194/"
                    target="_blank"
                    icon="mdi-instagram"
                  >
                  </VBtn>
                </VCol>
              </VRow>
            </div>
          </v-card-text>
        </v-card>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts"></script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>

<template>
  <VDialog persistent v-model="show" width="auto">
    <VAlert :title="title" :color="typeDialog" :text="message">
      <template #close>
        <VBtn
          icon="mdi-close-circle"
          size="large"
          class="btn-close"
          @click="handleClose()"
        ></VBtn>
      </template>
    </VAlert>
  </VDialog>
</template>

<script setup lang="ts">
const messageStore = useMessageStore();
const { typeDialog, message, title } = storeToRefs(messageStore);

const show = computed(() => (typeDialog.value ? true : false));

const handleClose = () => {
  // console.log("handleClose");
  if (typeDialog.value == "success") {
    // console.log("success");
    messageStore.cleanDialog();
    navigateTo("/");
  } else if (typeDialog.value == "warning") {
    // console.log("warning");
    messageStore.cleanDialog();
  } else {
    messageStore.cleanDialog();
  }
};
</script>

<style scoped>
/* Estilos personalizados para tu vista */
</style>

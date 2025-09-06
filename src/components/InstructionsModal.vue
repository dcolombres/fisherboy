<template>
  <div id="instructions" :class="{ 'instructions-fade': instructionsHidden }">
    Usa las flechas ← → para mover el barco<br>
    Usa la flecha ↑ para lanzar la caña
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'InstructionsModal',
  setup() {
    const store = useStore();

    const instructionsHidden = computed(() => store.getters.getInstructionsHidden);

    return {
      instructionsHidden,
    };
  },
};
</script>

<style scoped>
/* Estilos para InstructionsModal */
#instructions {
    position: fixed;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.2);
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    text-align: center;
    transition: opacity 1s ease-out; /* Transición para el desvanecimiento */
}

.instructions-fade {
    opacity: 0;
    /* display: none; will be handled by Vue logic */
}
</style>
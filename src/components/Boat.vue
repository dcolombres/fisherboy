<template>
  <div id="boat" :style="{ left: boatPosition + '%', bottom: '45%' }">
    <div id="fisher"></div>
    <div id="fishingLine" :class="fishingDepth" :style="{ backgroundColor: fishingLineColor }"></div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Boat',
  setup() {
    const store = useStore();

    const boatPosition = computed(() => store.state.boatPosition);
    const fishingDepth = computed(() => store.state.fishingDepth);
    const currentRod = computed(() => store.state.currentRod);

    const fishingLineColor = computed(() => {
      switch (currentRod.value) {
        case 0: return 'white'; // Caña Básica
        case 1: return 'yellow'; // Caña Profesional
        case 2: return 'magenta'; // Caña Maestra
        default: return 'white';
      }
    });

    return {
      boatPosition,
      fishingDepth,
      fishingLineColor,
    };
  },
};
</script>

<style scoped>
/* Estilos para Boat movidos a style.css */
</style>
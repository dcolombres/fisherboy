<template>
  <div class="water"></div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Water',
  setup() {
    const store = useStore();

    const isNight = computed(() => store.getters.getIsNight);
    const stormActive = computed(() => store.getters.getStormActive);

    return {
      isNight,
      stormActive,
    };
  },
};
</script>

<style scoped>
/* Estilos para Water */
.water {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(180deg, #0066cc 0%, #003366 100%);
    opacity: 0.8;
    z-index: 0;
}

.water.night-time {
    background: linear-gradient(180deg, #001428 0%, #000810 100%);
}

.water.storm-active {
    background: linear-gradient(180deg, #004080 0%, #001f3f 100%);
    animation: waves 2s ease-in-out infinite;
}

@keyframes waves {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
}
</style>
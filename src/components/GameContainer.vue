<template>
  <div id="gameContainer" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <UIOverlay />
    <MarketModal />
    <StatsModal />
    <GoalsModal />
    <RecycleModal />
    <TreasuresModal />
    <EquipmentModal />
    <InstructionsModal />
    <MapModal />
    <CreditsModal />
    <SettingsModal />
    
    <Boat />
    <Storm />
    <Water />
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

// Importar componentes hijos
import UIOverlay from './UIOverlay.vue';
import MarketModal from './MarketModal.vue';
import StatsModal from './StatsModal.vue';
import GoalsModal from './GoalsModal.vue';
import RecycleModal from './RecycleModal.vue';
import TreasuresModal from './TreasuresModal.vue';
import InstructionsModal from './InstructionsModal.vue';
import MapModal from './MapModal.vue';
import CreditsModal from './CreditsModal.vue';
import SettingsModal from './SettingsModal.vue';

import EquipmentModal from './EquipmentModal.vue';
import Boat from './Boat.vue';
import Storm from './Storm.vue';
import Water from './Water.vue';

export default {
  name: 'GameContainer',
  components: {
    UIOverlay,
    MarketModal,
    StatsModal,
    GoalsModal,
    RecycleModal,
    TreasuresModal,
    InstructionsModal,
    MapModal,
    CreditsModal,
    SettingsModal,
    
    EquipmentModal,
    Boat,
    Storm,
    Water
  },
  setup() {
    const store = useStore();
    let pressTimer = null;

    const fishFighting = computed(() => store.getters.getFishFighting);

    const handleMouseDown = () => {
      if (fishFighting.value) {
        store.dispatch('fightFish');
      } else {
        pressTimer = setTimeout(() => {
          store.dispatch('startDeepFishing');
        }, 1000);
      }
    };

    const handleMouseUp = () => {
      clearTimeout(pressTimer);
    };

    const handleTouchStart = () => {
      if (fishFighting.value) {
        store.dispatch('fightFish');
      } else {
        pressTimer = setTimeout(() => {
          store.dispatch('startDeepFishing');
        }, 1000);
      }
    };

    const handleTouchEnd = () => {
      clearTimeout(pressTimer);
    };

    const startFishing = () => {
      if (store.state.isFishing) return;
      store.dispatch('startFishing');
    };

    // Ciclo de vida
    onMounted(() => {
      window.addEventListener('keydown', (e) => {
        store.dispatch('handleKeyDown', e.code);
      });
      setInterval(() => {
        store.dispatch('gameTick');
      }, 1000);
      store.dispatch('initializeGame');
    });

    return {
      handleMouseDown,
      handleMouseUp,
      handleTouchStart,
      handleTouchEnd,
      startFishing,
    };
  },
};
</script>

<style>
/* Estilos para GameContainer */
</style>
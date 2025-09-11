<template>
  <div id="gameContainer" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
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
import { computed, onMounted, reactive } from 'vue';
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
    const touchState = reactive({
      touchStartX: 0,
      touchStartY: 0,
      touchEndX: 0,
      touchEndY: 0,
    });

    const fishFighting = computed(() => store.getters.getFishFighting);

    const handleGesture = () => {
      const deltaX = touchState.touchEndX - touchState.touchStartX;
      const deltaY = touchState.touchEndY - touchState.touchStartY;
      const swipeThreshold = 30; // pixels

      if (Math.abs(deltaX) > Math.abs(deltaY)) { // Horizontal swipe
        if (Math.abs(deltaX) > swipeThreshold) {
          if (deltaX > 0) {
            store.dispatch('moveBoat', { x: 1 });
          } else {
            store.dispatch('moveBoat', { x: -1 });
          }
        }
      } else { // Vertical swipe
        if (Math.abs(deltaY) > swipeThreshold) {
          if (deltaY > 0) {
            store.dispatch('moveBoat', { y: 1 });
          } else {
            store.dispatch('moveBoat', { y: -1 });
          }
        }
      }

      // If it's not a swipe, it's a tap
      if (Math.abs(deltaX) < swipeThreshold && Math.abs(deltaY) < swipeThreshold) {
        if (fishFighting.value) {
          store.dispatch('tapToFightFish');
        } else {
          store.dispatch('startFishing');
        }
      }
    };

    const handleTouchStart = (e) => {
      touchState.touchStartX = e.touches[0].clientX;
      touchState.touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      touchState.touchEndX = e.changedTouches[0].clientX;
      touchState.touchEndY = e.changedTouches[0].clientY;
      handleGesture();
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
      handleTouchStart,
      handleTouchEnd,
    };
  },
};
</script>

<style>
/* Estilos para GameContainer */
</style>
<template>
  <div id="gameContainer">
    <UIOverlay />
    <MarketModal />
    <StatsModal />
    <GoalsModal />
    <RecycleModal />
    <TreasuresModal />
    <EquipmentModal />
    <InstructionsModal />
    
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
    
    EquipmentModal,
    Boat,
    Storm,
    Water
  },
  setup() {
    const store = useStore();

    // Usar 'reactive' para el estado local del componente que no necesita ser global
    const localState = reactive({
      isFishing: false,
      boatPosition: 50,
    });

    // Acciones
    const startFishing = () => {
      if (store.state.isFishing) return;
      store.dispatch('startFishing');
    };

    const moveBoat = (direction) => {
      store.dispatch('moveBoat', direction);
    };

    const handleKeyDown = (e) => {
      store.dispatch('handleKeyDown', e.code);
    };

    // Ciclo de vida
    onMounted(() => {
      document.addEventListener('keydown', handleKeyDown);
      setInterval(() => {
        store.dispatch('gameTick');
      }, 1000);
      store.dispatch('initializeGame');
    });

    return {
      ...toRefs(localState),
      startFishing,
      moveBoat,
    };
  },
};
</script>

<style>
/* Estilos para GameContainer */
</style>

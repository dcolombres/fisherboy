<template>
  <div class="equipment-dropdown">
    <div class="equipment-section">
      <p>Caña Actual</p>
      <button @click="selectRod(0)" :class="{ selected: currentRod === 0 }">Básica</button>
      <button @click="selectRod(1)" :class="{ locked: !unlockedRods[1], selected: currentRod === 1 }">Profesional</button>
      <button @click="selectRod(2)" :class="{ locked: !unlockedRods[2], selected: currentRod === 2 }">Maestra</button>
    </div> 
    <div class="equipment-section">
      <p>Barco Actual</p>
      <button @click="selectBoat(0)" :class="{ selected: currentBoat === 0 }">Básico</button>
      <button @click="selectBoat(1)" :class="{ locked: !unlockedBoats[1], selected: currentBoat === 1 }">Avanzado</button>
      <button @click="selectBoat(2)" :class="{ locked: !unlockedBoats[2], selected: currentBoat === 2 }">Profesional</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Equipment',
  setup() {
    const store = useStore();
    return {
      currentRod: computed(() => store.state.currentRod),
      currentBoat: computed(() => store.state.currentBoat),
      unlockedRods: computed(() => store.state.unlockedRods),
      unlockedBoats: computed(() => store.state.unlockedBoats),
      selectRod: (index) => store.dispatch('selectRod', index),
      selectBoat: (index) => store.dispatch('selectBoat', index),
    };
  },
};
</script>

<style scoped>
.equipment-dropdown {
  position: absolute;
  right: 0;
  top: 100%; /* Posicionado justo debajo del botón que lo activa */
  background: rgba(55,55,55,1);
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 220px;
  z-index: 100;
  border-top: 1px solid #888;
}

.equipment-section {
    margin-bottom: 10px; 
    padding-bottom: 10px;
    border-bottom: 1px solid #555;
}
.equipment-section:last-child {
    border-bottom: none;
}

.equipment-section p {
    margin: 5px 0 10px 0;
    font-size: 0.9em;
    text-align: center;
    font-weight: bold;
}
.equipment-section button {
    margin: 2px 5px;
    width: calc(33.333% - 10px);
    padding: 5px;
    font-size: 0.8em;
    background-color: #333;
    border: 1px solid #555;
    color: white;
}
.equipment-section button.selected {
    background-color: #4CAF50;
    border-color: #45a049;
}
.locked {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
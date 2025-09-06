<template>
  <div id="equipment">
    <div class="equipment-section">
      <p>Equipo</p>
      <button @click="selectRod(0)" :class="{ selected: currentRod === 0 }">Caña Básica</button><br>
      <button @click="selectRod(1)" id="proRod" :class="{ locked: !unlockedRods[1], selected: currentRod === 1 }">Caña Profesional (${{ fishingRods[1].price }})</button><br>
      <button @click="selectRod(2)" id="masterRod" :class="{ locked: !unlockedRods[2], selected: currentRod === 2 }">Caña Maestra (${{ fishingRods[2].price }})</button>
    </div> 
    <div class="equipment-section">
      <button @click="selectBoat(0)" :class="{ selected: currentBoat === 0 }">Barco Básico</button><br>
      <button @click="selectBoat(1)" id="advancedBoat" :class="{ locked: !unlockedBoats[1], selected: currentBoat === 1 }">Barco Avanzado (${{ boats[1].price }})</button><br>
      <button @click="selectBoat(2)" id="proBoat" :class="{ locked: !unlockedBoats[2], selected: currentBoat === 2 }">Barco Profesional (${{ boats[2].price }})</button>
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

    const currentRod = computed(() => store.getters.getCurrentRod);
    const currentBoat = computed(() => store.getters.getCurrentBoat);
    const unlockedRods = computed(() => store.getters.getUnlockedRods);
    const unlockedBoats = computed(() => store.getters.getUnlockedBoats);
    const fishingRods = computed(() => store.state.fishingRods); // Asumiendo que fishingRods está en el estado
    const boats = computed(() => store.state.boats); // Asumiendo que boats está en el estado
    const money = computed(() => store.getters.getMoney);

    const selectRod = (index) => {
      store.dispatch('selectRod', index); // Asumiendo que esta acción existe en Vuex
    };

    const selectBoat = (index) => {
      store.dispatch('selectBoat', index); // Asumiendo que esta acción existe en Vuex
    };

    return {
      currentRod, currentBoat, unlockedRods, unlockedBoats, fishingRods, boats, money,
      selectRod, selectBoat,
    };
  },
};
</script>

<style scoped>
/* Estilos para Equipment */
#equipment {
    position: fixed;
    top: 0px;
    right: 0px;
    background: rgba(55,55,55,1);
    color: white;
    padding: 10px; 
    border-radius: 0px;
    height: 250px;
    width: 200px; 
}

.locked {
    opacity: 0.5;
    cursor: not-allowed;
}

.equipment-section {
    margin-bottom: 10px; 
    padding-bottom: 10px;
}
.equipment-section p {
    margin: 5px 0;
    font-size: 0.9em;
}
.equipment-section button {
    margin: 2px 0;
    width: 100%;
    padding: 5px;
    font-size: 0.8em;
}
.equipment-section button.selected {
    background-color: #4CAF50;
    color: white;
    border: 2px solid #45a049;
    font-weight: bold;
}
</style>
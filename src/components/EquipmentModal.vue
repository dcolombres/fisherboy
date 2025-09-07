<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Equipamiento</h2>
      <div class="equipment-content">
        <div class="equipment-section">
          <h3>Caña Actual</h3>
          <div class="equipment-items">
            <button @click="selectRod(0)" :class="{ selected: currentRod === 0 }">Básica</button>
            <button @click="selectRod(1)" :class="{ locked: !unlockedRods[1], selected: currentRod === 1 }">Profesional</button>
            <button @click="selectRod(2)" :class="{ locked: !unlockedRods[2], selected: currentRod === 2 }">Maestra</button>
          </div>
        </div>
        <div class="equipment-section">
          <h3>Barco Actual</h3>
          <div class="equipment-items">
            <button @click="selectBoat(0)" :class="{ selected: currentBoat === 0 }">Básico</button>
            <button @click="selectBoat(1)" :class="{ locked: !unlockedBoats[1], selected: currentBoat === 1 }">Avanzado</button>
            <button @click="selectBoat(2)" :class="{ locked: !unlockedBoats[2], selected: currentBoat === 2 }">Profesional</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'EquipmentModal',
  setup() {
    const store = useStore();
    const show = computed(() => store.state.modals.equipment);
    const close = () => store.dispatch('toggleModal', 'equipment');

    return {
      show,
      close,
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
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #222222;
  padding: 30px;
  width: 80%;
  max-width: 500px;
  border-radius: 15px;
  color: white;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.close {
  color: #aaa;
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close:hover,
.close:focus {
  color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.equipment-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.equipment-section {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
}

.equipment-section h3 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 15px;
}

.equipment-items {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.equipment-items button {
  flex-grow: 1;
  background-color: #333;
  border: 1px solid #555;
  color: white;
}

.equipment-items button.selected {
  background-color: #4CAF50;
  border-color: #45a049;
}

.locked {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
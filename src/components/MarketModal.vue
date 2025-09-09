<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Mercado del Pescador</h2>
      <div class="market-equipment">
        <div class="equipment-category">
          <h3>Cañas de Pescar</h3>
          <div class="equipment-items">
            <div v-for="(rod, index) in fishingRods" :key="index" class="equipment-item" :class="{ selected: index === currentRod }">
              <div class="equipment-info">
                <div class="equipment-name">{{ rod.name }} <span v-if="index === currentRod">(Equipado)</span></div>
                <div class="equipment-stats">Poder: {{ rod.power }}x | Velocidad: {{ rod.speed }}x | Tasa de Captura: {{ Math.round(rod.catchRate * 100) }}%</div>
              </div>
              <div v-if="unlockedRods[index]">
                <button class="btn btn-secondary" @click="selectRod(index)" :disabled="index === currentRod">Equipar</button>
              </div>
              <div v-else>
                <span class="equipment-price">${{ rod.price }}</span>
                <button class="btn btn-primary" @click="buyRod(index)" :disabled="money < rod.price">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="equipment-category">
          <h3>Barcos</h3>
          <div class="equipment-items">
            <div v-for="(boat, index) in boats" :key="index" class="equipment-item" :class="{ selected: index === currentBoat }">
              <div class="equipment-info">
                <div class="equipment-name">{{ boat.name }} <span v-if="index === currentBoat">(Equipado)</span></div>
                <div class="equipment-stats">Velocidad: {{ boat.speedMultiplier }}x | Bono de Captura: {{ boat.catchBonus }}x</div>
              </div>
              <div v-if="unlockedBoats[index]">
                <button class="btn btn-secondary" @click="selectBoat(index)" :disabled="index === currentBoat">Equipar</button>
              </div>
              <div v-else>
                <span class="equipment-price">${{ boat.price }}</span>
                <button class="btn btn-primary" @click="buyBoat(index)" :disabled="money < boat.price">
                  Comprar
                </button>
              </div>
            </div>
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
  name: 'MarketModal',
  setup() {
    const store = useStore();
    const show = computed(() => store.state.modals.market);
    const close = () => store.dispatch('toggleModal', 'market');

    return {
      show,
      close,
      money: computed(() => store.state.money),
      fishingRods: computed(() => store.state.fishingRods),
      boats: computed(() => store.state.boats),
      unlockedRods: computed(() => store.state.unlockedRods),
      unlockedBoats: computed(() => store.state.unlockedBoats),
      currentRod: computed(() => store.state.currentRod),
      currentBoat: computed(() => store.state.currentBoat),
      buyRod: (index) => store.dispatch('buyRod', index),
      buyBoat: (index) => store.dispatch('buyBoat', index),
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
  max-width: 900px;
  border-radius: 15px;
  color: white;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  max-height: 80vh;
  overflow-y: auto;
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
  margin-bottom: 30px;
  color: #ffd700;
}

.market-equipment {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.equipment-category {
  background: rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 10px;
}

.equipment-category h3 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
  color: #ffd700;
}

.equipment-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.equipment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.equipment-item.selected {
  border-color: #ffd700;
}

.equipment-info {
  flex-grow: 1;
}

.equipment-name {
  font-weight: bold;
  font-size: 1.1em;
  margin-bottom: 5px;
}

.equipment-stats {
  font-size: 0.9em;
  color: #ccc;
}

.equipment-price {
  color: #ffd700;
  margin-right: 15px;
  font-size: 1.1em;
}

.owned-label {
  color: #4CAF50;
  font-weight: bold;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 15px;
    max-height: 90vh;
  }

  h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }

  .market-equipment {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .equipment-category {
    padding: 15px;
  }

  .equipment-item {
    flex-direction: column;
    align-items: stretch;
    padding: 10px;
  }

  .equipment-info {
    margin-bottom: 10px;
  }

  .equipment-name {
    font-size: 1em;
  }

  .equipment-stats {
    font-size: 0.8em;
  }

  .equipment-price {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .btn {
    width: 100%;
    padding: 10px;
    font-size: 0.9em;
  }
}
</style>
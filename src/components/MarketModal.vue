<template>
  <div id="marketScreen">
    <div class="market-content">
      <button id="closeMarket" @click="hideMarket">×</button>
      <h2 class="market-title">Mercado del Pescador</h2>
      <div class="market-inventory">
        <div class="inventory-item">
          <span>Peces atrapados hoy: <span id="todayFishCount">{{ todayFishCount }}</span></span>
          <span>Valor total: $<span id="todayFishValue">{{ todayFishValue }}</span></span>
        </div>
      </div>

      <h3 class="market-subtitle">Equipo Disponible</h3>
      <div class="market-equipment">
        <div class="equipment-category">
          <h4>Cañas de Pescar</h4>
          <div class="equipment-items" id="fishing-rods-market">
            <div v-for="(rod, index) in fishingRods" :key="index" class="equipment-item" :class="{ selected: index === currentRod }">
              <div class="equipment-info">
                <div class="equipment-name">{{ rod.name }} <span v-if="index === currentRod">(Equipado)</span></div>
                <div class="equipment-stats">Poder: {{ rod.power }}x | Velocidad: {{ rod.speed }}x | Tasa de Captura: {{ Math.round(rod.catchRate * 100) }}%</div>
              </div>
              <span v-if="unlockedRods[index]" class="owned-label">Comprado</span>
              <div v-else>
                <span class="equipment-price">${{ rod.price }}</span>
                <button class="buy-button" @click="buyRod(index)" :disabled="money < rod.price">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="equipment-category">
          <h4>Barcos</h4>
          <div class="equipment-items" id="boats-market">
            <div v-for="(boat, index) in boats" :key="index" class="equipment-item" :class="{ selected: index === currentBoat }">
              <div class="equipment-info">
                <div class="equipment-name">{{ boat.name }} <span v-if="index === currentBoat">(Equipado)</span></div>
                <div class="equipment-stats">Velocidad: {{ boat.speedMultiplier }}x | Bono de Captura: {{ boat.catchBonus }}x</div>
              </div>
              <span v-if="unlockedBoats[index]" class="owned-label">Comprado</span>
              <div v-else>
                <span class="equipment-price">${{ boat.price }}</span>
                <button class="buy-button" @click="buyBoat(index)" :disabled="money < boat.price">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="market-actions">
        <button class="market-button" @click="sellAllFish">Vender Todo</button>
        <button class="market-button" @click="goToSleep">Ir a Dormir</button>
        <button id="recycleButton" class="market-button" @click="showRecycleScreen">Centro de Reciclaje</button>
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

    // Mapear estado de Vuex a propiedades computadas
    const money = computed(() => store.getters.getMoney);
    const todayFishCount = computed(() => store.getters.getTodayFishCount);
    const todayFishValue = computed(() => store.getters.getTodayFishValue);
    const fishingRods = computed(() => store.state.fishingRods); // Asumiendo que fishingRods está en el estado
    const boats = computed(() => store.state.boats); // Asumiendo que boats está en el estado
    const unlockedRods = computed(() => store.getters.getUnlockedRods);
    const unlockedBoats = computed(() => store.getters.getUnlockedBoats);
    const currentRod = computed(() => store.getters.getCurrentRod);
    const currentBoat = computed(() => store.getters.getCurrentBoat);

    // Métodos que despachan acciones o mutaciones a Vuex
    const hideMarket = () => {
      // Esto debería ser una acción o mutación en Vuex para controlar la visibilidad del modal
      document.getElementById('marketScreen').style.display = 'none';
    };

    const sellAllFish = () => {
      store.dispatch('sellAllFish'); // Asumiendo que esta acción existe en Vuex
    };

    const goToSleep = () => {
      store.dispatch('goToSleep'); // Asumiendo que esta acción existe en Vuex
    };

    const showRecycleScreen = () => {
      store.dispatch('showRecycleScreen'); // Asumiendo que esta acción existe en Vuex
    };

    const buyRod = (index) => {
      store.dispatch('buyRod', index); // Asumiendo que esta acción existe en Vuex
    };

    const buyBoat = (index) => {
      store.dispatch('buyBoat', index); // Asumiendo que esta acción existe en Vuex
    };

    return {
      money, todayFishCount, todayFishValue, fishingRods, boats, unlockedRods, unlockedBoats,
      currentRod, currentBoat,
      hideMarket, sellAllFish, goToSleep, showRecycleScreen, buyRod, buyBoat,
    };
  },
};
</script>

<style scoped>
/* Estilos para MarketModal */
#marketScreen {
    display: none; /* Oculto por defecto */
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url('https://moroarte.com/games/store.jpg') center center;
    background-size: cover;
    z-index: 100;
    color: white;
    padding: 20px;
    box-sizing: border-box;
}

.market-content {
    max-width: 900px;
    margin: 40px auto;
    background: rgba(50,50,50,0.95);
    padding: 20px;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.market-title {
    text-align: center;
    color: gold;
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.market-subtitle {
    color: #ffd700;
    text-align: center;
    margin: 20px 0;
}

.market-equipment {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    margin: 5px 0;
}

.equipment-category {
    background: rgba(0,0,0,0.3);
    padding: 15px;
    border-radius: 8px;
}

.equipment-category h4 {
    color: #ffd700;
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
}

.equipment-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.equipment-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: rgba(255,255,255,0.1);
    border-radius: 5px;
}

.equipment-info {
    flex-grow: 1;
}

.equipment-name {
    font-weight: bold;
    color: #fff;
}

.equipment-stats {
    font-size: 0.8em;
    color: #ccc;
}

.equipment-price {
    color: #ffd700;
}

.buy-button {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

.buy-button:disabled {
    background: #666;
    cursor: not-allowed;
}

.owned-label {
    color: #4CAF50;
    font-weight: bold;
}
</style>

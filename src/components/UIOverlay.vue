<template>
  <div>
    <div id="top-left-panel">
      <div id="game-info-container">
        <div class="info-row">
          <div id="money-display">Dinero: ${{ getMoney }}</div>
        </div>
        <div class="info-row">
          <div>Peces Comunes: {{ getCommonFishCount }}</div>
          <div>Peces Exóticos: {{ getExoticFishCount }}</div>
        </div>
        <div class="info-row">
          <div>Basura: {{ getTrashCount }}</div>
          <div>Tesoros: {{ getTreasuresCount }}</div>
        </div>
        <div class="info-row">
          <div id="day-display">{{ formattedTime }}</div>
        </div>
        <div id="energy-bar" :class="energyColorClass">
          <div id="energy-fill" :style="{ width: getEnergy + '%' }"></div>
        </div>
      </div>
      <div id="message-console">
        <transition-group name="message-fade" tag="div">
          <p v-for="message in messages" :key="message.id" class="message" :class="`message-${message.type}`">
            {{ message.text }}
          </p>
        </transition-group>
      </div>
    </div>
    <div id="right-buttons-container">
      <button class="btn btn-gold" @click="sellAllFish">Vender Pescado</button>
      <button class="btn btn-indigo" @click="goToSleep">Ir a Dormir</button>
      <button class="btn btn-purple" @click="toggleModal('market')">Mercado (m)</button>
      <button class="btn btn-primary" @click="toggleModal('recycle')">Reciclaje (r)</button>
      <button class="btn btn-secondary" @click="toggleModal('stats')">Estadísticas (s)</button>
      <button class="btn btn-grey" @click="toggleModal('goals')">Objetivos (g)</button>
      <button class="btn btn-danger" @click="toggleModal('treasures')">Tesoros (t)</button>
      <button class="btn btn-grey" @click="toggleModal('equipment')">Equipamiento (e)</button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'UIOverlay',
  setup() {
    const store = useStore();

    const getEnergy = computed(() => store.getters.getEnergy);
    const energyColorClass = computed(() => {
      if (getEnergy.value > 50) return 'energy-high';
      if (getEnergy.value > 20) return 'energy-medium';
      return 'energy-low';
    });
    const messages = computed(() => store.state.messages);

    return {
      getMoney: computed(() => store.getters.getMoney),
      getCommonFishCount: computed(() => store.getters.getCommonFishCount),
      getExoticFishCount: computed(() => store.getters.getExoticFishCount),
      getTrashCount: computed(() => store.getters.getTrashCount),
      getTreasuresCount: computed(() => store.getters.getTreasuresCount),
      getEnergy,
      energyColorClass,
      formattedTime: computed(() => {
        const hours = Math.floor(store.getters.getGameTime / 60);
        const minutes = store.getters.getGameTime % 60;
        return `Día ${store.getters.getCurrentDay} - ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      }),
      sellAllFish: () => store.dispatch('sellAllFish'),
      goToSleep: () => store.dispatch('goToSleep'),
      toggleModal: (modal) => store.dispatch('toggleModal', modal),
      getModals: computed(() => store.getters.getModals),
      messages,
    };
  },
};
</script>

<style scoped>
#top-left-panel {
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 100;
}

#game-info-container {
  margin-bottom: 15px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

#energy-bar {
  width: 100%;
  height: 18px;
  background: rgba(0,0,0,0.6);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

#energy-fill {
  height: 100%;
  transition: width 0.5s, background-color 0.5s;
}

.energy-high #energy-fill {
  background-color: #4CAF50;
}

.energy-medium #energy-fill {
  background-color: #FFC107;
}

.energy-low #energy-fill {
  background-color: #F44336;
}

#message-console {
  height: 150px;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}

#message-console::-webkit-scrollbar {
    display: none;
}

.message {
  background: rgba(255, 255, 255, 0.15);
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 8px;
}

.message-fade-enter-active, .message-fade-leave-active {
  transition: all 0.5s ease;
}
.message-fade-enter-from, .message-fade-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.message-catch { color: #50fa7b; }
.message-achievement { color: #ffd700; }
.message-warning { color: #ff5555; }
.message-system { color: #8be9fd; font-style: italic; }

#right-buttons-container {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 100;
}
</style>

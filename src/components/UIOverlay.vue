<template>
  <div id="ui-overlay">
    <div id="top-left-panel" :style="{ backgroundColor: black, borderColor: currentZoneColor }">
      <div id="game-stats-line-1">
        <div class="stat-item">💰 {{ getMoney }}</div>
        <div class="stat-item">🐟 {{ getCommonFishCount }}</div>
        <div class="stat-item">✨ {{ getExoticFishCount }}</div>
        <div class="stat-item">🗑️ {{ getTrashCount }}</div>
        <div class="stat-item">💎 {{ getTreasuresCount }}</div>
      </div>
      <div id="game-stats-line-2">
        <div class="stat-item">📍 {{ currentZoneName }}</div>
        <div class="stat-item">{{ formattedTime }}</div>
        <Weather />
        <div id="energy-bar" :class="energyColorClass">
          <div id="energy-fill" :style="{ width: getEnergy + '%' }"></div>
        </div>
      </div>
    </div>

    <img src="/src/img/muelle.svg" alt="Muelle" class="muelle-img" />

    <MessageConsole />
    <div id="bottom-bar">
        <button class="btn-icon" @click="goToSleep" :disabled="!canSleep">🛏️<span class="btn-text">${{ sleepCost }}</span></button>
        <button class="btn-icon" @click="toggleModal('recycle')">♻️</button>
        <button class="btn-icon" @click="toggleModal('market')">🛒</button>
        <button class="btn-icon" @click="openMap">🗺️</button>
        <button class="btn-icon" @click="toggleModal('settings')">⚙️</button>
    </div>

    <SettingsModal />
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import Weather from './Weather.vue';
import SettingsModal from './SettingsModal.vue';
import MessageConsole from './MessageConsole.vue';

export default {
  name: 'UIOverlay',
  components: {
    Weather,
    SettingsModal,
    MessageConsole,
  },
  setup() {
    const store = useStore();

    const getEnergy = computed(() => store.getters.getEnergy);
    const energyColorClass = computed(() => {
      if (getEnergy.value > 50) return 'energy-high';
      if (getEnergy.value > 20) return 'energy-medium';
      return 'energy-low';
    });
    const messages = computed(() => store.state.messages);
    const currentPartOfDay = computed(() => store.getters.getCurrentPartOfDay);

    const currentDay = computed(() => store.state.currentDay);

    const sleepCost = computed(() => {
      return 1400 + currentDay.value * 100;
    });

    const canSleep = computed(() => store.getters.getMoney >= sleepCost.value);

    watchEffect(() => {
      document.body.className = currentPartOfDay.value;
    });

    

    const currentZone = computed(() => store.state.zones.find(z => z.id === store.state.currentZone));
    const currentZoneName = computed(() => currentZone.value ? currentZone.value.name : '');
    const currentZoneColor = computed(() => currentZone.value ? currentZone.value.color : 'rgba(0, 0, 0, 0.7)');

    return {
      getMoney: computed(() => store.getters.getMoney),
      getCommonFishCount: computed(() => store.getters.getCommonFishCount),
      getExoticFishCount: computed(() => store.getters.getExoticFishCount),
      getTrashCount: computed(() => store.getters.getTrashCount),
      getTreasuresCount: computed(() => store.getters.getTreasuresCount),
      getEnergy,
      energyColorClass,
      sleepCost,
      formattedTime: computed(() => {
        const totalMinutes = Math.round(store.getters.getGameTime);
        let hours = Math.floor(totalMinutes / 60) % 24;
        let minutes = totalMinutes % 60;

        const gameDay = store.state.currentDay;
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const monthIndex = (gameDay - 1) % 12;
        const dayOfMonth = Math.floor((gameDay - 1) / 12) + 1;
        const monthName = months[monthIndex];

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} - Día ${dayOfMonth} de ${monthName}`;
      }),
      goToSleep: () => store.dispatch('goToSleep'),
      toggleModal: (modal) => store.dispatch('toggleModal', modal),
      openMap: () => store.dispatch('toggleModal', 'map'),
      getModals: computed(() => store.getters.getModals),
      messages,
      canSleep,
      
      currentDay,
      currentZoneName,
      currentZoneColor,
    };
  },
};
</script>

<style scoped>

#bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    background: rgba(0, 0, 0, 0.8);
    padding: 10px 0;
    z-index: 100;
}

.btn-icon {
    background: none;
    border: none;
    color: white;
    font-size: 2em;
    cursor: pointer;
}

.btn-text {
    font-size: 0.5em;
    display: block;
}

#top-left-panel {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0;
  border-radius: 0;
  width: 100%;
  /* max-width: 500px; */
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#game-stats-line-1,
#game-stats-line-2 {
  display: flex;
  justify-content: space-around; /* Distribute items evenly */
  width: 100%;
  margin-bottom: 5px; /* Small margin between lines */
  align-items: center;
}

.stat-item {
  font-size: 1.1em; /* Adjust font size */
  display: flex;
  align-items: center;
  gap: 5px; /* Space between icon and text */
}

#energy-bar {
  width: 100px;
  height: 18px;
  background: rgba(0,0,0,0.6);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

#energy-fill {
  height: 100%;
  transition: width 0.5s, background-color 0.5s;
}

.energy-high #energy-fill {
  background-color: #01f80a;
}

.energy-medium #energy-fill {
  background-color: #fc7d07;
}

.energy-low #energy-fill {
  background-color: #ff1201;
}

#current-zone {
  margin-top: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: #ffd700;
}


.muelle-img {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 300px; /* Adjust as needed */
  height: auto;
  z-index: 90; /* Below info panels (z-index 100) */
}
</style>
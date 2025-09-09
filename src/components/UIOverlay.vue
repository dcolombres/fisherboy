<template>
  <div id="ui-overlay">
    <div id="top-left-panel">
      <div id="game-stats-line-1">
        <div class="stat-item">💰 {{ getMoney }}</div>
        <div class="stat-item">🐟 {{ getCommonFishCount }}</div>
        <div class="stat-item">✨🐟 {{ getExoticFishCount }}</div>
        <div class="stat-item">🗑️ {{ getTrashCount }}</div>
        <div class="stat-item">💎 {{ getTreasuresCount }}</div>
      </div>
      <div id="game-stats-line-2">
        <div class="stat-item">DÍA {{ currentDay }}</div>
        <div class="stat-item">{{ formattedTime }}</div>
        <Weather />
        <div id="energy-bar" :class="energyColorClass">
          <div id="energy-fill" :style="{ width: getEnergy + '%' }"></div>
        </div>
      </div>
    </div>

    <img src="/src/img/muelle.svg" alt="Muelle" class="muelle-img" />

    <button class="fullscreen-btn" @click="toggleFullScreen">⤢</button>
    <button class="settings-btn" @click="toggleModal('settings')">⚙️</button>

    <MessageConsole />
    <div id="bottom-bar">
        <button class="btn-icon" @click="goToSleep" :disabled="!canSleep">🛏️<span class="btn-text">(${{ sleepCost }})</span></button>
        <button class="btn-icon" @click="toggleModal('recycle')">♻️</button>
        <button class="btn-icon" @click="toggleModal('market')">🛒</button>
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

    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

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

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      }),
      goToSleep: () => store.dispatch('goToSleep'),
      toggleModal: (modal) => store.dispatch('toggleModal', modal),
      getModals: computed(() => store.getters.getModals),
      messages,
      canSleep,
      toggleFullScreen,
      currentDay,
    };
  },
};
</script>

<style scoped>
.fullscreen-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 101;
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1.5em;
  cursor: pointer;
  border-radius: 5px;
}

.settings-btn {
    position: fixed;
    top: 20px;
    right: 80px;
    z-index: 101;
    background-color: #2c3e50;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 1.5em;
    cursor: pointer;
    border-radius: 5px;
}

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
  top: 10px; /* Adjust top position */
  left: 10px; /* Adjust left position */
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px; /* Adjust padding */
  border-radius: 12px;
  width: calc(100% - 20px); /* Full width minus padding */
  max-width: 500px; /* Max width for larger screens */
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 100;
  display: flex; /* Use flexbox for overall layout */
  flex-direction: column; /* Stack content vertically */
  align-items: center; /* Center content horizontally */
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
  background-color: #4CAF50;
}

.energy-medium #energy-fill {
  background-color: #FFC107;
}

.energy-low #energy-fill {
  background-color: #F44336;
}

#message-console {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  height: auto;
  display: flex;
  flex-direction: column-reverse;
  pointer-events: none;
  align-items: center;
}

.message {
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.5s ease;
}

/* Estilos específicos para cada tipo de mensaje */
.message-catch { color: #50fa7b; }
.message-achievement { color: #ffd700; }
.message-warning { color: #ff5555; }
.message-system { color: #c0e5ee; font-style: italic; }

/* Animaciones de transición */
.message-fade-enter-active, .message-fade-leave-active {
  transition: all 0.5s ease;
}
.message-fade-enter-from, .message-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

#right-buttons-container {
    display: none;
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
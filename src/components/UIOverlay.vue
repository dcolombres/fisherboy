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
        <div class="info-row weather-row">
          <Weather />
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
      <volume-control />
    </div>

    <img src="/src/img/muelle.svg" alt="Muelle" class="muelle-img" />

    <button class="fullscreen-btn" @click="toggleFullScreen">⤢</button>
    <button class="hamburger-btn" @click="toggleRightPanel">☰</button>

    <div id="right-buttons-container" :class="{ collapsed: isRightPanelCollapsed }">
      <button class="collapse-btn" @click="toggleRightPanel">{{ isRightPanelCollapsed ? '❮' : '❯' }}</button>
      <div class="buttons-wrapper">
        <button class="btn btn-common" @click="sellAllFish">Vender Pescado</button>
        <button class="btn btn-common" @click="goToSleep" :disabled="!canSleep">Ir a Dormir ($ {{ sleepCost }})</button>
        <button class="btn btn-common" @click="toggleModal('market')">Mercado (m)</button>
        <button class="btn btn-common" @click="toggleModal('recycle')">Reciclaje (r)</button>
        <button class="btn btn-common" @click="toggleModal('stats')">Estadísticas (s)</button>
        <button class="btn btn-common" @click="toggleModal('goals')">Objetivos (g)</button>
        <button class="btn btn-common" @click="toggleModal('treasures')">Tesoros (t)</button>
        <button class="btn btn-common" @click="toggleModal('equipment')">Equipamiento (e)</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import VolumeControl from './VolumeControl.vue';
import Weather from './Weather.vue';

export default {
  name: 'UIOverlay',
  components: {
    VolumeControl,
    Weather,
  },
  setup() {
    const store = useStore();
    const isRightPanelCollapsed = ref(false);

    const handleResize = () => {
      isRightPanelCollapsed.value = window.innerWidth < 768;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
      handleResize(); // Initial check
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    const toggleRightPanel = () => {
      isRightPanelCollapsed.value = !isRightPanelCollapsed.value;
    };

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
      let cost = 1500;
      if (currentDay.value > 5) {
        cost += (currentDay.value - 5) * 1000;
      }
      return cost;
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
      sellAllFish: () => store.dispatch('sellAllFish'),
      goToSleep: () => store.dispatch('goToSleep'),
      toggleModal: (modal) => store.dispatch('toggleModal', modal),
      getModals: computed(() => store.getters.getModals),
      messages,
      canSleep,
      isRightPanelCollapsed,
      toggleRightPanel,
      toggleFullScreen,
    };
  },
};
</script>

<style scoped>
.fullscreen-btn {
  position: fixed;
  top: 20px;
  right: 70px;
  z-index: 101;
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1.5em;
  cursor: pointer;
  border-radius: 5px;
}

@media (max-width: 768px) {
    .hamburger-btn {
        right: 20px;
    }
    .fullscreen-btn {
        right: 70px;
    }
}

#top-left-panel {
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px;
  border-radius: 12px;
  width: 410px;
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

.weather-row {
  justify-content: center;
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
  height: 250px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

#message-console::-webkit-scrollbar {
    display: none;
}

.message {
  background: rgba(255, 255, 255, 0.15);
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 2px;
}

.message-fade-enter-active, .message-fade-leave-active {
  transition: all 0.5s ease;
}
.message-fade-enter-from, .message-fade-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.message-catch { color: #50fa7b; }
.message-achievement { color: #ff9100; }
.message-warning { color: #ff5555; }
.message-system { color: #ccebf1; font-style: italic; }
.message-tip { color: yellow; font-style: italic; }

#right-buttons-container {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: flex;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 10px 0 0 10px;
    transition: transform 0.3s ease-in-out;
}

.buttons-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

#right-buttons-container.collapsed .buttons-wrapper {
    display: none;
}

#right-buttons-container.collapsed {
    padding: 20px 0;
}

.collapse-btn {
    background-color: #2c3e50;
    color: white;
    border: none;
    padding: 20px 5px;
    cursor: pointer;
    font-size: 1.2em;
    border-radius: 5px;
    margin-right: 10px;
}

#right-buttons-container.collapsed .collapse-btn {
    margin-right: 0;
}

.hamburger-btn {
    display: none;
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

.btn-common {
  background-color: #2C3E50; /* A darker shade of blue */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.btn-common:hover {
  background-color: #1A2B3C; /* Even darker for hover */
}

.btn-common:disabled {
  background-color: #4A6572; /* A slightly lighter, desaturated dark blue for disabled */
  cursor: not-allowed;
}

/* Media Query for Mobile */
@media (max-width: 768px) {
    #right-buttons-container {
        top: 0;
        right: 0;
        width: 250px;
        height: 100%;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        border-radius: 0;
        padding-top: 60px;
        flex-direction: column;
    }

    #right-buttons-container .buttons-wrapper {
        display: flex; /* Ensure it's visible when not collapsed */
    }

    #right-buttons-container.collapsed {
        transform: translateX(100%);
        padding: 20px;
    }

    #right-buttons-container:not(.collapsed) {
        transform: translateX(0);
    }

    .collapse-btn {
        display: none;
    }

    .hamburger-btn {
        display: block;
    }

    #top-left-panel {
        width: calc(100% - 80px);
    }
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
<template>
  <div class="weather-display">
    <p>Día {{ currentDay }} - {{ currentSeason }}, {{ temperature }}°C, {{ formattedGameTime }}</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Weather',
  setup() {
    const store = useStore();

    const currentSeason = computed(() => {
      const seasonMap = {
        spring: 'Primavera',
        summer: 'Verano',
        autumn: 'Otoño',
        winter: 'Invierno',
      };
      return seasonMap[store.getters.getCurrentSeason] || store.getters.getCurrentSeason;
    });

    const temperature = computed(() => {
      return store.getters.getTemperature;
    });

    const formattedGameTime = computed(() => {
      const totalMinutes = store.getters.getGameTime;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.floor(totalMinutes % 60);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    });

    const currentDay = computed(() => {
      return store.getters.getCurrentDay;
    });

    const seasonIcon = computed(() => {
      switch (store.getters.getCurrentSeason) {
        case 'spring': return '🌸';
        case 'summer': return '☀️';
        case 'autumn': return '🍂';
        case 'winter': return '❄️';
        default: return '';
      }
    });

    return {
      currentDay,
      currentSeason,
      temperature,
      formattedGameTime,
      seasonIcon,
    };
  },
};
</script>

<style scoped>
.weather-container {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 15px;
  border-radius: 10px;
  font-family: 'Arial', sans-serif;
}

.season {
  margin-right: 10px;
}

.temperature {
  font-weight: bold;
}
</style>
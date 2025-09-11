<template>
  <div class="weather-display">
    <p>Día {{ currentDay }} {{ seasonIcon }} {{ temperature }}°C</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Weather',
  setup() {
    const store = useStore();

    const temperature = computed(() => {
      return store.getters.getTemperature;
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
      temperature,
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
  padding: 5px 5px;
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
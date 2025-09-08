<template>
  <div id="app">
    <StartScreen v-if="!gameStarted" @game-started="handleGameStarted" />
    <GameContainer v-else />
  </div>
</template>

<script>
// This is a test comment to trigger GitHub Actions
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import GameContainer from './components/GameContainer.vue';
import StartScreen from './components/StartScreen.vue'; // Import StartScreen

export default {
  name: 'App',
  components: {
    GameContainer,
    StartScreen, // Register StartScreen
  },
  setup() {
    const store = useStore();

    const gameStarted = computed(() => store.getters.getGameStarted); // Get gameStarted state

    const handleGameStarted = () => {
      store.commit('setGameStarted', true); // Set gameStarted to true
    };

    onMounted(() => {
      setInterval(() => {
        store.dispatch('showRandomTip');
      }, 120000); // 2 minutes
    });

    return {
      gameStarted,
      handleGameStarted,
    };
  },
};
</script>

<style>
/* Global styles */
</style>

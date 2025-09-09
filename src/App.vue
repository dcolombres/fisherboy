<template>
  <div id="app">
    <GameContainer />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import GameContainer from './components/GameContainer.vue';

export default {
  name: 'App',
  components: {
    GameContainer,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      setInterval(() => {
        store.dispatch('showRandomTip');
      }, 120000); // 2 minutes
    });

    return {};
  },
};
</script>

<style>
/* Global styles */
</style>
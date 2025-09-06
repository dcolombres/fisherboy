<template>
  <div id="goalsOverlay"></div>
  <div id="goals">
    <button id="closeGoals" @click="hideGoals">×</button>
    <h3>Objetivos</h3>
    <div class="goals-grid">
      <div v-for="goal in goals" :key="goal.id" class="goal" :id="`goal-${goal.id}`" :class="{ completed: goal.completed }">
        <div class="goal-description">{{ goal.description }}</div>
        <div class="goal-progress">
          <div class="goal-progress-bar" :style="{ width: getGoalProgress(goal) + '%' }"></div>
        </div>
        <div class="goal-reward">Recompensa: ${{ goal.reward }}</div>
        <div class="goal-completed">¡Completado!</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'GoalsModal',
  setup() {
    const store = useStore();

    const goals = computed(() => store.state.goals); // Asumiendo que goals está en el estado
    const fishCount = computed(() => store.getters.getFishCount);
    const money = computed(() => store.getters.getMoney);
    const caughtFishInventory = computed(() => store.getters.getCaughtFishInventory);
    const unlockedRods = computed(() => store.getters.getUnlockedRods);
    const unlockedBoats = computed(() => store.getters.getUnlockedBoats);

    const hideGoals = () => {
      // Esto debería ser una acción o mutación en Vuex para controlar la visibilidad del modal
      document.getElementById('goals').style.display = 'none';
      document.getElementById('goalsOverlay').style.display = 'none';
    };

    const getGoalProgress = (goal) => {
      let progress = 0;
      switch (goal.type) {
        case 'fish_count':
          progress = (fishCount.value / goal.target) * 100;
          break;
        case 'exotic_fish':
          progress = caughtFishInventory.value.some(fish => fish.fish.value >= 5000) ? 100 : 0;
          break;
        case 'exotic_fish_count':
          const exoticCount = caughtFishInventory.value.filter(fish => fish.fish.value >= 5000).length;
          progress = (exoticCount / goal.target) * 100;
          break;
        case 'money':
          progress = (money.value / goal.target) * 100;
          break;
        case 'pro_boat':
          progress = unlockedBoats.value[2] ? 100 : 0; // Assuming index 2 is pro boat
          break;
        case 'recycle_count':
          // Necesitaríamos un estado en Vuex para el recuento de reciclaje
          progress = 0; // Placeholder
          break;
        case 'recycle_value':
          // Necesitaríamos un estado en Vuex para el valor de reciclaje
          progress = 0; // Placeholder
          break;
        case 'specific_fish':
            progress = caughtFishInventory.value.some(fish => fish.fish.name === goal.fishName) ? 100 : 0;
            break;
      }
      return Math.min(100, progress);
    };

    return {
      goals,
      hideGoals,
      getGoalProgress,
      fishCount, money, caughtFishInventory, unlockedRods, unlockedBoats // Exponer para getGoalProgress
    };
  },
};
</script>

<style scoped>
/* Estilos para GoalsModal */
#goals {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.95);
    color: white;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 1000px;
    text-align: center;
    z-index: 1000;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

#goalsOverlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    z-index: 999;
}

.goals-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    margin-top: 5px;
    padding: 0 10px;
}

.goal {
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 8px;
    position: relative;
    transition: transform 0.2s;
}

.goal:hover {
    transform: translateY(-1px);
}

.goal-description {
    color: #fff;
    font-size: 0.7em;
    margin-bottom: 5px;
    min-height: 40px;
}

.goal-progress {
    background: rgba(0, 0, 0, 0.3);
    height: 3px;
    border-radius: 0px;
    margin: 5px 0;
    overflow: hidden;
}

.goal-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%);
    width: 0%;
    transition: width 0.3s ease;
}

.goal-reward {
    color: #ffd700;
    font-size: 0.7em;
    margin-top: 5px;
}

.goal-completed {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(76, 175, 80, 0.6);
    color: white;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border-radius: 0px;
}

.goal.completed .goal-completed {
    display: flex;
}
</style>

<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Objetivos</h2>
      <div class="goals-grid">
        <div v-for="goal in goals" :key="goal.id" class="goal" :class="{ completed: goal.completed }">
          <div class="goal-description">{{ goal.description }}</div>
          <div class="goal-progress">
            <div class="goal-progress-bar" :style="{ width: getGoalProgress(goal) + '%' }"></div>
          </div>
          <div class="goal-reward">Recompensa: ${{ goal.reward }}</div>
          <div class="goal-completed">¡Completado!</div>
        </div>
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
    const show = computed(() => store.state.modals.goals);
    const close = () => store.dispatch('toggleModal', 'goals');

    const goals = computed(() => store.getters.getGoals);
    const commonFishCount = computed(() => store.getters.getCommonFishCount);
    const exoticFishCount = computed(() => store.getters.getExoticFishCount);
    const money = computed(() => store.getters.getMoney);
    const unlockedBoats = computed(() => store.getters.getUnlockedBoats);
    const trashCount = computed(() => store.getters.getTrashCount);

    const getGoalProgress = (goal) => {
      let progress = 0;
      switch (goal.type) {
        case 'fish_count':
          progress = ((commonFishCount.value + exoticFishCount.value) / goal.target) * 100;
          break;
        case 'exotic_fish_count':
          progress = (exoticFishCount.value / goal.target) * 100;
          break;
        case 'money':
          progress = (money.value / goal.target) * 100;
          break;
        case 'pro_boat':
          progress = unlockedBoats.value[2] ? 100 : 0; // Assuming index 2 is pro boat
          break;
        case 'recycle_count':
          progress = (trashCount.value / goal.target) * 100;
          break;
        case 'recycle_value':
          // This would require tracking the total value of recycled items.
          // I will leave this as a placeholder for now.
          progress = 0;
          break;
        case 'specific_fish':
            // This would require checking the caughtFishInventory for a specific fish name.
            // I will leave this as a placeholder for now.
            progress = 0;
            break;
      }
      return Math.min(100, progress);
    };

    return {
      show,
      close,
      goals,
      getGoalProgress,
    };
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #222222;
  padding: 30px;
  width: 80%;
  max-width: 1000px;
  border-radius: 15px;
  color: white;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.close {
  color: #aaa;
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close:hover,
.close:focus {
  color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 10px;
}

.goal {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  position: relative;
  transition: transform 0.2s;
}

.goal:hover {
  transform: translateY(-5px);
}

.goal-description {
  font-size: 1.1em;
  margin-bottom: 15px;
  min-height: 50px;
}

.goal-progress {
  background: rgba(0, 0, 0, 0.3);
  height: 5px;
  border-radius: 5px;
  margin: 10px 0;
  overflow: hidden;
}

.goal-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%);
  width: 0%;
  transition: width 0.5s ease;
}

.goal-reward {
  color: #ffd700;
  font-size: 1em;
  margin-top: 15px;
}

.goal-completed {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(76, 175, 80, 0.8);
  color: white;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 10px;
  font-size: 1.5em;
}

.goal.completed .goal-completed {
  display: flex;
}
</style>

<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Objetivos</h2>
      <div class="goals-container">
        <div v-for="(goalList, difficulty) in goals" :key="difficulty" class="goal-category">
          <h3>{{ difficulty }}</h3>
          <div class="goals-grid">
            <div v-for="goal in goalList" :key="goal.id" class="goal" :class="{ completed: goal.completed }">
              <div class="goal-description">{{ goal.description }}</div>
              <div class="goal-progress">
                <div class="goal-progress-bar" :style="{ width: (goal.current / goal.target) * 100 + '%' }"></div>
              </div>
              <div class="goal-reward">Recompensa: ${{ goal.reward }}</div>
              <div class="goal-status">{{ goal.current }} / {{ goal.target }}</div>
              <div v-if="goal.completed" class="goal-completed">¡Completado!</div>
            </div>
          </div>
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

    return {
      show,
      close,
      goals,
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
  max-height: 80vh;
  overflow-y: auto;
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
  color: #ffd700;
}

.goals-container {
  overflow-y: auto;
}

.goal-category {
  margin-bottom: 20px;
}

.goal-category h3 {
  color: #ffd700;
  text-transform: capitalize;
  margin-bottom: 10px;
  border-bottom: 1px solid #ffd700;
  padding-bottom: 5px;
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.goal {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  position: relative;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  height: 10px;
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
  margin-top: 10px;
}

.goal-status {
  font-size: 0.9em;
  color: #ccc;
  margin-top: 5px;
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

.goal.completed {
  background: rgba(76, 175, 80, 0.5);
}

.goal.completed .goal-completed {
  display: flex;
}

@media (max-width: 1024px) {
    .goals-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
  .modal-content {
    padding: 15px;
    max-height: 90vh;
  }

  h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }

  .goals-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .goal {
    padding: 15px;
  }

  .goal-description {
    font-size: 1em;
    min-height: auto;
    margin-bottom: 10px;
  }
}
</style>
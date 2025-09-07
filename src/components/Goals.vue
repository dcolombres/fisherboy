<template>
    <div id="goalsOverlay"></div>
    <div id="goals">
        <button id="closeGoals">×</button>
        <h3>Goals</h3>
        <div class="goals-grid">
            <div v-for="(levelGoals, levelName) in allGoals" :key="levelName">
                <h4>{{ capitalizeFirstLetter(levelName) }} Goals</h4>
                <div v-for="goal in levelGoals" :key="goal.id" class="goal">
                    <div class="goal-description">{{ goal.description }}</div>
                    <div class="goal-progress">
                        <div class="goal-progress-bar" :style="{ width: (goal.current / goal.target) * 100 + '%' }"></div>
                        <div class="goal-progress-text">{{ goal.current }} / {{ goal.target }}</div>
                    </div>
                    <div class="goal-reward">Reward: ${{ goal.reward }}</div>
                    <div v-if="goal.completed" class="goal-completed">Completed!</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Goals',
  computed: {
    ...mapState({
      allGoals: state => state.goals
    })
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style>
/* Goals styles */
</style>
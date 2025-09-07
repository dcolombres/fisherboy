<template>
    <div id="statsOverlay"></div>
    <div id="statsModal">
        <button id="closeStats">×</button>
        <h3 class="stats-title">Fishing Statistics<br>
            <small style="font-size: 0.7em; color: #ffd700">
                Current Cycle: Day 1 of 7<br>
                Reset in 6 days
            </small>
        </h3>
        <div class="stats-summary">
            <div>Total fish caught: <span id="totalFishCaught">{{ fishingStats.totalCaught }}</span></div>
            <div>Total value earned: $<span id="totalValueEarned">{{ fishingStats.totalValue }}</span></div>
        </div>
        <h4 style="color: #ffd700; margin: 20px 0 10px;">Fish Statistics</h4>
        <div class="stats-grid">
            <div v-for="(fish, name) in fishingStats.fishByType" :key="name">
                {{ name }}: {{ fish.count }} ({{ fish.totalValue }})
            </div>
        </div>
        <h4 style="color: #ffd700; margin: 20px 0 10px;">Recycling Statistics</h4>
        <div class="stats-grid">
            <div>Total items recycled: <span id="totalRecycled">{{ recycledObjects.totalRecycled }}</span></div>
            <div>Total value from recycling: $<span id="totalRecycledValue">{{ recycledObjects.totalRecycledValue }}</span></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Stats',
  computed: {
    ...mapState(['fishingStats', 'recycledObjects']),
    ...mapGetters(['getFishingStats', 'getRecycledObjects']),
    fishingStats() {
      return this.getFishingStats;
    },
    recycledObjects() {
      return this.getRecycledObjects;
    }
  }
};
</script>

<style>
/* Stats styles */
</style>
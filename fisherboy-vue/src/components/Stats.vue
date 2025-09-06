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
            <div>Total fish caught: <span id="totalFishCaught">0</span></div>
            <div>Total value earned: $<span id="totalValueEarned">0</span></div>
        </div>
        <h4 style="color: #ffd700; margin: 20px 0 10px;">Fish Statistics</h4>
        <div class="stats-grid">
            <!-- Fish statistics will be populated here -->
        </div>
        <h4 style="color: #ffd700; margin: 20px 0 10px;">Recycling Statistics</h4>
        <div class="stats-grid">
            <!-- Recycling statistics will be populated here -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'Stats'
};
</script>

<style>
/* Stats styles */
</style>

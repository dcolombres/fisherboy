<template>
  <div id="marketScreen">
    <div class="market-content">
        <button id="closeMarket">×</button><h2 class="market-title">Fisherman's Market</h2>
        <div class="market-inventory">
            <div class="inventory-item">
                <span>Fish caught today: <span id="todayFishCount">0</span></span>
                <span>Total value: $<span id="todayFishValue">0</span></span>
            </div>
        </div>

        <h3 class="market-subtitle">Available Equipment</h3>
        <div class="market-equipment">
            <div class="equipment-category">
                <h4>Fishing Rods</h4>
                <div class="equipment-items" id="fishing-rods-market">
                    <!-- Populated by JavaScript -->
                </div>
            </div>
            
            <div class="equipment-category">
                <h4>Boats</h4>
                <div class="equipment-items" id="boats-market">
                    <!-- Populated by JavaScript -->
                </div>
            </div>
        </div>

        <div class="market-actions">
            <button class="market-button" onclick="sellAllFish()">Sell All</button>
            <button class="market-button" onclick="goToSleep()">Go to Sleep</button>
            <button id="recycleButton" class="market-button" onclick="showRecycleScreen()">Recycling Center</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Market'
};
</script>

<style>
/* Market styles */
</style>

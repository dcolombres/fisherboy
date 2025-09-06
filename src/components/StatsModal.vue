<template>
  <div id="statsOverlay"></div>
  <div id="statsModal">
    <button id="closeStats" @click="hideStats">×</button>
    <h3 class="stats-title">Estadísticas de Pesca<br>
      <small style="font-size: 0.7em; color: #ffd700">
        Ciclo Actual: Día 1 de 7<br>
        Reiniciar en 6 días
      </small>
    </h3>
    <div class="stats-summary">
      <div>Peces totales atrapados: <span id="totalFishCaught">{{ fishingStats.totalCaught }}</span></div>
      <div>Valor total ganado: $<span id="totalValueEarned">{{ fishingStats.totalValue }}</span></div>
    </div>
    <h4 style="color: #ffd700; margin: 20px 0 10px;">Estadísticas de Peces</h4>
    <div class="stats-grid">
      <div v-for="(stats, fishName) in fishingStats.fishByType" :key="fishName" class="fish-stat">
        <div class="fish-stat-name">{{ fishName }}</div>
        <div class="fish-stat-count">Atrapados: {{ stats.count }}</div>
        <div class="fish-stat-value">Valor: ${{ stats.totalValue }}</div>
      </div>
    </div>
    <h4 style="color: #ffd700; margin: 20px 0 10px;">Estadísticas de Reciclaje</h4>
    <div class="stats-grid">
      <!-- Las estadísticas de reciclaje se poblarán aquí si se implementan en Vuex -->
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'StatsModal',
  setup() {
    const store = useStore();

    const fishingStats = computed(() => store.getters.getFishingStats);

    const hideStats = () => {
      // Esto debería ser una acción o mutación en Vuex para controlar la visibilidad del modal
      document.getElementById('statsModal').style.display = 'none';
      document.getElementById('statsOverlay').style.display = 'none';
    };

    return {
      fishingStats,
      hideStats,
    };
  },
};
</script>

<style scoped>
/* Estilos para StatsModal */
#statsModal {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.95);
    color: white;
    padding: 30px;
    border-radius: 0px;
    width: 90%;
    max-width: 1000px;
    z-index: 1000;
    max-height: 80vh;
    overflow-y: auto;
}

#statsOverlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    z-index: 999;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
}

.fish-stat {
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 5px;
    transition: transform 0.2s;
}

.fish-stat:hover {
    transform: translateY(-2px);
}

.fish-stat-name {
    color: #ffd700;
    font-weight: bold;
    margin-bottom: 5px;
}

.fish-stat-count {
    color: white;
    font-size: 0.9em;
}

.fish-stat-value {
    color: #4CAF50;
    font-size: 0.9em;
    margin-top: 5px;
}
</style>
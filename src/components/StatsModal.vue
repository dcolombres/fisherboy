<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Estadísticas de Pesca</h2>
      <div class="stats-summary">
        <div>Peces totales atrapados: {{ fishingStats.totalCaught }}</div>
        <div>Valor total ganado: ${{ fishingStats.totalValue }}</div>
      </div>
      <h3>Estadísticas de Peces</h3>
      <div class="stats-grid">
        <div v-for="(stats, fishName) in fishingStats.fishByType" :key="fishName" class="fish-stat">
          <div class="fish-stat-name">{{ fishName }}</div>
          <div class="fish-stat-count">Atrapados: {{ stats.count }}</div>
          <div class="fish-stat-value">Valor: ${{ stats.totalValue }}</div>
        </div>
      </div>
      <h3>Estadísticas de Reciclaje</h3>
      <div class="stats-grid">
        <div>Total de objetos reciclados: {{ recycledObjects.totalRecycled }}</div>
        <div>Valor total de reciclaje: ${{ recycledObjects.totalRecycledValue }}</div>
      </div>
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
    const show = computed(() => store.state.modals.stats);
    const close = () => store.dispatch('toggleModal', 'stats');

    const fishingStats = computed(() => store.getters.getFishingStats);
    const recycledObjects = computed(() => store.getters.getRecycledObjects);

    return {
      show,
      close,
      fishingStats,
      recycledObjects,
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
}

h3 {
  color: #ffd700;
  margin: 30px 0 15px;
  text-align: center;
}

.stats-summary {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.2em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.fish-stat {
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  transition: transform 0.2s;
}

.fish-stat:hover {
  transform: translateY(-5px);
}

.fish-stat-name {
  color: #ffd700;
  font-weight: bold;
  margin-bottom: 10px;
}

.fish-stat-count {
  margin-bottom: 5px;
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

  h3 {
    font-size: 1.2em;
    margin: 15px 0 10px;
  }

  .stats-summary {
    font-size: 1em;
    padding: 10px;
  }

  .stats-grid {
    gap: 10px;
  }

  .fish-stat {
    padding: 10px;
  }
}
</style>
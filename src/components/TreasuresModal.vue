<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Tesoros</h2>
      <div class="treasures-container">
        <div class="treasure-grid">
          <div v-for="treasure in allTreasuresWithStatus" :key="treasure.name" class="treasure-card">
            <h3>{{ treasure.name }}</h3>
            <p>Valor: {{ treasure.value > 0 ? treasure.value : 'Coleccionable' }}</p>
            <div class="treasure-status">
              <span v-if="treasure.found" class="found-indicator">✓ Encontrado</span>
              <span v-else class="not-found-indicator">✗ No Encontrado</span>
              <span v-if="treasure.count > 0" class="treasure-count">Cantidad: {{ treasure.count }}</span>
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
  name: 'TreasuresModal',
  setup() {
    const store = useStore();
    const show = computed(() => store.state.modals.treasures);
    const close = () => store.dispatch('toggleModal', 'treasures');
    const allTreasuresWithStatus = computed(() => {
      const caughtTreasuresMap = store.getters.getCaughtTreasuresInventory.reduce((map, treasure) => {
        map[treasure.name] = (map[treasure.name] || 0) + 1;
        return map;
      }, {});

      return store.state.treasureTypes.map(treasureType => {
        const count = caughtTreasuresMap[treasureType.name] || 0;
        const found = count > 0;
        return {
          ...treasureType,
          found,
          count,
        };
      });
    });

    return {
      show,
      close,
      allTreasuresWithStatus,
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

.treasures-container {
  overflow-y: auto;
}

.treasure-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.treasure-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  position: relative;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

.treasure-card:hover {
  transform: translateY(-5px);
}

.treasure-card h3 {
  font-size: 1.1em;
  margin-bottom: 10px;
  color: #ffd700;
}

.treasure-card p {
  font-size: 1em;
  line-height: 1.4;
  margin-bottom: 10px;
}

.treasure-status {
  margin-top: 10px;
  font-size: 0.9em;
}

.found-indicator {
  color: #4caf50;
  font-weight: bold;
}

.not-found-indicator {
  color: #f44336;
  font-weight: bold;
}

.treasure-count {
  display: block;
  margin-top: 5px;
  color: #ccc;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    padding: 15px;
    max-height: 90vh;
  }

  h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }

  .treasure-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  .treasure-card {
    padding: 15px;
  }
}
</style>
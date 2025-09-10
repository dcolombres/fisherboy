<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Mapa</h2>
      <div class="map-content">
        <div class="zone-grid">
          <div v-for="zone in zones" :key="zone.id" class="zone-card" :class="{ unlocked: zone.unlocked, current: zone.id === currentZone }">
            <h3>{{ zone.name }}</h3>
            <p v-if="!zone.unlocked">Costo: ${{ zone.cost }}</p>
            <button v-if="!zone.unlocked && money >= zone.cost" @click="unlockZone(zone.id)">Desbloquear</button>
            <button v-if="zone.unlocked && zone.id !== currentZone" @click="travelToZone(zone.id)">Viajar</button>
            <p v-if="zone.id === currentZone">Ubicación Actual</p>
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
  name: 'MapModal',
  setup() {
    const store = useStore();
    const show = computed(() => store.state.modals.map);
    const close = () => store.dispatch('toggleModal', 'map');
    const zones = computed(() => store.state.zones);
    const currentZone = computed(() => store.state.currentZone);
    const money = computed(() => store.state.money);

    const unlockZone = (zoneId) => {
      store.dispatch('unlockZone', zoneId);
    };

    const travelToZone = (zoneId) => {
      store.dispatch('travelToZone', zoneId);
    };

    return {
      show,
      close,
      zones,
      currentZone,
      money,
      unlockZone,
      travelToZone,
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
  max-width: 800px;
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

.zone-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.zone-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s;
}

.zone-card:hover {
  transform: translateY(-5px);
}

.zone-card.unlocked {
  border: 2px solid #4CAF50;
}

.zone-card.current {
  border: 2px solid #ffd700;
  box-shadow: 0 0 15px #ffd700;
}

.zone-card h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #ffd700;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}
</style>

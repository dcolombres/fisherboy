<template>
  <div id="recycleScreen">
    <div class="recycle-content">
      <button id="closeRecycle" @click="hideRecycleScreen">×</button>
      <h2 class="recycle-title">Centro de Reciclaje</h2>
      
      <div id="trash-items">
        <p v-if="caughtTrashInventory.length === 0" style="text-align: center;">No hay basura para reciclar</p>
        <div v-for="(item, index) in caughtTrashInventory" :key="index" class="trash-item">
          <div class="trash-info">
            <span>{{ item.name }}</span>
            <span>Valor: ${{ item.recycleValue }}</span>
          </div>
          <button class="recycle-button" @click="recycleItem(index)">Reciclar</button>
        </div>
      </div>
      <button class="recycle-all-button" @click="recycleAllTrash">Reciclar Todo</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'RecycleModal',
  setup() {
    const store = useStore();

    const caughtTrashInventory = computed(() => store.getters.getCaughtTrashInventory);

    const hideRecycleScreen = () => {
      // Esto debería ser una acción o mutación en Vuex para controlar la visibilidad del modal
      document.getElementById('recycleScreen').style.display = 'none';
    };

    const recycleItem = (index) => {
      store.dispatch('recycleItem', index); // Asumiendo que esta acción existe en Vuex
    };

    const recycleAllTrash = () => {
      store.dispatch('recycleAllTrash'); // Asumiendo que esta acción existe en Vuex
    };

    return {
      caughtTrashInventory,
      hideRecycleScreen,
      recycleItem,
      recycleAllTrash,
    };
  },
};
</script>

<style scoped>
/* Estilos para RecycleModal */
#recycleScreen {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url('https://moroarte.com/games/reciclaje.jpg') center center;
    background-size: cover;
    z-index: 100;
    color: white;
    padding: 10px;
    box-sizing: border-box;
}

.recycle-content {
    max-width: 900px;
    margin: 30px auto;
    background: rgba(50,150,50,0.95);
    padding: 10px;
    border-radius: 0px;
    position: relative;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.recycle-title {
    text-align: center;
    color: #00ff00;
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.trash-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: rgba(255,255,255,0.1);
    border-radius: 5px;
    margin: 5px 0;
}

.trash-info {
    flex-grow: 1;
}

.recycle-button {
    background: #00aa00;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

.recycle-button:disabled {
    background: #666;
    cursor: not-allowed;
}

.recycle-all-button {
    background: #00ff00;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px auto;
    display: block;
    font-weight: bold;
}
</style>

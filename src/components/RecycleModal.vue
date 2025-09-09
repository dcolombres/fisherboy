<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Centro de Reciclaje</h2>
      <div class="recycle-content">
        <div id="trash-items">
          <p v-if="caughtTrashInventory.length === 0" style="text-align: center;">No hay basura para reciclar</p>
          <div v-for="(item, index) in caughtTrashInventory" :key="index" class="trash-item">
            <div class="trash-info">
              <span>{{ item.name }}</span>
              <span>Valor: ${{ item.recycleValue }}</span>
            </div>
            <button class="btn btn-primary" @click="recycleItem(index)">Reciclar</button>
          </div>
          <div v-if="caughtTrashInventory.length === 0" class="no-trash-actions">
            <button class="btn btn-primary" @click="close">Cerrar</button>
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
  name: 'RecycleModal',
  setup() {
    const store = useStore();
    const show = computed(() => store.state.modals.recycle);
    const close = () => store.dispatch('toggleModal', 'recycle');

    const caughtTrashInventory = computed(() => store.getters.getCaughtTrashInventory);

    const recycleItem = (index) => {
      store.dispatch('recycleItem', index);
    };

    const recycleAllTrash = () => {
      store.dispatch('recycleAllTrash');
    };

    return {
      show,
      close,
      caughtTrashInventory,
      recycleItem,
      recycleAllTrash,
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
  max-width: 600px;
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

.recycle-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#trash-items {
  overflow-y: auto;
  padding-right: 10px;
}

.trash-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin-bottom: 10px;
}

.trash-info {
  flex-grow: 1;
}

.no-trash-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Add some space above the button */
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

  .trash-item {
    flex-direction: column;
    align-items: stretch;
  }

  .trash-info {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .btn {
    width: 100%;
  }
}
</style>
<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Configuración</h2>
      <div class="settings-buttons">
        <button class="btn btn-primary" @click="openModal('stats')">Estadísticas</button>
        <button class="btn btn-primary" @click="openModal('goals')">Objetivos</button>
        <button class="btn btn-primary" @click="openModal('instructions')">Instrucciones</button>
        <button class="btn btn-primary" @click="openModal('treasures')">Tesoros</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'SettingsModal',
  setup() {
    const store = useStore();
    const show = computed(() => store.state.modals.settings);
    const close = () => store.dispatch('toggleModal', 'settings');

    const openModal = (modal) => {
      store.dispatch('toggleModal', modal);
      close();
    };

    return {
      show,
      close,
      openModal,
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
  max-width: 500px;
  border-radius: 15px;
  color: white;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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

.settings-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
}
</style>
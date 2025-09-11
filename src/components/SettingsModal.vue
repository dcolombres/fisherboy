<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Configuración</h2>
      <div class="settings-buttons">
        <button class="settings-btn" @click="openModal('instructions')">Instrucciones</button>
        <button class="settings-btn" @click="openModal('goals')">Objetivos</button>
        <button class="settings-btn" @click="openModal('treasures')">Tesoros</button>
        <button class="settings-btn" @click="openModal('stats')">Estadísticas</button>
        <button class="btn-restart" @click="restartGame">Reiniciar Juego</button>
        <button class="btn-credits" @click="openModal('credits')">Créditos</button>
        <button class="btn-github" @click="openGithub">GitHub</button>
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

    const restartGame = () => {
      if (confirm('¿Estás seguro de que quieres reiniciar el juego? Todo tu progreso se perderá.')) {
        store.dispatch('restartGame');
        close();
      }
    };

    const openGithub = () => {
      window.open('https://github.com/Moro-AR/fisherBOY', '_blank');
    };

    return {
      show,
      close,
      openModal,
      restartGame,
      openGithub,
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
  color: #ffd700;
}

.settings-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.settings-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.1em;
}

.settings-btn:hover {
  background-color: #45a049;
}

.btn-restart {
  grid-column: 1 / -1;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.1em;
  margin-top: 15px;
}

.btn-restart:hover {
  background-color: #c0392b;
}

.btn-credits {
  grid-column: 1 / -1;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.1em;
  margin-top: 15px;
}

.btn-credits:hover {
  background-color: #2980b9;
}

.btn-github {
  grid-column: 1 / -1;
  background-color: #000000;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.1em;
  margin-top: 15px;
}

.btn-github:hover {
  background-color: #333333;
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
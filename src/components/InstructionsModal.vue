<template>
  <div id="instructionsModal" class="modal" v-if="modals.instructions">
    <div class="modal-content">
      <span id="closeInstructions" class="close" @click="hideInstructions">×</span>
      <h2>Instrucciones</h2>
      <p>Toca la pantalla para una pesca corta.</p>
      <p>Mantén presionado para una pesca profunda.</p>
      <p>Si un pez grande pica, toca repetidamente la pantalla para atraparlo.</p>
      <p>Usa los iconos en la parte inferior para navegar por el juego.</p>
      <p>Usa el icono de engranaje para ver las estadísticas, objetivos y tesoros.</p>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'InstructionsModal',
  setup() {
    const store = useStore();
    const modals = computed(() => store.getters.getModals);

    const hideInstructions = () => {
      store.dispatch('toggleModal', 'instructions');
    };

    return {
      modals,
      hideInstructions,
    };
  },
};
</script>

<style scoped>
/* Estilos para InstructionsModal */
.modal {
    display: flex; /* Changed from none to flex */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: rgba(50,50,50,0.95);
    padding: 20px;
    width: 70%;
    max-width: 600px;
    border-radius: 5px;
    color: white;
    position: relative;
    text-align: center;
    max-height: 80vh;
    overflow-y: auto;
}

#instructionsModal h2 {
    color: #ffd700;
    margin-bottom: 20px;
}

#instructionsModal p {
    margin-bottom: 10px;
}

.close {
    color: #aaa;
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
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

  p {
    font-size: 1em;
  }
}
</style>
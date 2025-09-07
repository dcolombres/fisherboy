<template>
  <div id="instructionsModal" class="modal" v-if="modals.instructions">
    <div class="modal-content">
      <span id="closeInstructions" class="close" @click="hideInstructions">×</span>
      <h2>Instrucciones</h2>
      <p>Usa las flechas ← → para mover el barco</p>
      <p>Usa la flecha ↑ para lanzar la caña</p>
      <p>Presiona 'M' para el Mercado, 'S' para Estadísticas, 'G' para Objetivos, 'R' para Reciclaje, 'T' para Tesoros.</p>
      <p>Presiona 'V' para Vender Pescado, 'D' para Dormir, 'E' para Equipamiento.</p>
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
#instructionsModal {
    display: none; /* Controlado por v-if */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    z-index: 1000;
}

#instructionsModal .modal-content {
    background-color: rgba(50,50,50,0.95);
    margin: 15% auto;
    padding: 20px;
    width: 70%;
    max-width: 600px;
    border-radius: 5px;
    color: white;
    position: relative;
    text-align: center;
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
    float: right;
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
</style>
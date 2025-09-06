<template>
  <div id="treasuresModal" class="modal">
    <div class="modal-content">
      <span id="closeTreasures" class="close" @click="hideTreasures">×</span>
      <h2>Tesoros</h2>
      <p>¡Próximamente!</p>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'TreasuresModal',
  setup() {
    const store = useStore();

    const hideTreasures = () => {
      // Esto debería ser una acción o mutación en Vuex para controlar la visibilidad del modal
      document.getElementById('treasuresModal').style.display = 'none';
    };

    return {
      hideTreasures,
    };
  },
};
</script>

<style scoped>
/* Estilos para TreasuresModal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    z-index: 1000;
}

.modal-content {
    background-color: rgba(50,50,50,0.95);
    margin: 15% auto;
    padding: 20px;
    width: 70%;
    max-width: 600px;
    border-radius: 5px;
    color: white;
    position: relative;
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

#treasuresModal h2 {
    color: #ffd700;
    text-align: center;
    margin-bottom: 20px;
}

#treasuresModal p {
    text-align: center;
    font-size: 1.2em;
    color: #ddd;
}
</style>
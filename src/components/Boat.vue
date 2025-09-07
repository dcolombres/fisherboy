<template>
  <div id="boat" :style="{ left: boatPosition + '%', bottom: '45%' }">
    <div id="fisher"></div>
    <div id="fishingLine" :style="{ height: isFishing ? '200px' : '100px' }"></div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Boat',
  setup() {
    const store = useStore();

    const boatPosition = computed(() => store.state.boatPosition);
    const isFishing = computed(() => store.state.isFishing);

    return {
      boatPosition,
      isFishing,
    };
  },
};
</script>

<style scoped>
/* Estilos para Boat */
#boat {
    position: absolute;
    bottom: 25%;
    left: 30px; 
    width: 200px;
    height: 100px;
    background-image: url('https://moroarte.com/games/boat.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.3s ease; /* Transición para movimiento suave */
}

#boat::after {
    content: '';
    position: absolute;
    z-index: 3;
    bottom: -20px;  /* Posicionado debajo del barco */
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://moroarte.com/games/boat.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transform: rotateX(180deg) scaleY(0.4);  /* Volteado y aplastado para simular reflejo */
    opacity: 0.3;  /* Semi-transparente */
    filter: blur(1px);  /* Ligero desenfoque */
    animation: reflection 3s ease-in-out infinite;  /* Animación de ondulación */
}

@keyframes reflection {
    0%, 100% { transform: rotateX(180deg) scaleY(0.4) translateY(0); }
    50% { transform: rotateX(180deg) scaleY(0.4) translateY(2px); }
}

.boat-selected {
    transform: translateX(-30%) scale(1.2);
}

#boat.advanced-boat::after {
    transform-origin: top;
    transform: rotateX(180deg) scaleY(0.4) scale(1.2);
}

#boat.pro-boat::after {
    transform-origin: top;
    transform: rotateX(180deg) scaleY(0.4) scale(1.4);
}

#fisher {
    position: absolute;
    width: 60px;
    height: 120px;
    top: -40px;
    left: 60px;
    background-image: url('https://moroarte.com/games/fisherboy.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 3;
}

#fishingLine {
    position: absolute;
    width: 1px;
    height: 100px;
    background-color: #fff;
    top: 50px;
    left: 100px;
    transform-origin: top;
    transition: height 0.3s; /* Transición para la animación de lanzar/recoger */
}
</style>
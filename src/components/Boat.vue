<template>
  <div id="boat" :style="{ left: boatPosition + '%', bottom: '45%' }">
    <div id="fisher"></div>
    <div id="fishingLine" :class="fishingDepth" :style="{ backgroundColor: fishingLineColor }"></div>
    <div class="wake-container">
      <div v-for="particle in wakeParticles" :key="particle.id" class="wake-particle"></div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';

export default {
  name: 'Boat',
  setup() {
    const store = useStore();

    const boatPosition = computed(() => store.state.boatPosition);
    const fishingDepth = computed(() => store.state.fishingDepth);
    const currentRod = computed(() => store.state.currentRod);
    const wakeParticles = ref([]);
    let particleId = 0;

    const fishingLineColor = computed(() => {
      switch (currentRod.value) {
        case 0: return 'white'; // Caña Básica
        case 1: return 'yellow'; // Caña Profesional
        case 2: return 'magenta'; // Caña Maestra
        default: return 'white';
      }
    });

    const createWakeParticle = () => {
        const id = particleId++;
        wakeParticles.value.push({ id });
        setTimeout(() => {
            wakeParticles.value.shift();
        }, 1000); // Match animation duration
    };

    watch(boatPosition, () => {
      createWakeParticle();
    });

    return {
      boatPosition,
      fishingDepth,
      fishingLineColor,
      wakeParticles,
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
    width: 2px;
    height: 0;
    top: 50px;
    left: 100px;
    transform-origin: top;
    transition: height 0.5s ease-in-out;
    z-index: 2;
}

#fishingLine.normal {
    height: 150px;
}

#fishingLine.deep {
    height: 300px;
}

.wake-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.wake-particle {
    position: absolute;
    bottom: 10px;
    left: 50%;
    width: 8px;
    height: 4px;
    background: white;
    border-radius: 50%;
    animation: wake-animation 1s ease-out forwards;
}

@keyframes wake-animation {
    0% {
        transform: translateX(-50%) scale(0.2);
        opacity: 0.7;
    }
    100% {
        transform: translateX(-50%) scale(5, 1.5); /* Wider than tall */
        opacity: 0;
    }
}
</style>
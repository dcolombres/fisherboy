<template>
  <div class="water" :class="{ 'night-time': isNight, 'storm-active': stormActive }" :style="{ height: '50%' }">
    <div
      v-for="fish in fishes"
      :key="fish.id"
      class="fish"
      :class="[fish.direction, fish.size, { 'exotic': fish.isExotic }]"
      :style="{ top: fish.y + '%', left: fish.x + '%', animationDuration: fish.speed + 's' }"
      v-html="fish.shape"
    ></div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'Water',
  setup() {
    const store = useStore();
    const fishes = ref([]);
    let fishInterval = null;

    const isNight = computed(() => store.getters.getIsNight);
    const stormActive = computed(() => store.getters.getStormActive);
    const fishTypes = computed(() => store.state.fishTypes);

    const fishShapes = [
      `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M95 50 C80 80 40 80 20 50 C40 20 80 20 95 50 Z" fill="{color}"/></svg>`,
      `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M90 50 C70 90 30 90 10 50 C30 10 70 10 90 50 Z" fill="{color}"/></svg>`,
      `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M98 50 C70 70 40 80 15 65 C10 50 10 50 15 35 C40 20 70 30 98 50 Z" fill="{color}"/></svg>`
    ];

    const createFish = () => {
      const fishType = fishTypes.value[Math.floor(Math.random() * fishTypes.value.length)];
      const direction = Math.random() > 0.5 ? 'swimming-right' : 'swimming-left';
      const size = ['size-small', 'size-medium', 'size-large'][Math.floor(Math.random() * 3)];
      const speed = Math.random() * 5 + 5; // 5-10 seconds
      const y = Math.random() * 80; // 0-80% from top of water
      const x = direction === 'swimming-right' ? -10 : 110; // Start off-screen
      const shape = fishShapes[Math.floor(Math.random() * fishShapes.length)].replace('{color}', fishType.color);

      fishes.value.push({
        id: Date.now() + Math.random(),
        type: fishType.name,
        color: fishType.color,
        direction,
        size,
        speed,
        y,
        x,
        isExotic: fishType.isExotic || false,
        shape
      });

      // Eliminar el pez después de que termine su animación
      setTimeout(() => {
        fishes.value.shift();
      }, speed * 1000);
    };

    onMounted(() => {
      fishInterval = setInterval(createFish, 3000); // Crea un pez cada 3 segundos
    });

    onUnmounted(() => {
      clearInterval(fishInterval);
    });

    return {
      isNight,
      stormActive,
      fishes,
    };
  },
};
</script>

<style scoped>
/* Estilos para Water */
.water {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(180deg, #0066cc 0%, #003366 100%);
    opacity: 0.8;
    z-index: 0;
    overflow: hidden; /* Asegura que los peces no se salgan del agua */
}

.water.night-time {
    background: linear-gradient(180deg, #001428 0%, #000810 100%);
}

.water.storm-active {
    background: linear-gradient(180deg, #004080 0%, #001f3f 100%);
    animation: waves 2s ease-in-out infinite;
}

@keyframes waves {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
}

/* Estilos base para los peces */
.fish {
    position: absolute;
    width: 50px; /* Ajusta el tamaño del contenedor del pez si es necesario */
    height: 50px; /* Ajusta el tamaño del contenedor del pez si es necesario */
    display: flex;
    align-items: center;
    opacity: 0.7;
    z-index: 0; /* Detrás del barco y otros elementos */
}

.fish.exotic {
    filter: drop-shadow(0 0 8px #ffd700) drop-shadow(0 0 15px #ffd700); /* Resplandor dorado */
    opacity: 1;
}

/* Tamaños de los peces */
.fish.size-small {
    transform: scale(0.7);
}
.fish.size-medium {
    transform: scale(1);
}
.fish.size-large {
    transform: scale(1.4);
}

/* Animación de nado vertical de los peces */
@keyframes fishSwim {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
}

/* Combinación de animaciones para el nado horizontal y vertical */
.fish.swimming-right {
    animation: swimRight linear infinite, fishSwim ease-in-out infinite;
}
.fish.swimming-left {
    animation: swimLeft linear infinite, fishSwim ease-in-out infinite;
    transform: scaleX(-1); /* Voltea el pez horizontalmente */
}

/* Keyframes para el movimiento horizontal de los peces */
@keyframes swimRight {
    from { left: -10%; }
    to { left: 110%; }
}
@keyframes swimLeft {
    from { left: 110%; }
    to { left: -10%; }
}
</style>
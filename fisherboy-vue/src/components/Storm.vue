<template>
  <div class="storm" id="stormEffect"></div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Storm',
  setup() {
    const store = useStore();

    const stormActive = computed(() => store.getters.getStormActive);

    // Observar stormActive para aplicar/remover la clase 'active'
    // Esto se hará con un watcher en el componente padre o con una directiva de clase en el template

    return {
      stormActive,
    };
  },
};
</script>

<style scoped>
/* Estilos para Storm */
.storm {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, 
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.5) 100%);
    opacity: 0;
    transition: opacity 0.5s;
    z-index: 10;
    pointer-events: none; /* Permite hacer clic a través de la capa de tormenta */
}

.storm.active {
    opacity: 1;
}

.water.storm-active {
    background: linear-gradient(180deg, #004080 0%, #001f3f 100%);
    animation: waves 2s ease-in-out infinite;
}

@keyframes waves {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
}

/* Estilo para las gotas de lluvia */
.raindrop {
    position: absolute;
    pointer-events: none;
    background: linear-gradient(transparent, rgba(255,255,255,0.7));
    width: 2px;
    height: 20px;
    animation: fall linear;
}

@keyframes fall {
    from {
        transform: translateY(-120vh);
    }
    to {
        transform: translateY(120vh);
    }
}
</style>
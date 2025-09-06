<template>
  <div id="messageConsole">
    <p v-for="(message, index) in messages" :key="index" class="message" :class="`message-${message.type}`">
      {{ message.text }}
    </p>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'MessageConsole',
  setup() {
    const store = useStore();

    // Asumiendo que los mensajes se gestionarán en el store de Vuex
    const messages = computed(() => store.state.messages); // Necesitará una propiedad 'messages' en el store

    return {
      messages,
    };
  },
};
</script>

<style scoped>
/* Estilos para MessageConsole */
#messageConsole {
    position: fixed;
    top: 150px;
    left: 20px;
    right: 300px;
    height: 190px;
    background: rgba(0,0,0,0.05);
    color: blue;
    padding: 10px;
    border-radius: 0px;
    overflow-y: auto; /* Scroll si hay muchos mensajes */
    font-size: 10px;
    -ms-overflow-style: none;  /* Oculta scrollbar en IE/Edge */
    scrollbar-width: none;  /* Oculta scrollbar en Firefox */
}
#messageConsole::-webkit-scrollbar {
    display: none; /* Oculta scrollbar en Chrome/Safari */
}

/* Estilos para cada tipo de mensaje */
#messageConsole .message {
    padding: 4px 8px;
    margin: 3px 0;
    border-radius: 4px;
    font-size: 11px;
}
#messageConsole .message-normal {
    color: #ffffff;
    background: rgba(0, 0, 0, 0.5);
}
#messageConsole .message-catch {
    color: #50fa7b; /* Verde para capturas */
    background: rgba(0, 0, 0, 0.5);
    font-weight: bold;
}
#messageConsole .message-achievement {
    color: #ffd700; /* Dorado para logros */
    background: rgba(0, 0, 0, 0.5);
    font-weight: bold;
}
#messageConsole .message-warning {
    color: #ff5555; /* Rojo para advertencias */
    background: rgba(0, 0, 0, 0.5);
}
#messageConsole .message-system {
    color: #8be9fd; /* Azul claro para mensajes del sistema */
    background: rgba(0, 0, 0, 0.5);
    font-style: italic;
}
</style>
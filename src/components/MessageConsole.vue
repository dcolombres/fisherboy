<template>
  <div id="message-console">
    <transition-group name="message-fade" tag="div">
      <p v-for="message in messages" :key="message.id" class="message" :class="`message-${message.type}`">
        {{ message.text }}
      </p>
    </transition-group>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'MessageConsole',
  setup() {
    const store = useStore();
    const messages = computed(() => store.state.messages);
    return { messages };
  },
};
</script>

<style scoped>
#message-console {
  position: fixed;
  bottom: 60px;
  left: 20px;
  width: 350px;
  height: 200px;
  display: flex;
  flex-direction: column-reverse; /* Los mensajes nuevos aparecen abajo y empujan los viejos hacia arriba */
  pointer-events: none; /* Permite hacer clic a través de la consola */
}

.message {
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.5s ease;
}

/* Estilos específicos para cada tipo de mensaje */
.message-catch { color: #50fa7b; }
.message-achievement { color: #ffd700; }
.message-warning { color: #ff5555; }
.message-system { color: #8be9fd; font-style: italic; }

/* Animaciones de transición */
.message-fade-enter-active, .message-fade-leave-active {
  transition: all 0.5s ease;
}
.message-fade-enter-from, .message-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
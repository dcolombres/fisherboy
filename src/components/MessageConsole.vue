<template>
  <div id="message-console">
    <transition name="message-fade">
      <p v-if="messages.length > 0" :key="messages[0].id" class="message" :class="`message-${messages[0].type}`">
        {{ messages[0].text }}
      </p>
    </transition>
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
  bottom: 25px;
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center horizontally */
  width: 100%; /* Adjust width for mobile */
  max-width: 400px; /* Max width for larger screens */
  height: auto; /* Auto height */
  display: flex;
  flex-direction: column-reverse; /* New messages appear at the bottom */
  pointer-events: none; /* Allows clicking through the console */
  align-items: center; /* Center the message horizontally */
}

.message {
  background: rgba(0, 0, 0, 0);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.5s ease;
}

/* Estilos específicos para cada tipo de mensaje */
.message-catch { color: #50fa7b; font-style: bold;}
.message-achievement { color: #ffd700; }
.message-warning { color: #ff5555; }
.message-system { color: #c0e5ee; font-style: italic; }

/* Animaciones de transición */
.message-fade-enter-active, .message-fade-leave-active {
  transition: all 0.3s ease;
}
.message-fade-enter-from, .message-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
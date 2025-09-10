<template>
  <div id="message-console">
    <transition-group name="message-list" tag="div">
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
  bottom: 80px; /* Position above the bottom bar */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-height: 150px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  pointer-events: none;
  z-index: 999;
}

.message {
  background: transparent;
  color: white;
  padding: 5px 10px;
  border-radius: 0px;
  margin-bottom: 5px;
  font-size: 1.2em;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.7);
  transition: all 0.5s ease;
}

.message-catch { color: #50fa7b; }
.message-achievement { color: #ffd700; }
.message-warning { color: #ff5555; }
.message-system { color: #8be9fd; }
.message-tip { color: #bd93f9; }

.message-list-enter-active,
.message-list-leave-active {
  transition: all 0.5s ease;
}
.message-list-enter-from,
.message-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media (max-width: 768px) {
  #message-console {
    width: calc(100% - 40px);
    bottom: 70px;
  }
}
</style>
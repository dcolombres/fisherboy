<template>
  <div class="modal" v-if="show" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Créditos</h2>
      <div class="credits-content">
        <p><strong>Desarrollador:</strong> Moro</p>
        <p><strong>Música:</strong> Artlist.io</p>
        <p><strong>Sonidos:</strong> Freesound.org</p>
        <p><strong>Inspiración:</strong> Stardew Valley, Animal Crossing</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'CreditsModal',
  setup() {
    const store = useStore();
    const show = computed(() => store.state.modals.credits);
    const close = () => store.dispatch('toggleModal', 'credits');

    return {
      show,
      close,
    };
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #222222;
  padding: 30px;
  width: 80%;
  max-width: 500px;
  border-radius: 15px;
  color: white;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.close {
  color: #aaa;
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close:hover,
.close:focus {
  color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #ffd700;
}

.credits-content {
  text-align: center;
}
</style>

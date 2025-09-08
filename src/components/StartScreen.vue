<template>
  <div class="start-screen-overlay">
    <div class="start-screen-background">
      <img src="/src/img/muelle.svg" alt="Muelle" class="start-muelle-img" />
      
    </div>
    <div class="start-screen-content">
      <h1>FisherBOY</h1>
      
      <div class="instructions-columns">
        <ul>
          <li>Haz clic en el agua para pescar.</li>
          <li>Mantén presionado para pesca profunda (¡cuidado con la energía!).</li>
          <li>Vendé tus peces en el mercado para ganar dinero.</li>
          <li>Reciclá la basura para obtener dinero extra.</li>
        </ul>
      </div>
      <button @click="startGame">Jugar</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'StartScreen',
  setup(props, { emit }) {
    const store = useStore();

    const startGame = () => {
      emit('game-started');
      // Set gameStarted to true after user interaction
      store.commit('setGameStarted', true);
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    };

    return {
      startGame,
    };
  },
};
</script>

<style scoped>
.start-screen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Slightly less opaque */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden; /* Hide overflow from images */
}

.start-screen-background {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1; /* Behind the content */
}

.start-muelle-img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40%; /* Adjust size as needed */
  height: auto;
  opacity: 0.7;
}

.start-fisherboy-img {
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 20%; /* Adjust size as needed */
  height: auto;
  opacity: 0.8;
}

.start-screen-content {
  text-align: center;
  color: white;
  max-width: 800px; /* Adjusted max-width for two columns */
  padding: 30px; /* Adjusted padding */
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  border: 2px solid #00FFFF;
  position: relative;
  z-index: 1;
}

.start-screen-content h1 {
  font-size: 4em; /* Larger title */
  margin-bottom: 20px;
  color: #00FFFF; /* Cyan color for title */
  text-shadow: 0 0 10px #00FFFF; /* Glow for title */
}

.start-screen-content p {
  font-size: 1.2em;
  margin-bottom: 25px;
}

.instructions-columns {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two columns */
  gap: 20px; /* Gap between columns */
  margin-bottom: 30px;
  text-align: left;
  font-size: 1.1em;
}

.instructions-columns ul {
  list-style: none;
  padding: 0;
  margin: 0; /* Remove default ul margin */
}

.start-screen-content li {
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
}

.start-screen-content button {
  padding: 18px 40px; /* Larger button */
  font-size: 1.8em; /* Larger font */
  background-color: #00FFFF; /* Cyan button */
  color: #2c3e50; /* Dark text on button */
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-weight: bold;
  box-shadow: 0 0 15px #00FFFF; /* Button glow */
}

.start-screen-content button:hover {
  background-color: #00DDDD; /* Slightly darker cyan on hover */
  transform: scale(1.05); /* Slight zoom effect */
}
</style>
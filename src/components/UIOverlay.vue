<template>
  <div id="ui">
    Dinero: $<span id="money">0</span><br>
    Peces atrapados: <span id="fishCount">0</span>
    <div id="energy-bar">
        <div id="energy-fill" style="width: 100%;"></div>
    </div>
    <div id="time-indicator">Día 1 - 06:16</div>
  </div>

  <!-- Botones principales del juego -->
  <button id="sellFishButton">Vender PESCADO</button>
  <button id="sleepButton">¡Ir a Dormir!</button>
  <button id="treasuresButton">Tesoros (t)</button>
  <button id="marketButton">Mercado del Pescador (m)</button>
  <button id="recyclingButton">Centro de Reciclaje (r)</button>
  <button id="statsButton">Ver Estadísticas (s)</button>
  <button id="goalsButton">Ver Objetivos (g)</button>

  <!-- Botón de ayuda -->
  <button id="helpButton">?</button>
</template>

<script>
export default {
  name: 'UIOverlay',
  // Aquí se conectará con Vuex para obtener y actualizar el estado
};
</script>

<style scoped>
/* Estilos para UIOverlay */
#ui {
    position: fixed;
    top: 0px; /* Ajustar según el diseño final */
    left: 120px; 
    right: 300px;
    background: rgba(0,0,0,0); /* Fondo transparente */
    color: white;
    padding: 20px;
    border-radius: 0px;
}

#energy-bar {
    position: fixed;
    top: 110px;
    left: 20px;
    right: 300px;
    height: 20px;
    background: rgba(0,0,0,0.5);
    border: 1px solid white;
    border-radius: 10px;
    overflow: hidden;
}
#energy-fill {
    height: 100%;
    background: linear-gradient(90deg, #ff0 0%, #fa0 100%); /* Degradado amarillo/naranja */
    width: 100%;
    transition: width 0.9s; /* Transición suave al cambiar la energía */
}

#time-indicator {
    position: fixed;
    bottom: 30px;
    left: 30px;
    color: white;
    font-size: 14px;
}

/* Estilos para los botones principales de la interfaz */
#goalsButton {
    position: fixed;
    right: 10px;
    bottom: 20px;
    background: grey;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 100;
    width: 200px;
}

#treasuresButton {
    position: fixed;
    right: 10px;
    bottom: 180px;
    background: orangered;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 100;
    width: 200px;
}
  
#marketButton {
    position: fixed;
    right: 10px;
    bottom: 140px;
    background: #9c27b0;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 100;
    width: 200px;
}

#recyclingButton {
    position: fixed;
    right: 10px;
    bottom: 100px;
    background: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 100;
    width: 200px;
}

#statsButton {
    position: fixed;
    right: 10px;
    bottom: 60px;
    background: #4682B4;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 100;
    width: 200px;
}

/* Estilos para los botones de acción principales (Vender, Dormir) */
#sellFishButton {
    position: fixed;
    right: 10px;
    bottom: 280px;
    background: #FFD700; /* Color dorado */
    color: black;
    padding: 10px 20px;
    border-radius: 0px;
    cursor: pointer;
    z-index: 100;
    width: 200px;
    font-weight: bold;
}

#sleepButton {
    position: fixed;
    right: 10px;
    bottom: 240px;
    background: #4B0082; /* Color índigo */
    color: white;
    padding: 10px 20px;
    border-radius: 0px;
    cursor: pointer;
    z-index: 100;
    width: 200px;
}

/* Estilos para el botón de ayuda */
#helpButton {
    position: fixed;
    top: 20px;
    left: 140px; /* Al lado del logo */
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: 1px solid white;
    border-radius: 50%; /* Hace que el botón sea redondo */
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

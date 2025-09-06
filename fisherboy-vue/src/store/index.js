import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      // --- ESTADO DEL JUEGO ---
      money: 0, // Dinero actual del jugador.
      fishCount: 0, // Cantidad total de peces atrapados.
      energy: 100, // Energía actual del jugador (0-100).
      gameTime: 360, // Tiempo de juego en minutos (un día de 24h = 1440 min).
      currentDay: 1, // Día actual del juego.
      isNight: false, // Booleano que indica si es de noche.
      isFishing: false, // Booleano que indica si el jugador está pescando activamente.
      boatPosition: 5, // Posición horizontal del barco en porcentaje.
      currentRod: 0, // Índice de la caña de pescar actualmente seleccionada.
      currentBoat: 0, // Índice del barco actualmente seleccionado.
      unlockedRods: [true, false, false], // Array que indica qué cañas ha desbloqueado el jugador.
      unlockedBoats: [true, false, false], // Array que indica qué barcos ha desbloqueado el jugador.
      todayFishCount: 0, // Contador de peces atrapados en el día actual.
      todayFishValue: 0, // Valor total de los peces atrapados en el día actual.
      caughtFishInventory: [], // Inventario de los peces atrapados hoy.
      caughtTrashInventory: [], // Inventario de la basura atrapada.
      stormActive: false, // Booleano que indica si hay una tormenta activa.
      lastStormTime: 0, // Marca de tiempo de la última tormenta para controlar su frecuencia.
      lastEnergyRegen: Date.now(), // Marca de tiempo de la última regeneración de energía.
      fishingStats: { // Objeto para mantener estadísticas de pesca a largo plazo.
        totalCaught: 0,
        totalValue: 0,
        fishByType: {}
      },
      octopusActive: false, // Booleano para el evento especial del pulpo.
      lastOctopusDay: 0,
      mermaidActive: false, // Booleano para el evento especial de la sirena.
      lastMermaidDay: 0,
      instructionsHidden: false, // Booleano para ocultar las instrucciones iniciales.
      cheatCode: '', // Cadena para registrar la entrada de trucos.
      MONEY_CHEAT: 'money', // El código de truco para obtener dinero.
      messages: [], // Array para almacenar los mensajes de la consola.
    };
  },
  mutations: {
    // Mutaciones para actualizar el estado
    setMoney(state, value) {
      state.money = value;
    },
    setFishCount(state, value) {
      state.fishCount = value;
    },
    setEnergy(state, value) {
      state.energy = value;
    },
    setGameTime(state, value) {
      state.gameTime = value;
    },
    setCurrentDay(state, value) {
      state.currentDay = value;
    },
    setIsNight(state, value) {
      state.isNight = value;
    },
    setIsFishing(state, value) {
      state.isFishing = value;
    },
    setBoatPosition(state, value) {
      state.boatPosition = value;
    },
    setCurrentRod(state, value) {
      state.currentRod = value;
    },
    setCurrentBoat(state, value) {
      state.currentBoat = value;
    },
    setUnlockedRods(state, value) {
      state.unlockedRods = value;
    },
    setUnlockedBoats(state, value) {
      state.unlockedBoats = value;
    },
    setTodayFishCount(state, value) {
      state.todayFishCount = value;
    },
    setTodayFishValue(state, value) {
      state.todayFishValue = value;
    },
    setCaughtFishInventory(state, value) {
      state.caughtFishInventory = value;
    },
    setCaughtTrashInventory(state, value) {
      state.caughtTrashInventory = value;
    },
    setStormActive(state, value) {
      state.stormActive = value;
    },
    setLastStormTime(state, value) {
      state.lastStormTime = value;
    },
    setLastEnergyRegen(state, value) {
      state.lastEnergyRegen = value;
    },
    setFishingStats(state, value) {
      state.fishingStats = value;
    },
    setOctopusActive(state, value) {
      state.octopusActive = value;
    },
    setLastOctopusDay(state, value) {
      state.lastOctopusDay = value;
    },
    setMermaidActive(state, value) {
      state.mermaidActive = value;
    },
    setLastMermaidDay(state, value) {
      state.lastMermaidDay = value;
    },
    setInstructionsHidden(state, value) {
      state.instructionsHidden = value;
    },
    setCheatCode(state, value) {
      state.cheatCode = value;
    },
    setMoneyCheat(state, value) {
      state.MONEY_CHEAT = value;
    },
    // Mutaciones para añadir elementos a inventarios
    addCaughtFish(state, fish) {
      state.caughtFishInventory.push(fish);
    },
    addCaughtTrash(state, trash) {
      state.caughtTrashInventory.push(trash);
    },
    // Mutación para actualizar una estadística de pesca específica
    updateFishStats(state, { fishName, count, totalValue }) {
      if (!state.fishingStats.fishByType[fishName]) {
        state.fishingStats.fishByType[fishName] = { count: 0, totalValue: 0 };
      }
      state.fishingStats.fishByType[fishName].count += count;
      state.fishingStats.fishByType[fishName].totalValue += totalValue;
    },
    // Mutación para actualizar el total de peces atrapados y el valor total
    updateTotalFishingStats(state, { totalCaught, totalValue }) {
      state.fishingStats.totalCaught = totalCaught;
      state.fishingStats.totalValue = totalValue;
    },
    // Mutación para añadir un mensaje a la consola
    addMessage(state, messagePayload) {
      state.messages.push(messagePayload);
      // Limita el número de mensajes en la consola a 10.
      if (state.messages.length > 10) {
        state.messages.shift(); // Elimina el mensaje más antiguo
      }
    },
  },
  actions: {
    // Acciones para interactuar con el estado
    earnMoney({ commit, state }, amount) {
      commit('setMoney', state.money + amount);
    },
    spendMoney({ commit, state }, amount) {
      commit('setMoney', state.money - amount);
    },
    incrementFishCount({ commit, state }) {
      commit('setFishCount', state.fishCount + 1);
    },
    decrementEnergy({ commit, state }, amount) {
      commit('setEnergy', state.energy - amount);
    },
    incrementGameTime({ commit, state }) {
      commit('setGameTime', state.gameTime + 1);
    },
    // Acción para añadir un mensaje a la consola
    addMessage({ commit }, messagePayload) {
      commit('addMessage', messagePayload);
    },
    // ... (más acciones según sea necesario)
  },
  getters: {
    // Getters para obtener datos del estado
    getMoney: (state) => state.money,
    getFishCount: (state) => state.fishCount,
    getEnergy: (state) => state.energy,
    getGameTime: (state) => state.gameTime,
    getCurrentDay: (state) => state.currentDay,
    getIsNight: (state) => state.isNight,
    getIsFishing: (state) => state.isFishing,
    getBoatPosition: (state) => state.boatPosition,
    getCurrentRod: (state) => state.currentRod,
    getCurrentBoat: (state) => state.currentBoat,
    getUnlockedRods: (state) => state.unlockedRods,
    getUnlockedBoats: (state) => state.unlockedBoats,
    getTodayFishCount: (state) => state.todayFishCount,
    getTodayFishValue: (state) => state.todayFishValue,
    getCaughtFishInventory: (state) => state.caughtFishInventory,
    getCaughtTrashInventory: (state) => state.caughtTrashInventory,
    getStormActive: (state) => state.stormActive,
    getLastStormTime: (state) => state.lastStormTime,
    getLastEnergyRegen: (state) => state.lastEnergyRegen,
    getFishingStats: (state) => state.fishingStats,
    getOctopusActive: (state) => state.octopusActive,
    getLastOctopusDay: (state) => state.lastOctopusDay,
    getMermaidActive: (state) => state.mermaidActive,
    getLastMermaidDay: (state) => state.lastMermaidDay,
    getInstructionsHidden: (state) => state.instructionsHidden,
    getCheatCode: (state) => state.cheatCode,
    getMoneyCheat: (state) => state.MONEY_CHEAT,
    getMessages: (state) => state.messages, // Getter para los mensajes
  },
});

export default store;

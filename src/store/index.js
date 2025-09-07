import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      // --- Game State ---
      money: 0,
      commonFishCount: 0,
      exoticFishCount: 0,
      trashCount: 0,
      treasuresCount: 0, // TODO: Implement treasures
      energy: 100,
      gameTime: 360, // In-game minutes
      currentDay: 1,
      isNight: false,
      isFishing: false,
      boatPosition: 50,
      currentRod: 0,
      currentBoat: 0,
      unlockedRods: [true, false, false],
      unlockedBoats: [true, false, false],
      caughtFishInventory: [],
      caughtTrashInventory: [],
      fishingStats: {
        totalCaught: 0,
        totalValue: 0,
        fishByType: {}
      },
      messages: [],
      modals: {
        market: false,
        stats: false,
        goals: false,
        recycle: false,
        treasures: false,
        instructions: false,
        equipment: false,
      },
      // --- Game Configuration ---
      fishingRods: [
        { name: "Caña Básica", power: 1, speed: 1, catchRate: 0.6, price: 0 },
        { name: "Caña Profesional", power: 1.5, speed: 1.3, catchRate: 0.75, price: 5000 },
        { name: "Caña Maestra", power: 2, speed: 1.6, catchRate: 0.9, price: 20000 }
      ],
      boats: [
        { name: "Barco Básico", speedMultiplier: 1, catchBonus: 1, price: 0, image: 'https://moroarte.com/games/boat.png' },
        { name: "Barco Avanzado", speedMultiplier: 1.5, catchBonus: 1.2, price: 25000, image: 'https://moroarte.com/games/botelvl1.png' },
        { name: "Barco Profesional", speedMultiplier: 2, catchBonus: 1.5, price: 150000, image: 'https://moroarte.com/games/botelvl2.png' }
      ],
      trashTypes: [
        { name: "Botella de Plástico", recycleValue: 150 },
        { name: "Red Vieja", recycleValue: 250 },
        { name: "Lata de Conserva", recycleValue: 200 },
        { name: "Botella de Vidrio", recycleValue: 300 },
        { name: "Neumático de Goma", recycleValue: 1500 },
        { name: "Sedal de Pesca", recycleValue: 100 },
        { name: "Chatarra de Metal", recycleValue: 150 },
        { name: "Bolsa de Plástico", recycleValue: 50 },
        { name: "Caña Rota", recycleValue: 1000 },
        { name: "Contenedor de Aceite", recycleValue: 1400 }
      ],
      fishTypes: [
        { name: "Sardina", value: 50, color: "silver", speed: 1, rarity: 0.3, isExotic: false },
        { name: "Atún", value: 100, color: "darkblue", speed: 1.2, rarity: 0.25, isExotic: false },
        { name: "Salmón", value: 200, color: "salmon", speed: 1.5, rarity: 0.2, isExotic: false },
        { name: "Pez Dorado", value: 400, color: "gold", speed: 2, rarity: 0.15, isExotic: false },
        { name: "Pez Espada", value: 900, color: "gray", speed: 2.2, rarity: 0.1, isExotic: false },
        { name: "Tiburón", value: 1500, color: "darkgray", speed: 2.5, rarity: 0.05, isExotic: false },
        { name: "Pez Globo", value: 300, color: "yellow", speed: 1.8, rarity: 0.18, isExotic: false },
        { name: "Lenguado", value: 150, color: "tan", speed: 1.3, rarity: 0.22, isExotic: false },
        { name: "Lubina", value: 2550, color: "silver", speed: 1.6, rarity: 0.2, isExotic: false },
        { name: "Pez Payaso", value: 80, color: "orange", speed: 1.4, rarity: 0.28, isExotic: false },
        {
            name: "Pez Dragón Celestial",
            value: 34500,
            color: "#4a90e2",
            speed: 3.5,
            rarity: 0.001,
            isExotic: true
        },
        {
            name: "Leviatán Abisal",
            value: 28000,
            color: "#1e0f3d",
            speed: 3.2,
            rarity: 0.002,
            isExotic: true
        },
        {
            name: "Quimera Luminosa",
            value: 25000,
            color: "#50fa7b",
            speed: 3.0,
            rarity: 0.003,
            isExotic: true
        },
        {
            name: "Pez Fénix",
            value: 22000,
            color: "#ff5555",
            speed: 2.8,
            rarity: 0.004,
            isExotic: true
        },
        {
            name: "Mini Kraken",
            value: 18500,
            color: "#8b0000",
            speed: 2.7,
            rarity: 0.005,
            isExotic: true
        },
        {
            name: "Sirena Escamada",
            value: 15000,
            color: "#ff79c6",
            speed: 2.6,
            rarity: 0.006,
            isExotic: true
        },
        {
            name: "Pez Unicornio",
            value: 12000,
            color: "#bd93f9",
            speed: 2.5,
            rarity: 0.007,
            isExotic: true
        },
        {
            name: "Medusa de Cristal",
            value: 9000,
            color: "#8be9fd",
            speed: 2.4,
            rarity: 0.008,
            isExotic: true
        },
        {
            name: "Serpiente Marina",
            value: 7500,
            color: "#50fa7b",
            speed: 2.3,
            rarity: 0.009,
            isExotic: true
        },
        {
            name: "Pez Espectral",
            value: 5000,
            color: "#f8f8f2",
            speed: 2.2,
            rarity: 0.01,
            isExotic: true
        },
        {
            name: "Leviatán de las Profundidades",
            value: 45000,
            color: "#800080",
            speed: 4.0,
            rarity: 0.001,
            requirements: { boat: 2, rod: 2 },
            isExotic: true
        },
        {
            name: "Pez Ancestral",
            value: 42000,
            color: "#4B0082",
            speed: 3.8,
            rarity: 0.002,
            requirements: { boat: 2, rod: 2 },
            isExotic: true
        },
        {
            name: "Emperador del Océano",
            value: 40000,
            color: "#00008B",
            speed: 3.7,
            rarity: 0.003,
            requirements: { boat: 2, rod: 2 },
            isExotic: true
        },
        {
            name: "Pez Arcoíris",
            value: 15000,
            color: "#FF1493",
            speed: 2.8,
            rarity: 0.01,
            requirements: { boat: 1, rod: 2 },
            isExotic: true
        },
        {
            name: "Cazador Nocturno",
            value: 12000,
            color: "#4682B4",
            speed: 2.6,
            rarity: 0.015,
            requirements: { boat: 2, rod: 1 },
            isExotic: true
        },
        {
            name: "Guardián del Coral",
            value: 10000,
            color: "#FF7F50",
            speed: 2.5,
            rarity: 0.02,
            requirements: { boat: 1, rod: 1 },
            isExotic: true
        }
      ],
    };
  },
  mutations: {
    setMoney: (state, amount) => state.money = amount,
    addMoney: (state, amount) => state.money += amount,
    spendMoney: (state, amount) => state.money -= amount,
    setEnergy: (state, amount) => state.energy = amount,
    setGameTime: (state, time) => state.gameTime = time,
    setCurrentDay: (state, day) => state.currentDay = day,
    setIsNight: (state, isNight) => state.isNight = isNight,
    setIsFishing: (state, isFishing) => state.isFishing = isFishing,
    setBoatPosition: (state, position) => state.boatPosition = position,
    setCurrentRod: (state, index) => state.currentRod = index,
    setCurrentBoat: (state, index) => state.currentBoat = index,
    unlockRod: (state, index) => state.unlockedRods[index] = true,
    unlockBoat: (state, index) => state.unlockedBoats[index] = true,
    addMessage: (state, message) => {
      const messageWithId = { ...message, id: Date.now() };
      state.messages.unshift(messageWithId);
      if (state.messages.length > 5) { // Limitar a 5 mensajes en pantalla
        state.messages.pop();
      }
    },
    addCaughtTrash: (state, trash) => state.caughtTrashInventory.push(trash),
    setCaughtTrashInventory: (state, inventory) => state.caughtTrashInventory = inventory,
    addCaughtFish: (state, fish) => state.caughtFishInventory.push(fish),
    setCaughtFishInventory: (state, inventory) => state.caughtFishInventory = inventory,
    incrementCommonFishCount: (state) => state.commonFishCount++,
    incrementExoticFishCount: (state) => state.exoticFishCount++,
    incrementTrashCount: (state) => state.trashCount++,
    updateFishingStats(state, { fish, value }) {
        if (!state.fishingStats.fishByType[fish.name]) {
            state.fishingStats.fishByType[fish.name] = { count: 0, totalValue: 0 };
        }
        state.fishingStats.fishByType[fish.name].count++;
        state.fishingStats.fishByType[fish.name].totalValue += value;
        state.fishingStats.totalCaught++;
        state.fishingStats.totalValue += value;
    },
    toggleModal(state, modal) { state.modals[modal] = !state.modals[modal]; },
  },
  actions: {
    initializeGame({ commit }) {
      commit('addMessage', { text: '¡Bienvenido! Usa las flechas para jugar.', type: 'system' });
    },
    gameTick({ commit, state }) {
      if (state.energy < 100) commit('setEnergy', state.energy + 1);
      const newTime = state.gameTime + 1;
      if (newTime >= 1440) {
        commit('setGameTime', 0);
        commit('setCurrentDay', state.currentDay + 1);
      } else {
        commit('setGameTime', newTime);
      }
      const isNight = state.gameTime < 360 || state.gameTime > 1080;
      if (isNight !== state.isNight) commit('setIsNight', isNight);
    },
    handleKeyDown({ dispatch }, keyCode) {
      switch (keyCode) {
        case 'ArrowLeft': dispatch('moveBoat', -1); break;
        case 'ArrowRight': dispatch('moveBoat', 1); break;
        case 'ArrowUp': dispatch('startFishing'); break;
        case 'KeyM': dispatch('toggleModal', 'market'); break;
        case 'KeyS': dispatch('toggleModal', 'stats'); break;
        case 'KeyG': dispatch('toggleModal', 'goals'); break;
        case 'KeyR': dispatch('toggleModal', 'recycle'); break;
        case 'KeyT': dispatch('toggleModal', 'treasures'); break;
        case 'KeyE': dispatch('toggleModal', 'equipment'); break;
      }
    },
    moveBoat({ commit, state }, direction) {
      const speed = 5 * state.boats[state.currentBoat].speedMultiplier;
      let newPosition = state.boatPosition + direction * speed;
      newPosition = Math.max(10, Math.min(90, newPosition));
      commit('setBoatPosition', newPosition);
    },
    startFishing({ commit, state }) {
      if (state.isFishing || state.energy < 15) return;
      commit('setIsFishing', true);
      commit('setEnergy', state.energy - 15);
      commit('addMessage', { text: 'Lanzando caña...', type: 'system' });
      setTimeout(() => {
        const boat = state.boats[state.currentBoat];
        const rod = state.fishingRods[state.currentRod];
        if (Math.random() < 0.3) {
          const trashItem = state.trashTypes[Math.floor(Math.random() * state.trashTypes.length)];
          commit('addCaughtTrash', trashItem);
          commit('incrementTrashCount');
          commit('addMessage', { text: `¡Has pescado ${trashItem.name}!`, type: 'catch' });
        } else {
          if (Math.random() * boat.catchBonus < rod.catchRate) {
            const fish = state.fishTypes[Math.floor(Math.random() * state.fishTypes.length)];
            const value = Math.floor(fish.value * (state.isNight ? 1.5 : 1));
            commit('addMessage', { text: `¡Has atrapado un ${fish.name}! (${value})`, type: 'catch' });
            commit('updateFishingStats', { fish, value });
            commit('addCaughtFish', { fish, value });
            if (fish.isExotic) {
                commit('incrementExoticFishCount');
            } else {
                commit('incrementCommonFishCount');
            }
            commit('addMoney', value);
          } else {
            commit('addMessage', { text: 'El pez escapó...', type: 'warning' });
          }
        }
        commit('setIsFishing', false);
      }, 2000 / boat.speedMultiplier);
    },
    selectRod({ commit, state }, rodIndex) {
        const rod = state.fishingRods[rodIndex];
        if (state.unlockedRods[rodIndex]) {
            commit('setCurrentRod', rodIndex);
        } else if (state.money >= rod.price) {
            commit('spendMoney', rod.price);
            commit('unlockRod', rodIndex);
            commit('addMessage', { text: `¡Has comprado la ${rod.name}!`, type: 'achievement' });
        }
    },
    selectBoat({ commit, state }, boatIndex) {
        const boat = state.boats[boatIndex];
        if (state.unlockedBoats[boatIndex]) {
            commit('setCurrentBoat', boatIndex);
        } else if (state.money >= boat.price) {
            commit('spendMoney', boat.price);
            commit('unlockBoat', boatIndex);
            commit('addMessage', { text: `¡Has comprado el ${boat.name}!`, type: 'achievement' });
        }
    },
    sellAllFish({ commit, state }) {
        const totalValue = state.caughtFishInventory.reduce((sum, item) => sum + item.value, 0);
        if (totalValue > 0) {
            commit('addMoney', totalValue);
            commit('setCaughtFishInventory', []);
            commit('addMessage', { text: `Vendiste pescado por $${totalValue}.`, type: 'system' });
        }
    },
    recycleItem({ commit, state }, index) {
        const item = state.caughtTrashInventory[index];
        commit('addMoney', item.recycleValue);
        const newInventory = [...state.caughtTrashInventory];
        newInventory.splice(index, 1);
        commit('setCaughtTrashInventory', newInventory);
    },
    recycleAllTrash({ commit, state }) {
        const totalValue = state.caughtTrashInventory.reduce((sum, item) => sum + item.recycleValue, 0);
        if (totalValue > 0) {
            commit('addMoney', totalValue);
            commit('setCaughtTrashInventory', []);
            commit('addMessage', { text: `Reciclaste todo por $${totalValue}.`, type: 'system' });
        }
    },
    goToSleep({ commit, state }) {
        commit('setEnergy', 100);
        commit('setCaughtFishInventory', []);
        const newTime = 360; // Wake up at 6 AM
        if (state.gameTime > newTime) {
            commit('setCurrentDay', state.currentDay + 1);
        }
        commit('setGameTime', newTime);
        commit('addMessage', { text: 'Duermes profundamente...', type: 'system' });
    },
    toggleModal({ commit }, modal) {
      commit('toggleModal', modal);
    },
  },
  getters: {
    getMoney: (state) => state.money,
    getCommonFishCount: (state) => state.commonFishCount,
    getExoticFishCount: (state) => state.exoticFishCount,
    getTrashCount: (state) => state.trashCount,
    getTreasuresCount: (state) => state.treasuresCount,
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
    getMessages: (state) => state.messages,
    getFishingRods: (state) => state.fishingRods,
    getBoats: (state) => state.boats,
    getFishingStats: (state) => state.fishingStats,
    getCaughtTrashInventory: (state) => state.caughtTrashInventory,
    getModals: (state) => state.modals,
  },
});

export default store;
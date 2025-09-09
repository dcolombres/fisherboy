import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      // --- Game State ---
      money: 0,
      commonFishCount: 0,
      exoticFishCount: 0,
      trashCount: 0,
      treasuresCount: 0,
      energy: 100,
      gameTime: 360, // In-game minutes
      currentDay: 1,
      currentPartOfDay: 'dawn', // dawn, noon, afternoon, night
      currentSeason: 'spring', // spring, summer, autumn, winter
      temperature: 15,
      isNight: false,
      isFishing: false,
      fishingDepth: null, // 'normal', 'deep'
      boatPosition: 50,
      currentRod: 0,
      currentBoat: 0,
      unlockedRods: [true, false, false],
      unlockedBoats: [true, false, false],
      caughtFishInventory: [],
      caughtTrashInventory: [],
      caughtTreasuresInventory: [],
      fishCaughtSinceSleep: 0,
      fishingStats: {
        totalCaught: 0,
        totalValue: 0,
        fishByType: {}
      },
      recycledObjects: {
        totalRecycled: 0,
        totalRecycledValue: 0,
      },
      messages: [],
      messageQueue: [],
      isDisplayingMessage: false,
      fishFighting: false,
      fishToCatch: null,
      modals: {
        market: false,
        stats: false,
        goals: false,
        recycle: false,
        treasures: false,
        instructions: false,
        equipment: false,
        settings: false,
      },
      goals: {
        easy: [
          { id: 1, description: "Vende 1 pez", type: "sellFish", target: 1, current: 0, reward: 50, completed: false },
          { id: 2, description: "Pesca 10 peces comunes", type: "catchCommonFish", target: 10, current: 0, reward: 100, completed: false },
          { id: 3, description: "Gana $500", type: "earnMoney", target: 500, current: 0, reward: 200, completed: false },
        ],
        medium: [
          { id: 4, description: "Pesca 5 peces exóticos", type: "catchExoticFish", target: 5, current: 0, reward: 5004, completed: false },
          { id: 5, description: "Recicla 10 objetos", type: "recycleItems", target: 10, current: 0, reward: 3040, completed: false },
          { id: 6, description: "Gana $10000", type: "earnMoney", target: 10000, current: 0, reward: 20350, completed: false },
        ],
        difficult: [
          { id: 7, description: "Pesca 1 pez legendario", type: "catchLegendaryFish", target: 1, current: 0, reward: 10300, completed: false },
          { id: 8, description: "Pesca 50 peces exóticos", type: "catchExoticFish", target: 50, current: 0, reward: 50500, completed: false },
          { id: 9, description: "Recicla 50 objetos", type: "recycleItems", target: 50, current: 0, reward: 30060, completed: false },
        ],
        epic: [
          { id: 10, description: "Pesca 10 peces legendarios", type: "catchLegendaryFish", target: 10, current: 0, reward: 10400, completed: false },
          { id: 11, description: "Gana $100000", type: "earnMoney", target: 100000, current: 0, reward: 20045, completed: false },
          { id: 12, description: "Pesca 100 peces comunes", type: "catchCommonFish", target: 100, current: 0, reward: 30450, completed: false },
        ],
        legendary: [
          { id: 13, description: "Pesca 500 peces comunes", type: "catchCommonFish", target: 500, current: 0, reward: 50400, completed: false },
          { id: 14, description: "Pesca 50 peces legendarios", type: "catchLegendaryFish", target: 50, current: 0, reward: 500400, completed: false },
          { id: 15, description: "Gana $1000000", type: "earnMoney", target: 1000000, current: 0, reward: 1004500, completed: false },
        ],
      },
      tips: [
        "Para pescar un Tiburón, prueba a pescar de noche.",
        "Los tesoros solo se encuentran en las profundidades del mar, ¡necesitarás el Barco Profesional!",
        "La pesca profunda consume más energía, pero las recompensas pueden ser mayores.",
        "No te olvides de vender tu pescado en el mercado para ganar dinero.",
        "Reciclar la basura te dará algo de dinero extra.",
        "Mejora tu caña y tu barco para pescar peces más raros y valiosos.",
        "Algunos peces solo aparecen en ciertas partes del día.",
        "Ir a dormir restaurará toda tu energía.",
        "Puedes silenciar la música si lo prefieres.",
        "¡Conviértete en un maestro pescador completando todos los logros!",
        "Puedes pescar en cualquier lugar del mapa, ¡pero algunos lugares son mejores que otros!",
        "La paciencia es una virtud, especialmente cuando se pesca.",
        "¿Sabías que puedes usar las teclas M, S, G, R, T, E para abrir los modales?",
        "El valor de los peces exóticos es mucho mayor que el de los comunes.",
        "No te desanimes si pescas mucha basura al principio, ¡sigue intentándolo!",
        "Ahorra dinero para comprar el mejor equipo, ¡valdrá la pena!",
        "Los peces legendarios son extremadamente raros, ¡serás un verdadero maestro si atrapas uno!",
        "Presta atención a la hora del día, ¡algunos peces solo pican al amanecer o al atardecer!",
        "La pesca es una excelente manera de relajarse y disfrutar de la naturaleza.",
        "¡Comparte tus logros con tus amigos y compite para ver quién es el mejor pescador!"
      ],
      // --- Game Configuration ---
      fishingRods: [
        { name: "Caña Básica", power: 1, speed: 1, catchRate: 0.6, price: 0 },
        { name: "Caña Profesional", power: 1.5, speed: 1.3, catchRate: 0.75, price: 5000 },
        { name: "Caña Maestra", power: 2, speed: 1.6, catchRate: 0.9, price: 23000 }
      ],
      boats: [
        { name: "Barco Básico", speedMultiplier: 1, catchBonus: 1, price: 0, image: 'https://moroarte.com/games/boat.png' },
        { name: "Barco Avanzado", speedMultiplier: 1.5, catchBonus: 1.2, price: 25000, image: 'https://moroarte.com/games/botelvl1.png' },
        { name: "Barco Profesional", speedMultiplier: 2, catchBonus: 1.5, price: 100000, image: 'https://moroarte.com/games/botelvl2.png' }
      ],
      trashTypes: [
        { name: "Botella de Plástico", recycleValue: 133 },
        { name: "Red Vieja", recycleValue: 546 },
        { name: "Lata de Conserva", recycleValue: 511 },
        { name: "Botella de Vidrio", recycleValue: 334 },
        { name: "Neumático de Goma", recycleValue: 1534 },
        { name: "Sedal de Pesca", recycleValue: 104 },
        { name: "Chatarra de Metal", recycleValue: 350 },
        { name: "Bolsa de Plástico", recycleValue: 56 },
        { name: "Caña Rota", recycleValue: 1444 },
        { name: "Contenedor de Aceite", recycleValue: 2406 },
        { name: "Bebida Energizante", recycleValue: 10, energy: 20 },
        { name: "Café", recycleValue: 5, energy: 10 },
      ],
      fishTypes: [
        // Common Fish
        { name: "Sardina", value: 58, color: "silver", speed: 1, rarity: 0.4, isExotic: false, partOfDay: ['dawn', 'noon', 'afternoon', 'night'] },
        { name: "Pez Payaso", value: 83, color: "orange", speed: 1.4, rarity: 0.3, isExotic: false, partOfDay: ['dawn', 'noon', 'afternoon'] },
        { name: "Lenguado", value: 153, color: "tan", speed: 1.3, rarity: 0.2, isExotic: false, partOfDay: ['noon', 'afternoon'] },
        { name: "Atún", value: 105, color: "darkblue", speed: 1.2, rarity: 0.15, isExotic: false, partOfDay: ['dawn', 'noon', 'afternoon', 'night'] },
        { name: "Salmón", value: 578, color: "salmon", speed: 1.5, rarity: 0.1, isExotic: false, partOfDay: ['dawn', 'afternoon'] },

        // Uncommon Fish
        { name: "Pez Globo", value: 2304, color: "yellow", speed: 1.8, rarity: 0.08, isExotic: false, partOfDay: ['noon'] },
        { name: "Pez Espada", value: 2933, color: "gray", speed: 2.2, rarity: 0.05, isExotic: false, partOfDay: ['afternoon', 'night'] },
        { name: "Lubina", value: 3550, color: "silver", speed: 1.6, rarity: 0.03, isExotic: false, partOfDay: ['dawn', 'night'] },

        // Rare Fish
        { name: "Pez Dorado", value: 4400, color: "gold", speed: 2, rarity: 0.02, isExotic: true, partOfDay: ['dawn', 'noon', 'afternoon', 'night'] },
        { name: "Tiburón", value: 5500, color: "darkgray", speed: 2.5, rarity: 0.01, isExotic: true, partOfDay: ['night'] },
        { name: "Guardián del Coral", value: 15004, color: "#FF7F50", speed: 2.5, rarity: 0.008, requirements: { boat: 1, rod: 1 }, isExotic: true, partOfDay: ['noon'] },
        { name: "Cazador Nocturno", value: 22000, color: "#4682B4", speed: 2.6, rarity: 0.007, requirements: { boat: 2, rod: 1 }, isExotic: true, partOfDay: ['night'] },
        { name: "Pez Arcoíris", value: 35000, color: "#FF1493", speed: 2.8, rarity: 0.006, requirements: { boat: 1, rod: 2 }, isExotic: true, partOfDay: ['dawn'] },

        // Legendary Fish
        { name: "Pez Espectral", value: 8500, color: "#f8f8f2", speed: 2.2, rarity: 0.005, isExotic: true, partOfDay: ['night'] },
        { name: "Serpiente Marina", value: 8503, color: "#50fa7b", speed: 2.3, rarity: 0.004, isExotic: true, partOfDay: ['afternoon'] },
        { name: "Medusa de Cristal", value: 19033, color: "#8be9fd", speed: 2.4, rarity: 0.003, isExotic: true, partOfDay: ['night'] },
        { name: "Pez Unicornio", value: 12345, color: "#bd93f9", speed: 2.5, rarity: 0.002, isExotic: true, partOfDay: ['dawn'] },
        { name: "Sirena Escamada", value: 45000, color: "#ff79c6", speed: 2.6, rarity: 0.001, isExotic: true, partOfDay: ['noon'] },
        { name: "Mini Kraken", value: 38500, color: "#8b0000", speed: 2.7, rarity: 0.0008, isExotic: true, partOfDay: ['night'] },
        { name: "Pez Fénix", value: 42000, color: "#ff5555", speed: 2.8, rarity: 0.0006, isExotic: true, partOfDay: ['dawn'] },
        { name: "Quimera Luminosa", value: 75000, color: "#50fa7b", speed: 3.0, rarity: 0.0004, isExotic: true, partOfDay: ['afternoon'] },
        { name: "Leviatán Abisal", value: 58000, color: "#1e0f3d", speed: 3.2, rarity: 0.0002, isExotic: true, partOfDay: ['night'] },
        { name: "Pez Dragón Celestial", value: 74500, color: "#4a90e2", speed: 3.5, rarity: 0.0001, isExotic: true, partOfDay: ['dawn'] },
        { name: "Emperador del Océano", value: 130000, color: "#00008B", speed: 3.7, rarity: 0.00008, requirements: { boat: 2, rod: 2 }, isExotic: true, partOfDay: ['noon'] },
        { name: "Pez Ancestral", value: 720333, color: "#4B0082", speed: 3.8, rarity: 0.00006, requirements: { boat: 2, rod: 2 }, isExotic: true, partOfDay: ['afternoon'] },
        { name: "Leviatán de las Profundidades", value: 455000, color: "#800080", speed: 4.0, rarity: 0.00004, requirements: { boat: 2, rod: 2 }, isExotic: true, partOfDay: ['night'] },
      ],
      treasureTypes: [
        { name: "Perla", value: 10000, isCollectible: false, rarity: 0.1 },
        { name: "Diamante", value: 190000, isCollectible: false, rarity: 0.01 },
        { name: "iPhone 7", value: 5090, isCollectible: true, rarity: 0.05 },
        { name: "Motorola", value: 2009, isCollectible: true, rarity: 0.06 },
        { name: "Nokia 1100", value: 1100, isCollectible: true, rarity: 0.07 },
        { name: "Reloj de oro", value: 15000, isCollectible: false, rarity: 0.02 },
        { name: "Reloj de plata", value: 8500, isCollectible: false, rarity: 0.03 },
        { name: "Reloj de cuco", value: 100, isCollectible: true, rarity: 0.08 },
        { name: "Corona de oro", value: 40000, isCollectible: false, rarity: 0.005 },
        { name: "Collar de oro", value: 17500, isCollectible: false, rarity: 0.015 },
        { name: "Piedra pomez", value: 10, isCollectible: true, rarity: 0.2 },
        { name: "Piedra azul", value: 50, isCollectible: true, rarity: 0.15 },
        { name: "Piedra naranja brillante", value: 75, isCollectible: true, rarity: 0.1 },
        { name: "Casco normando", value: 1500, isCollectible: true, rarity: 0.04 },
        { name: "Reliquia desconocida", value: 0, isCollectible: true, rarity: 0.03 },
        { name: "Anillo de compromiso", value: 3000, isCollectible: false, rarity: 0.025 },
        { name: "Daga ceremonial", value: 2000, isCollectible: true, rarity: 0.035 },
        { name: "Cáliz de plata", value: 4000, isCollectible: false, rarity: 0.02 },
        { name: "Moneda de oro antigua", value: 51500, isCollectible: false, rarity: 0.05 },
        { name: "Mapa del tesoro", value: 0, isCollectible: true, rarity: 0.06 },
        { name: "Botella de ron añejo", value: 500, isCollectible: false, rarity: 0.07 },
        { name: "Cofre del tesoro vacío", value: 100, isCollectible: true, rarity: 0.1 },
        { name: "Esmeralda", value: 7500, isCollectible: false, rarity: 0.015 },
        { name: "Rubí", value: 65000, isCollectible: false, rarity: 0.018 },
        { name: "Zafiro", value: 55500, isCollectible: false, rarity: 0.019 },
        { name: "Lingote de oro", value: 15000, isCollectible: false, rarity: 0.008 },
        { name: "Lingote de plata", value: 6000, isCollectible: false, rarity: 0.01 },
        { name: "Candelabro de plata", value: 5500, isCollectible: false, rarity: 0.022 },
        { name: "Catalejo de latón", value: 4800, isCollectible: true, rarity: 0.06 },
        { name: "Brújula antigua", value: 1600, isCollectible: true, rarity: 0.07 },
        { name: "Sextante", value: 1200, isCollectible: true, rarity: 0.05 },
        { name: "Astillero en una botella", value: 200, isCollectible: true, rarity: 0.09 },
        { name: "Figura de proa de sirena", value: 2500, isCollectible: true, rarity: 0.03 },
        { name: "Diente de megalodón", value: 4000, isCollectible: true, rarity: 0.02 },
        { name: "Ammonite fosilizado", value: 1000, isCollectible: true, rarity: 0.04 },
        { name: "Trilobite fosilizado", value: 800, isCollectible: true, rarity: 0.05 },
        { name: "Ámbar con insecto", value: 1500, isCollectible: true, rarity: 0.035 },
        { name: "Estatuilla de jade", value: 55000, isCollectible: true, rarity: 0.02 },
        { name: "Máscara de oro inca", value: 15000, isCollectible: true, rarity: 0.007 },
        { name: "Sarcófago egipcio en miniatura", value: 10000, isCollectible: true, rarity: 0.01 },
        { name: "Jarrón griego antiguo", value: 58000, isCollectible: true, rarity: 0.012 },
        { name: "Moneda romana de plata", value: 1200, isCollectible: false, rarity: 0.04 },
        { name: "Punta de flecha de obsidiana", value: 5400, isCollectible: true, rarity: 0.08 },
        { name: "Hacha de guerra vikinga", value: 3000, isCollectible: true, rarity: 0.025 },
        { name: "Escudo de bronce", value: 2000, isCollectible: true, rarity: 0.03 },
        { name: "Espada corta romana", value: 2500, isCollectible: true, rarity: 0.028 },
        { name: "Armadura de samurái en miniatura", value: 5000, isCollectible: true, rarity: 0.015 },
        { name: "Katana ornamental", value: 6000, isCollectible: true, rarity: 0.013 },
        { name: "Shuriken de metal", value: 5200, isCollectible: true, rarity: 0.09 },
        { name: "Pipa de la paz", value: 500, isCollectible: true, rarity: 0.07 },
        { name: "Tocado de plumas", value: 1000, isCollectible: true, rarity: 0.05 },
        { name: "Atrapasueños", value: 300, isCollectible: true, rarity: 0.08 },
        { name: "Tótem de madera", value: 700, isCollectible: true, rarity: 0.06 },
        { name: "Muñeca de vudú", value: 100, isCollectible: true, rarity: 0.1 },
        { name: "Bola de cristal", value: 1500, isCollectible: true, rarity: 0.04 },
        { name: "Varita mágica de juguete", value: 50, isCollectible: true, rarity: 0.15 },
        { name: "Libro de hechizos (en blanco)", value: 200, isCollectible: true, rarity: 0.09 },
        { name: "Cubo de Rubik resuelto", value: 10, isCollectible: true, rarity: 0.2 },
        { name: "Cubo de Rubik sin resolver", value: 5, isCollectible: true, rarity: 0.25 },
        { name: "Peon de madera", value: 20, isCollectible: true, rarity: 0.18 },
        { name: "Canicas de vidrio", value: 15, isCollectible: true, rarity: 0.22 },
        { name: "Soldadito de plomo", value: 30, isCollectible: true, rarity: 0.17 },
        { name: "Oso de peluche", value: 25, isCollectible: true, rarity: 0.19 },
        { name: "Coche de juguete antiguo", value: 150, isCollectible: true, rarity: 0.1 },
        { name: "Tren de juguete de hojalata", value: 250, isCollectible: true, rarity: 0.08 },
        { name: "Caja de música", value: 400, isCollectible: true, rarity: 0.07 },
        { name: "Cámara de fotos antigua", value: 800, isCollectible: true, rarity: 0.06 },
        { name: "Máquina de escribir", value: 600, isCollectible: true, rarity: 0.065 },
        { name: "Teléfono de disco", value: 300, isCollectible: true, rarity: 0.075 },
        { name: "Vinilo de los Beatles", value: 1000, isCollectible: true, rarity: 0.05 },
        { name: "Casete de Queen", value: 500, isCollectible: true, rarity: 0.06 },
        { name: "Walkman", value: 400, isCollectible: true, rarity: 0.07 },
        { name: "Discman", value: 300, isCollectible: true, rarity: 0.08 },
        { name: "Game Boy", value: 1200, isCollectible: true, rarity: 0.04 },
        { name: "Tamagotchi", value: 200, isCollectible: true, rarity: 0.09 },
        { name: "Furby", value: 150, isCollectible: true, rarity: 0.1 },
        { name: "POGs", value: 10, isCollectible: true, rarity: 0.2 },
        { name: "Tazos", value: 5, isCollectible: true, rarity: 0.25 },
        { name: "Pluma estilográfica", value: 600, isCollectible: false, rarity: 0.06 },
        { name: "Tintero de porcelana", value: 400, isCollectible: false, rarity: 0.07 },
        { name: "Sello de cera", value: 200, isCollectible: false, rarity: 0.09 },
        { name: "Carta de amor antigua", value: 0, isCollectible: true, rarity: 0.1 },
        { name: "Diario de un capitán", value: 0, isCollectible: true, rarity: 0.08 },
        { name: "Gafas de aviador", value: 300, isCollectible: true, rarity: 0.08 },
        { name: "Sombrero de explorador", value: 200, isCollectible: true, rarity: 0.09 },
        { name: "Pipa de Sherlock Holmes", value: 400, isCollectible: true, rarity: 0.07 },
        { name: "Lupa de detective", value: 150, isCollectible: true, rarity: 0.1 },
        { name: "Placa de sheriff", value: 500, isCollectible: true, rarity: 0.06 },
        { name: "Esposas antiguas", value: 300, isCollectible: true, rarity: 0.08 },
        { name: "Bolsa de canicas del 'ojo de gato'", value: 50, isCollectible: true, rarity: 0.15 },
        { name: "Caleidoscopio", value: 80, isCollectible: true, rarity: 0.12 },
        { name: "Armónica", value: 120, isCollectible: true, rarity: 0.11 },
        { name: "Flauta de Pan", value: 100, isCollectible: true, rarity: 0.13 },
        { name: "Tambor pequeño", value: 150, isCollectible: true, rarity: 0.1 },
        { name: "Maracas", value: 70, isCollectible: true, rarity: 0.14 },
        { name: "Guitarra en miniatura", value: 200, isCollectible: true, rarity: 0.09 },
        { name: "Violín en miniatura", value: 300, isCollectible: true, rarity: 0.08 },
        { name: "Piano de pulgar (Kalimba)", value: 180, isCollectible: true, rarity: 0.1 },
        { name: "Gema brillante sin identificar", value: 42000, isCollectible: false, rarity: 0.03 },
        { name: "Huevo de Fabergé falso", value: 4100, isCollectible: true, rarity: 0.1 },
        { name: "Estatua de la Libertad de recuerdo", value: 520, isCollectible: true, rarity: 0.18 },
        { name: "Torre Eiffel de recuerdo", value: 520, isCollectible: true, rarity: 0.18 },
        { name: "Big Ben de recuerdo", value: 520, isCollectible: true, rarity: 0.18 },
      ],
    };
  },
  mutations: {
    setMoney(state, amount) { state.money = amount; },
    addMoney(state, amount) { state.money += amount; },
    spendMoney(state, amount) { state.money -= amount; },
    setEnergy(state, amount) { state.energy = amount; },
    setGameTime(state, time) { state.gameTime = time; },
    setCurrentDay(state, day) { state.currentDay = day; },
    setIsNight(state, isNight) { state.isNight = isNight; },
    setIsFishing(state, isFishing) { state.isFishing = isFishing; },
    setCurrentPartOfDay(state, part) { state.currentPartOfDay = part; },
    setCurrentSeason(state, season) { state.currentSeason = season; },
    setTemperature(state, temp) { state.temperature = temp; },
    setFishingDepth(state, depth) { state.fishingDepth = depth; },
    setBoatPosition(state, position) { state.boatPosition = position; },
    setCurrentRod(state, index) { state.currentRod = index; },
    setCurrentBoat(state, index) { state.currentBoat = index; },
    unlockRod(state, index) { state.unlockedRods[index] = true; },
    unlockBoat(state, index) { state.unlockedBoats[index] = true; },
    addMessage(state, message) {
      state.messageQueue.push(message);
      if (!state.isDisplayingMessage) {
        this.dispatch('processMessageQueue');
      }
    },
    displayMessage(state, message) {
      state.messages = [message];
      state.isDisplayingMessage = true;
    },
    clearMessage(state) {
      state.messages = [];
      state.isDisplayingMessage = false;
    },
    addCaughtTrash(state, trash) { state.caughtTrashInventory.push(trash); },
    setCaughtTrashInventory(state, inventory) { state.caughtTrashInventory = inventory; },
    addCaughtFish(state, fish) { state.caughtFishInventory.push(fish); },
    setCaughtFishInventory(state, inventory) { state.caughtFishInventory = inventory; },
    incrementCommonFishCount(state) {
      state.commonFishCount++;
      state.fishCaughtSinceSleep++;
    },
    incrementExoticFishCount(state) {
      state.exoticFishCount++;
      state.fishCaughtSinceSleep++;
    },
    incrementTrashCount(state) { state.trashCount++; },
    incrementTreasuresCount(state) { state.treasuresCount++; },
    addCaughtTreasure(state, treasure) { state.caughtTreasuresInventory.push(treasure); },
    resetFishCaughtSinceSleep(state) { state.fishCaughtSinceSleep = 0; },
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
    recycle(state, { count, value }) {
      state.recycledObjects.totalRecycled += count;
      state.recycledObjects.totalRecycledValue += value;
    },
    updateGoalProgress(state, { type, amount }) {
      for (const level in state.goals) {
        state.goals[level].forEach(goal => {
          if (goal.type === type && !goal.completed) {
            goal.current += amount;
            if (goal.current >= goal.target) {
              goal.current = goal.target; // Cap current at target
            }
          }
        });
      }
    },
    completeGoal(state, { level, id }) {
      const goal = state.goals[level].find(g => g.id === id);
      if (goal) {
        goal.completed = true;
      }
    },
    setFishFighting(state, value) {
      state.fishFighting = value;
    },
    setFishToCatch(state, fish) {
      state.fishToCatch = fish;
    },
  },
  actions: {
    initializeGame({ commit }) {
      commit('addMessage', { text: '¡Bienvenido! Usa las flechas para jugar.', type: 'system' });
    },
    showRandomTip({ commit, state }) {
      if (state.messageQueue.length === 0 && !state.isDisplayingMessage) {
        const randomIndex = Math.floor(Math.random() * state.tips.length);
        const tip = state.tips[randomIndex];
        commit('addMessage', { text: `Consejo: ${tip}`, type: 'tip' });
      }
    },
    processMessageQueue({ commit, state, dispatch }) {
      if (state.messageQueue.length > 0) {
        const message = state.messageQueue.shift();
        commit('displayMessage', message);
        setTimeout(() => {
          commit('clearMessage');
          dispatch('processMessageQueue');
        }, 2000);
      } else {
        dispatch('showRandomTip');
      }
    },
    updateClimate({ commit, state }) {
        const isNight = state.gameTime < 360 || state.gameTime > 1080;
        if (isNight !== state.isNight) commit('setIsNight', isNight);

        let partOfDay = 'night';
        if (state.gameTime >= 300 && state.gameTime < 720) {
            partOfDay = 'dawn';
        } else if (state.gameTime >= 720 && state.gameTime < 1080) {
            partOfDay = 'noon';
        } else if (state.gameTime >= 1080 && state.gameTime < 1320) {
            partOfDay = 'afternoon';
        }
        if (partOfDay !== state.currentPartOfDay) {
            commit('setCurrentPartOfDay', partOfDay);
        }

        const dayOfYear = state.currentDay % 120;
        let season = 'winter';
        if (dayOfYear >= 0 && dayOfYear < 30) {
            season = 'spring';
        } else if (dayOfYear >= 30 && dayOfYear < 60) {
            season = 'summer';
        } else if (dayOfYear >= 60 && dayOfYear < 90) {
            season = 'autumn';
        }
        if (season !== state.currentSeason) {
            commit('setCurrentSeason', season);
        }

        const tempRanges = {
            winter: { dawn: 0, noon: 5, afternoon: 2, night: -2 },
            spring: { dawn: 10, noon: 15, afternoon: 12, night: 8 },
            summer: { dawn: 20, noon: 25, afternoon: 22, night: 18 },
            autumn: { dawn: 8, noon: 12, afternoon: 10, night: 5 },
        };

        const baseTemp = tempRanges[state.currentSeason][state.currentPartOfDay];
        const randomFactor = (Math.random() - 0.5) * 2;
        const temperature = Math.round(baseTemp + randomFactor);
        commit('setTemperature', temperature);
    },
    gameTick({ commit, dispatch, state }) {
      if (state.energy < 100) commit('setEnergy', state.energy + 1);
      const newTime = state.gameTime + 2.4;
      if (newTime >= 1440) {
        commit('setGameTime', 0);
        commit('setCurrentDay', state.currentDay + 1);
      } else {
        commit('setGameTime', newTime);
      }
      dispatch('updateClimate');
    },
    handleKeyDown({ dispatch }, keyCode) {
      switch (keyCode) {
        case 'KeyM': dispatch('toggleModal', 'market'); break;
        case 'KeyS': dispatch('toggleModal', 'stats'); break;
        case 'KeyG': dispatch('toggleModal', 'goals'); break;
        case 'KeyR': dispatch('toggleModal', 'recycle'); break;
        case 'KeyT': dispatch('toggleModal', 'treasures'); break;
        case 'KeyE': dispatch('toggleModal', 'equipment'); break;
        case 'KeyV': dispatch('sellAllFish'); break; // Vender Pescado
        case 'KeyD': dispatch('goToSleep'); break; // Ir a Dormir
      }
    },
    startFishing({ commit, state }) {
      if (state.isFishing || state.energy < 10) return;
      commit('setIsFishing', true);
      commit('setFishingDepth', 'normal');
      commit('setEnergy', state.energy - 10);
      commit('addMessage', { text: 'Lanzando caña...', type: 'system' });
      setTimeout(() => {
        const boat = state.boats[state.currentBoat];
        const rod = state.fishingRods[state.currentRod];
        if (Math.random() < 0.3) {
          const trashItem = state.trashTypes[Math.floor(Math.random() * state.trashTypes.length)];
          if (trashItem.energy) {
            commit('setEnergy', state.energy + trashItem.energy);
            commit('addMessage', { text: `¡Has encontrado ${trashItem.name}! (+${trashItem.energy} de energía)`, type: 'catch' });
          } else {
            commit('addCaughtTrash', trashItem);
            commit('incrementTrashCount');
            commit('addMessage', { text: `¡Has pescado ${trashItem.name}!`, type: 'catch' });
          }
        } else {
          if (Math.random() * boat.catchBonus < rod.catchRate) {
            const availableFish = state.fishTypes.filter(fish => {
                const meetsRequirements = !fish.requirements || (state.currentBoat >= fish.requirements.boat && state.currentRod >= fish.requirements.rod);
                const availableAtTime = fish.partOfDay.includes(state.currentPartOfDay);
                return meetsRequirements && availableAtTime;
            });

            const totalRarity = availableFish.reduce((sum, fish) => sum + fish.rarity, 0);
            let random = Math.random() * totalRarity;
            let fishToCatch = null;

            for (const fish of availableFish) {
                random -= fish.rarity;
                if (random <= 0) {
                    fishToCatch = fish;
                    break;
                }
            }

            if (fishToCatch) {
              if (fishToCatch.value > 1000 || fishToCatch.isExotic) {
                commit('setFishToCatch', fishToCatch);
                commit('setFishFighting', true);
                commit('addMessage', { text: `¡Un pez grande ha picado! ¡Toca repetidamente para pescarlo!`, type: 'warning' });
              } else {
                const value = Math.floor(fishToCatch.value * (state.isNight ? 1.5 : 1));
                commit('addMessage', { text: `¡Has atrapado un ${fishToCatch.name}! (${value})`, type: 'catch' });
                commit('updateFishingStats', { fish: fishToCatch, value });
                commit('addCaughtFish', { ...fishToCatch, value });
                if (fishToCatch.isExotic) {
                    commit('incrementExoticFishCount');
                } else {
                    commit('incrementCommonFishCount');
                }
                commit('addMoney', value);
              }
            } else {
                commit('addMessage', { text: 'No picó nada...', type: 'system' });
            }
          } else {
            commit('addMessage', { text: 'El pez escapó...', type: 'warning' });
          }
        }
        commit('setIsFishing', false);
        commit('setFishingDepth', null);
      }, 2000 / boat.speedMultiplier);
    },
    startDeepFishing({ commit, state }) {
      if (state.isFishing || state.energy < 20) return; // Increased energy cost
      commit('setIsFishing', true);
      commit('setFishingDepth', 'deep');
      commit('setEnergy', state.energy - 20); // Increased energy cost
      commit('addMessage', { text: 'Lanzando caña a las profundidades...', type: 'system' });
      setTimeout(() => {
        const boat = state.boats[state.currentBoat];
        const rod = state.fishingRods[state.currentRod];
        
        // Treasure hunting logic
        if (state.currentBoat === 2 && Math.random() < 0.1) { // 10% chance of finding a treasure with the best boat
          let maxTreasureValue = 400; // Default for early days
          if (state.currentDay > 20) {
            maxTreasureValue = Infinity; // All treasures
          } else if (state.currentDay > 10) {
            maxTreasureValue = 20000;
          } else if (state.currentDay > 5) {
            maxTreasureValue = 5000;
          }

          const availableTreasures = state.treasureTypes.filter(treasure => treasure.value <= maxTreasureValue);

          const totalRarity = availableTreasures.reduce((sum, treasure) => sum + treasure.rarity, 0);
          let random = Math.random() * totalRarity;
          let treasureToCatch = null;

          for (const treasure of availableTreasures) {
              random -= treasure.rarity;
              if (random <= 0) {
                  treasureToCatch = treasure;
                  break;
              }
          }

          if (treasureToCatch) {
              commit('addMessage', { text: `¡Has encontrado un tesoro: ${treasureToCatch.name}!`, type: 'achievement' });
              commit('addCaughtTreasure', treasureToCatch);
              commit('incrementTreasuresCount');
              if (treasureToCatch.value > 0) {
                commit('addMoney', treasureToCatch.value);
              }
          }
        } else if (Math.random() < 0.2) { // Lower chance of trash
          const trashItem = state.trashTypes[Math.floor(Math.random() * state.trashTypes.length)];
          if (trashItem.energy) {
            commit('setEnergy', state.energy + trashItem.energy);
            commit('addMessage', { text: `¡Has encontrado ${trashItem.name}! (+${trashItem.energy} de energía)`, type: 'catch' });
          } else {
            commit('addCaughtTrash', trashItem);
            commit('incrementTrashCount');
            commit('addMessage', { text: `¡Has pescado ${trashItem.name}!`, type: 'catch' });
          }
        } else {
          if (Math.random() * boat.catchBonus < rod.catchRate) {
            const availableFish = state.fishTypes.map(fish => {
              if (fish.isExotic) {
                return { ...fish, rarity: fish.rarity * 2 }; // Double rarity for exotic fish
              }
              return fish;
            }).filter(fish => {
                const meetsRequirements = !fish.requirements || (state.currentBoat >= fish.requirements.boat && state.currentRod >= fish.requirements.rod);
                const availableAtTime = fish.partOfDay.includes(state.currentPartOfDay);
                return meetsRequirements && availableAtTime;
            });

            const totalRarity = availableFish.reduce((sum, fish) => sum + fish.rarity, 0);
            let random = Math.random() * totalRarity;
            let fishToCatch = null;

            for (const fish of availableFish) {
                random -= fish.rarity;
                if (random <= 0) {
                    fishToCatch = fish;
                    break;
                }
            }

            if (fishToCatch) {
              if (fishToCatch.value > 1000 || fishToCatch.isExotic) {
                commit('setFishToCatch', fishToCatch);
                commit('setFishFighting', true);
                commit('addMessage', { text: `¡Un pez grande ha picado! ¡Toca repetidamente para pescarlo!`, type: 'warning' });
              } else {
                const value = Math.floor(fishToCatch.value * (state.isNight ? 1.5 : 1));
                commit('addMessage', { text: `¡Has atrapado un ${fishToCatch.name}! (${value})`, type: 'catch' });
                commit('updateFishingStats', { fish: fishToCatch, value });
                commit('addCaughtFish', { ...fishToCatch, value });
                if (fishToCatch.isExotic) {
                    commit('incrementExoticFishCount');
                } else {
                    commit('incrementCommonFishCount');
                }
                commit('addMoney', value);
              }
            } else {
                commit('addMessage', { text: 'No picó nada...', type: 'system' });
            }
          } else {
            commit('addMessage', { text: 'El pez escapó...', type: 'warning' });
          }
        }
        commit('setIsFishing', false);
        commit('setFishingDepth', null);
      }, 2000 / boat.speedMultiplier);
    },
    fightFish({ commit, state }) {
      if (state.fishFighting) {
        const fish = state.fishToCatch;
        const value = Math.floor(fish.value * (state.isNight ? 1.5 : 1));
        commit('addMessage', { text: `¡Has atrapado un ${fish.name}! (${value})`, type: 'catch' });
        commit('updateFishingStats', { fish, value });
        commit('addCaughtFish', { ...fish, value });
        if (fish.isExotic) {
            commit('incrementExoticFishCount');
        } else {
            commit('incrementCommonFishCount');
        }
        commit('addMoney', value);
        commit('setFishFighting', false);
        commit('setFishToCatch', null);
      }
    },
    buyRod({ commit, state }, rodIndex) {
        const rod = state.fishingRods[rodIndex];
        if (state.money >= rod.price) {
            commit('spendMoney', rod.price);
            commit('unlockRod', rodIndex);
            commit('addMessage', { text: `¡Has comprado la ${rod.name}!`, type: 'achievement' });
        }
    },
    buyBoat({ commit, state }, boatIndex) {
        const boat = state.boats[boatIndex];
        if (state.money >= boat.price) {
            commit('spendMoney', boat.price);
            commit('unlockBoat', boatIndex);
            commit('addMessage', { text: `¡Has comprado el ${boat.name}!`, type: 'achievement' });
        }
    },
    selectRod({ commit, state }, rodIndex) {
        if (state.unlockedRods[rodIndex]) {
            commit('setCurrentRod', rodIndex);
        }
    },
    selectBoat({ commit, state }, boatIndex) {
        if (state.unlockedBoats[boatIndex]) {
            commit('setCurrentBoat', boatIndex);
        }
    },
    checkAndAwardGoals({ commit, state }) {
      for (const level in state.goals) {
        state.goals[level].forEach(goal => {
          if (!goal.completed && goal.current >= goal.target) {
            commit('completeGoal', { level, id: goal.id });
            commit('addMoney', goal.reward);
            commit('addMessage', { text: `¡Objetivo completado: ${goal.description}! Recompensa: ${goal.reward}`, type: 'achievement' });
          }
        });
      }
    },
    recycleItem({ commit, state }, index) {
        const item = state.caughtTrashInventory[index];
        commit('addMoney', item.recycleValue);
        const newInventory = [...state.caughtTrashInventory];
        newInventory.splice(index, 1);
        commit('setCaughtTrashInventory', newInventory);
        commit('recycle', { count: 1, value: item.recycleValue });
    },
    recycleAllTrash({ commit, state }) {
        const totalValue = state.caughtTrashInventory.reduce((sum, item) => sum + item.recycleValue, 0);
        if (totalValue > 0) {
            commit('addMoney', totalValue);
            commit('recycle', { count: state.caughtTrashInventory.length, value: totalValue });
            commit('setCaughtTrashInventory', []);
            commit('addMessage', { text: `Reciclaste todo por ${totalValue}.`, type: 'system' });
        }
    },
    goToSleep({ commit, dispatch, state }) {
        const sleepCost = 1400 + state.currentDay * 100;

        if (state.money >= sleepCost) {
            commit('spendMoney', sleepCost);
            commit('setEnergy', 100);
            commit('setCaughtFishInventory', []);
            commit('resetFishCaughtSinceSleep');
            const newTime = state.gameTime + 480; // Advance 8 hours
            if (newTime >= 1440) {
                commit('setGameTime', newTime % 1440);
                commit('setCurrentDay', state.currentDay + 1);
            } else {
                commit('setGameTime', newTime);
            }
            dispatch('updateClimate');
            commit('addMessage', { text: `Duermes profundamente... Costo: ${sleepCost}`, type: 'system' });
        } else {
            commit('addMessage', { text: `No tienes suficiente dinero para dormir. Necesitas ${sleepCost}.`, type: 'warning' });
        }
    },
    toggleModal({ commit }, modal) {
      commit('toggleModal', modal);
    },
    playMusic() {
      // This action is dispatched to trigger music playback in VolumeControl.vue
      // The actual music playing logic is handled in VolumeControl.vue
    }
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
    getRecycledObjects: (state) => state.recycledObjects,
    getGoals: (state) => state.goals,
    getCaughtTreasuresInventory: (state) => state.caughtTreasuresInventory,
    getCurrentPartOfDay: (state) => state.currentPartOfDay,
    getCurrentSeason: (state) => state.currentSeason,
    getTemperature: (state) => state.temperature,
    getFishingDepth: (state) => state.fishingDepth,
    getFishFighting: (state) => state.fishFighting,
    getFishToCatch: (state) => state.fishToCatch,
  },
});

export default store;
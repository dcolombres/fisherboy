import { createStore } from 'vuex';

const initialState = {
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
    boatPositionY: 45,
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
    map: false,
    credits: false,
    },
    currentZone: 1,
    zones: [
    { id: 1, name: "Lago Clemente", cost: 0, unlocked: true, color: "#4a90e2" },
    { id: 2, name: "Lago Mafalda", cost: 10000, unlocked: false, color: "#50e3c2" },
    { id: 3, name: "Mar Diogenes", cost: 20000, unlocked: false, color: "#bd10e0" },
    { id: 4, name: "Mar Profundo de Boogie el aceitoso", cost: 30000, unlocked: false, color: "#9013fe" },
    { id: 5, name: "Laguna Tía Vicenta", cost: 40000, unlocked: false, color: "#f5a623" },
    { id: 6, name: "Laguna Patoruzú", cost: 50000, unlocked: false, color: "#d0021b" },
    ],
    currentGoals: [],
    completedGoals: [],
    goalDefinitions: {
    // Tutorial/Early Game Goals
    'goal_catch_10_common_fish': { id: 'goal_catch_10_common_fish', description: "Pesca 10 peces comunes", type: "catchCommonFish", target: 10, reward: 100, category: "tutorial" },
    'goal_earn_500_money': { id: 'goal_earn_500_money', description: "Gana $500", type: "earnMoney", target: 500, reward: 200, category: "tutorial" },
    'goal_buy_pro_rod': { id: 'goal_buy_pro_rod', description: "Compra la Caña Profesional", type: "buyRod", target: 1, reward: 500, category: "equipment" },
    'goal_buy_adv_boat': { id: 'goal_buy_adv_boat', description: "Compra el Barco Avanzado", type: "buyBoat", target: 1, reward: 1000, category: "equipment" },

    // Incremental Fishing Goals (Common)
    'goal_catch_50_common_fish': { id: 'goal_catch_50_common_fish', description: "Pesca 50 peces comunes", type: "catchCommonFish", target: 50, reward: 300, category: "fishing" },
    'goal_catch_100_common_fish': { id: 'goal_catch_100_common_fish', description: "Pesca 100 peces comunes", type: "catchCommonFish", target: 100, reward: 600, category: "fishing" },
    'goal_catch_500_common_fish': { id: 'goal_catch_500_common_fish', description: "Pesca 500 peces comunes", type: "catchCommonFish", target: 500, reward: 2000, category: "fishing" },
    'goal_catch_1000_common_fish': { id: 'goal_catch_1000_common_fish', description: "Pesca 1000 peces comunes", type: "catchCommonFish", target: 1000, reward: 5000, category: "fishing" },

    // Incremental Fishing Goals (Exotic)
    'goal_catch_5_exotic_fish': { id: 'goal_catch_5_exotic_fish', description: "Pesca 5 peces exóticos", type: "catchExoticFish", target: 5, reward: 1500, category: "fishing" },
    'goal_catch_20_exotic_fish': { id: 'goal_catch_20_exotic_fish', description: "Pesca 20 peces exóticos", type: "catchExoticFish", target: 20, reward: 5000, category: "fishing" },
    'goal_catch_50_exotic_fish': { id: 'goal_catch_50_exotic_fish', description: "Pesca 50 peces exóticos", type: "catchExoticFish", target: 50, reward: 15000, category: "fishing" },

    // Incremental Fishing Goals (Legendary)
    'goal_catch_1_legendary_fish': { id: 'goal_catch_1_legendary_fish', description: "Pesca 1 pez legendario", type: "catchLegendaryFish", target: 1, reward: 10000, category: "fishing" },
    'goal_catch_5_legendary_fish': { id: 'goal_catch_5_legendary_fish', description: "Pesca 5 peces legendarios", type: "catchLegendaryFish", target: 5, reward: 30000, category: "fishing" },
    'goal_catch_10_legendary_fish': { id: 'goal_catch_10_legendary_fish', description: "Pesca 10 peces legendarios", type: "catchLegendaryFish", target: 10, reward: 75000, category: "fishing" },

    // Money Goals
    'goal_earn_10000_money': { id: 'goal_earn_10000_money', description: "Gana $10,000", type: "earnMoney", target: 10000, reward: 2500, category: "money" },
    'goal_earn_50000_money': { id: 'goal_earn_50000_money', description: "Gana $50,000", type: "earnMoney", target: 50000, reward: 10000, category: "money" },
    'goal_earn_100000_money': { id: 'goal_earn_100000_money', description: "Gana $100,000", type: "earnMoney", target: 100000, reward: 25000, category: "money" },
    'goal_earn_1000000_money': { id: 'goal_earn_1000000_money', description: "Gana $1,000,000", type: "earnMoney", target: 1000000, reward: 250000, category: "money" },

    // Recycling Goals
    'goal_recycle_10_items': { id: 'goal_recycle_10_items', description: "Recicla 10 objetos", type: "recycleItems", target: 10, reward: 500, category: "recycling" },
    'goal_recycle_50_items': { id: 'goal_recycle_50_items', description: "Recicla 50 objetos", type: "recycleItems", target: 50, reward: 2000, category: "recycling" },
    'goal_recycle_100_items': { id: 'goal_recycle_100_items', description: "Recicla 100 objetos", type: "recycleItems", target: 100, reward: 5000, category: "recycling" },

    // Treasure Goals
    'goal_find_1_treasure': { id: 'goal_find_1_treasure', description: "Encuentra 1 tesoro", type: "findTreasure", target: 1, reward: 1000, category: "treasure" },
    'goal_find_5_treasures': { id: 'goal_find_5_treasures', description: "Encuentra 5 tesoros", type: "findTreasure", target: 5, reward: 5000, category: "treasure" },
    'goal_find_10_treasures': { id: 'goal_find_10_treasures', description: "Encuentra 10 tesoros", type: "findTreasure", target: 10, reward: 15000, category: "treasure" },
    'goal_find_all_unique_treasures': { id: 'goal_find_all_unique_treasures', description: "Encuentra todos los tesoros únicos", type: "findAllUniqueTreasures", target: 81, reward: 50000, category: "treasure" },

    // Equipment Goals
    'goal_buy_master_rod': { id: 'goal_buy_master_rod', description: "Compra la Caña Maestra", type: "buyRod", target: 2, reward: 2000, category: "equipment" },
    'goal_buy_pro_boat': { id: 'goal_buy_pro_boat', description: "Compra el Barco Profesional", type: "buyBoat", target: 2, reward: 5000, category: "equipment" },
    },
    tips: [
    "Los tiburones son criaturas nocturnas. Intenta pescar de noche para tener la oportunidad de atrapar uno.",
    "Los tesoros más valiosos se esconden en las profundidades. Necesitarás el Barco Profesional para llegar a ellos.",
    "La pesca en aguas profundas consume más energía, pero las recompensas valen la pena el esfuerzo.",
    "El mercado es tu mejor amigo. Vende tu pescado allí para ganar dinero y mejorar tu equipo.",
    "No subestimes el valor de la basura. Reciclarla te dará un ingreso extra constante.",
    "Una mejor caña y un barco más resistente te permitirán atrapar peces más raros y valiosos.",
    "El tiempo es clave. Algunos peces solo aparecen en momentos específicos del día.",
    "Descansar es esencial. Dormir restaurará toda tu energía para un nuevo día de pesca.",
    "La música le da un toque especial a la vida, pero puedes silenciarla si prefieres la tranquilidad del mar.",
    "Conviértete en una leyenda de la pesca completando todos los logros del juego.",
    "Explora el mapa. Hay muchos lugares para pescar, pero algunos son más fructíferos que otros.",
    "La paciencia es la clave del éxito en la pesca. No te rindas, y serás recompensado.",
    "No pierdas de vista tus objetivos. Completarlos te dará recompensas adicionales y te guiará en tu aventura.",
    "Los peces exóticos son una fuente de ingresos mucho mayor que los comunes. ¡Ve por ellos!",
    "Al principio es normal pescar basura. No te desanimes, ¡la práctica hace al maestro!",
    "Invierte en tu equipo. Ahorra dinero para comprar las mejores herramientas y verás la diferencia.",
    "Los peces legendarios son el mayor desafío. Atrapa uno y tu nombre será recordado para siempre.",
    "El amanecer y el atardecer son momentos mágicos para pescar. ¡Aprovéchalos!",
    "Disfruta del viaje. La pesca es una oportunidad para relajarse y conectar con la naturaleza.",
    "Compite con tus amigos. Comparte tus logros y demuestra quién es el mejor pescador.",
    "Algunos peces prefieren el calor del verano, mientras que otros solo aparecen en el frío invierno. ¡Presta atención a la temperatura!",
    "Las estaciones cambian cada 4 días. ¡Aprovecha los cambios para encontrar peces especiales!",
    "Si buscas un pez específico, consulta su hábitat estacional y de temperatura. ¡La paciencia y la estrategia son clave!"
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
    // Zone 1: Lago Clemente
    { name: "Sardina", value: 58, color: "silver", speed: 1, rarity: 0.4, isExotic: false, partOfDay: ['dawn', 'noon', 'afternoon', 'night'], zone: 1, seasonalBonus: { summer: 1.5, autumn: 1.2 }, temperatureRange: [15, 30] },
    { name: "Pez Payaso", value: 83, color: "orange", speed: 1.4, rarity: 0.3, isExotic: false, partOfDay: ['dawn', 'noon', 'afternoon'], zone: 1, seasonalBonus: { spring: 1.5, summer: 1.2 }, temperatureRange: [10, 25] },
    { name: "Lenguado", value: 153, color: "tan", speed: 1.3, rarity: 0.2, isExotic: false, partOfDay: ['noon', 'afternoon'], zone: 1 },
    { name: "Atún", value: 105, color: "darkblue", speed: 1.2, rarity: 0.15, isExotic: false, partOfDay: ['dawn', 'noon', 'afternoon', 'night'], zone: 1 },
    { name: "Salmón", value: 578, color: "salmon", speed: 1.5, rarity: 0.1, isExotic: false, partOfDay: ['dawn', 'afternoon'], zone: 1, seasonalBonus: { spring: 1.3, winter: 1.1 }, temperatureRange: [5, 15] },

    // Zone 2: Lago Mafalda
    { name: "Pez Globo", value: 2304, color: "yellow", speed: 1.8, rarity: 0.08, isExotic: false, partOfDay: ['noon'], zone: 2 },
    { name: "Pez Espada", value: 2933, color: "gray", speed: 2.2, rarity: 0.05, isExotic: false, partOfDay: ['afternoon', 'night'], zone: 2 },
    { name: "Lubina", value: 3550, color: "silver", speed: 1.6, rarity: 0.03, isExotic: false, partOfDay: ['dawn', 'night'], zone: 2 },

    // Zone 3: Mar Diogenes
    { name: "Pez Dorado", value: 4400, color: "gold", speed: 2, rarity: 0.02, isExotic: true, partOfDay: ['dawn', 'noon', 'afternoon', 'night'], zone: 3 },
    { name: "Tiburón", value: 5500, color: "darkgray", speed: 2.5, rarity: 0.01, isExotic: true, partOfDay: ['night'], zone: 3, seasonalBonus: { winter: 1.5 }, temperatureRange: [-5, 5] },

    // Zone 4: Mar Profundo de Boogie el aceitoso
    { name: "Guardián del Coral", value: 15004, color: "#FF7F50", speed: 2.5, rarity: 0.008, requirements: { boat: 1, rod: 1 }, isExotic: true, partOfDay: ['noon'], zone: 4 },
    { name: "Cazador Nocturno", value: 22000, color: "#4682B4", speed: 2.6, rarity: 0.007, requirements: { boat: 2, rod: 1 }, isExotic: true, partOfDay: ['night'], zone: 4 },

    // Zone 5: Laguna Tía Vicenta
    { name: "Pez Arcoíris", value: 35000, color: "#FF1493", speed: 2.8, rarity: 0.006, requirements: { boat: 1, rod: 2 }, isExotic: true, partOfDay: ['dawn'], zone: 5 },
    { name: "Pez Espectral", value: 8500, color: "#f8f8f2", speed: 2.2, rarity: 0.005, isExotic: true, partOfDay: ['night'], zone: 5 },
    { name: "Serpiente Marina", value: 8503, color: "#50fa7b", speed: 2.3, rarity: 0.004, isExotic: true, partOfDay: ['afternoon'], zone: 5 },

    // Zone 6: Laguna Patoruzú
    { name: "Medusa de Cristal", value: 19033, color: "#8be9fd", speed: 2.4, rarity: 0.003, isExotic: true, partOfDay: ['night'], zone: 6 },
    { name: "Pez Unicornio", value: 12345, color: "#bd93f9", speed: 2.5, rarity: 0.002, isExotic: true, partOfDay: ['dawn'], zone: 6 },
    { name: "Sirena Escamada", value: 45000, color: "#ff79c6", speed: 2.6, rarity: 0.001, isExotic: true, partOfDay: ['noon'], zone: 6 },
    { name: "Mini Kraken", value: 38500, color: "#8b0000", speed: 2.7, rarity: 0.0008, isExotic: true, partOfDay: ['night'], zone: 6 },
    { name: "Pez Fénix", value: 42000, color: "#ff5555", speed: 2.8, rarity: 0.0006, isExotic: true, partOfDay: ['dawn'], zone: 6 },
    { name: "Quimera Luminosa", value: 75000, color: "#50fa7b", speed: 3.0, rarity: 0.0004, isExotic: true, partOfDay: ['afternoon'], zone: 6 },
    { name: "Leviatán Abisal", value: 58000, color: "#1e0f3d", speed: 3.2, rarity: 0.0002, isExotic: true, partOfDay: ['night'], zone: 6 },
    { name: "Pez Dragón Celestial", value: 74500, color: "#4a90e2", speed: 3.5, rarity: 0.0001, isExotic: true, partOfDay: ['dawn'], zone: 6 },
    { name: "Emperador del Océano", value: 130000, color: "#00008B", speed: 3.7, rarity: 0.00008, requirements: { boat: 2, rod: 2 }, isExotic: true, partOfDay: ['noon'], zone: 6 },
    { name: "Pez Ancestral", value: 720333, color: "#4B0082", speed: 3.8, rarity: 0.00006, requirements: { boat: 2, rod: 2 }, isExotic: true, partOfDay: ['afternoon'], zone: 6 },
    { name: "Leviatán de las Profundidades", value: 455000, color: "#800080", speed: 4.0, rarity: 0.00004, requirements: { boat: 2, rod: 2 }, isExotic: true, partOfDay: ['night'], zone: 6 },
    ],
    treasureTypes: [
    // Zone 1
    { name: "Piedra pomez", value: 10, isCollectible: true, rarity: 0.2, zone: 1 },
    { name: "Piedra azul", value: 50, isCollectible: true, rarity: 0.15, zone: 1 },
    { name: "Piedra naranja brillante", value: 75, isCollectible: true, rarity: 0.1, zone: 1 },
    { name: "Cofre del tesoro vacío", value: 100, isCollectible: true, rarity: 0.1, zone: 1 },
    { name: "Reloj de cuco", value: 100, isCollectible: true, rarity: 0.08, zone: 1 },

    // Zone 2
    { name: "Botella de ron añejo", value: 500, isCollectible: false, rarity: 0.07, zone: 2 },
    { name: "Nokia 1100", value: 1100, isCollectible: true, rarity: 0.07, zone: 2 },
    { name: "Motorola", value: 2009, isCollectible: true, rarity: 0.06, zone: 2 },
    { name: "Casco normando", value: 1500, isCollectible: true, rarity: 0.04, zone: 2 },

    // Zone 3
    { name: "iPhone 7", value: 5090, isCollectible: true, rarity: 0.05, zone: 3 },
    { name: "Reloj de plata", value: 8500, isCollectible: false, rarity: 0.03, zone: 3 },
    { name: "Anillo de compromiso", value: 3000, isCollectible: false, rarity: 0.025, zone: 3 },
    { name: "Daga ceremonial", value: 2000, isCollectible: true, rarity: 0.035, zone: 3 },

    // Zone 4
    { name: "Perla", value: 10000, isCollectible: false, rarity: 0.1, zone: 4 },
    { name: "Reloj de oro", value: 15000, isCollectible: false, rarity: 0.02, zone: 4 },
    { name: "Collar de oro", value: 17500, isCollectible: false, rarity: 0.015, zone: 4 },
    { name: "Cáliz de plata", value: 4000, isCollectible: false, rarity: 0.02, zone: 4 },

    // Zone 5
    { name: "Corona de oro", value: 40000, isCollectible: false, rarity: 0.005, zone: 5 },
    { name: "Moneda de oro antigua", value: 51500, isCollectible: false, rarity: 0.05, zone: 5 },
    { name: "Esmeralda", value: 7500, isCollectible: false, rarity: 0.015, zone: 5 },
    { name: "Lingote de plata", value: 6000, isCollectible: false, rarity: 0.01, zone: 5 },

    // Zone 6
    { name: "Diamante", value: 190000, isCollectible: false, rarity: 0.01, zone: 6 },
    { name: "Rubí", value: 65000, isCollectible: false, rarity: 0.018, zone: 6 },
    { name: "Zafiro", value: 55500, isCollectible: false, rarity: 0.019, zone: 6 },
    { name: "Lingote de oro", value: 15000, isCollectible: false, rarity: 0.008, zone: 6 },
    { name: "Estatuilla de jade", value: 55000, isCollectible: true, rarity: 0.02, zone: 6 },
    { name: "Máscara de oro inca", value: 15000, isCollectible: true, rarity: 0.007, zone: 6 },
    { name: "Sarcófago egipcio en miniatura", value: 10000, isCollectible: true, rarity: 0.01, zone: 6 },
    { name: "Jarrón griego antiguo", value: 58000, isCollectible: true, rarity: 0.012, zone: 6 },
    ],
};

const store = createStore({
    state() {
        return JSON.parse(JSON.stringify(initialState));
    },
    mutations: {
        RESTART_GAME(state) {
            const s = JSON.parse(JSON.stringify(initialState));
            Object.keys(s).forEach(key => {
                state[key] = s[key];
            });
        },
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
        setBoatPosition(state, { x, y }) {
        if (x !== undefined) state.boatPosition = x;
        if (y !== undefined) state.boatPositionY = y;
        },
        setCurrentRod(state, index) { state.currentRod = index; },
        setCurrentBoat(state, index) { state.currentBoat = index; },
        unlockRod(state, index) { state.unlockedRods[index] = true; },
        unlockBoat(state, index) { state.unlockedBoats[index] = true; },
        addMessage(state, message) {
        const id = Date.now() + Math.random();
        state.messages.push({ ...message, id });
        setTimeout(() => {
            const index = state.messages.findIndex(m => m.id === id);
            if (index !== -1) {
            state.messages.splice(index, 1);
            }
        }, 3000); // Remove message after 3 seconds
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
        addGoal(state, goalId) {
        const goalDefinition = state.goalDefinitions[goalId];
        if (goalDefinition && !state.currentGoals.some(g => g.id === goalId) && !state.completedGoals.some(g => g.id === goalId)) {
            state.currentGoals.push({ ...goalDefinition, current: 0, completed: false });
        }
        },
        updateGoalProgress(state, { type, amount, id = null }) {
        state.currentGoals.forEach(goal => {
            // If an ID is provided, only update that specific goal
            if (id && goal.id !== id) {
            return;
            }
            if (goal.type === type && !goal.completed) {
            goal.current += amount;
            if (goal.current >= goal.target) {
                goal.current = goal.target; // Cap current at target
            }
            }
        });
        },
        completeGoal(state, goalId) {
        const index = state.currentGoals.findIndex(g => g.id === goalId);
        if (index !== -1) {
            const goal = state.currentGoals[index];
            goal.completed = true;
            state.completedGoals.push(goal);
            state.currentGoals.splice(index, 1); // Remove from current goals
        }
        },
        setFishFighting(state, value) {
        state.fishFighting = value;
        },
        setFishToCatch(state, fish) {
        state.fishToCatch = fish;
        },
        unlockZone(state, zoneId) {
        const zone = state.zones.find(z => z.id === zoneId);
        if (zone) {
            zone.unlocked = true;
        }
        },
        setCurrentZone(state, zoneId) {
        state.currentZone = zoneId;
        },
        updateUniqueTreasureGoal(state) {
        const uniqueTreasures = new Set(state.caughtTreasuresInventory.map(t => t.name));
        const goal = state.currentGoals.find(g => g.type === 'findAllUniqueTreasures');
        if (goal) {
            goal.current = uniqueTreasures.size;
        }
        },
    },
    actions: {
        restartGame({ commit }) {
            commit('RESTART_GAME');
            commit('addMessage', { text: 'El juego se ha reiniciado.', type: 'system' });
            dispatch('initializeGame');
        },
        initializeGame({ commit, dispatch }) {
        commit('addMessage', { text: '¡Bienvenido a Fisherboy! Lanza tu caña y que comience la aventura.', type: 'system' });
        // Add initial goals
        commit('addGoal', 'goal_catch_10_common_fish');
        commit('addGoal', 'goal_earn_500_money');
        commit('addGoal', 'goal_catch_50_common_fish');
        commit('addGoal', 'goal_earn_10000_money');
        commit('addGoal', 'goal_recycle_10_items');
        commit('addGoal', 'goal_find_1_treasure');
        },
        showRandomTip({ commit, state }) {
        if (state.messages.length === 0) {
            const randomIndex = Math.floor(Math.random() * state.tips.length);
            const tip = state.tips[randomIndex];
            commit('addMessage', { text: `Consejo: ${tip}`, type: 'tip' });
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

            // New season logic
            const seasons = ['spring', 'summer', 'autumn', 'winter'];
            // Adjust seasonIndex so that Day 1 (currentDay = 1) is Summer (index 1)
            // (currentDay - 1) / 4 gives 0 for days 1-4, 1 for days 5-8, etc.
            // To make 0 map to index 1 (summer), we add 1 and then take modulo 4.
            const seasonIndex = (Math.floor((state.currentDay - 1) / 4) + 1) % 4;
            const season = seasons[seasonIndex];

            if (season !== state.currentSeason) {
                commit('setCurrentSeason', season);
            }

            const tempRanges = {
                winter: { dawn: 0, noon: 7, afternoon: 2, night: -5 },
                spring: { dawn: 10, noon: 19, afternoon: 12, night: 8 },
                summer: { dawn: 20, noon: 35, afternoon: 32, night: 16 },
                autumn: { dawn: 8, noon: 16, afternoon: 10, night: 5 },
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
            case 'KeyP': dispatch('toggleModal', 'map'); break;
            case 'KeyV': dispatch('sellAllFish'); break; // Vender Pescado
            case 'KeyD': dispatch('goToSleep'); break; // Ir a Dormir
            case 'ArrowUp': dispatch('moveBoat', { y: -1 }); break;
            case 'ArrowDown': dispatch('moveBoat', { y: 1 }); break;
            case 'ArrowLeft': dispatch('moveBoat', { x: -1 }); break;
            case 'ArrowRight': dispatch('moveBoat', { x: 1 }); break;
        }
        },
        moveBoat({ commit, state }, { x = 0, y = 0 }) {
        const newX = state.boatPosition + x * 0.1;
        const newY = state.boatPositionY + y * 0.1;
        if (newX >= 0 && newX <= 100) {
            commit('setBoatPosition', { x: newX });
        }
        if (newY >= 0 && newY <= 100) {
            commit('setBoatPosition', { y: newY });
        }
        },
        startFishing({ commit, state, dispatch }) { // Added dispatch here
        if (state.isFishing || state.energy < 10) return;
        commit('setIsFishing', true);
        commit('setFishingDepth', 'normal');
        commit('setEnergy', state.energy - 10);
        commit('addMessage', { text: 'Lanzando la caña... ¡A ver qué pica!', type: 'system' });
        setTimeout(() => {
            const boat = state.boats[state.currentBoat];
            const rod = state.fishingRods[state.currentRod];

            // Helper function for adjusted rarity
            const getAdjustedRarity = (fish) => {
                let adjustedRarity = fish.rarity;

                // Apply seasonal bonus
                if (fish.seasonalBonus && fish.seasonalBonus[state.currentSeason]) {
                    adjustedRarity *= fish.seasonalBonus[state.currentSeason];
                }

                // Apply temperature bonus
                if (fish.temperatureRange) {
                    const [minTemp, maxTemp] = fish.temperatureRange;
                    if (state.temperature >= minTemp && state.temperature <= maxTemp) {
                        adjustedRarity *= 1.5; // Example bonus for being in preferred temperature range
                    }
                }
                return adjustedRarity;
            };

            if (Math.random() < 0.3) {
            const trashItem = state.trashTypes[Math.floor(Math.random() * state.trashTypes.length)];
            if (trashItem.energy) {
                commit('setEnergy', state.energy + trashItem.energy);
                commit('addMessage', { text: `¡Vaya! Encontraste ${trashItem.name} y te da +${trashItem.energy} de energía.`, type: 'catch' });
            } else {
                commit('addCaughtTrash', trashItem);
                commit('incrementTrashCount');
                commit('addMessage', { text: `¡Oh, no! Has pescado ${trashItem.name}.`, type: 'catch' });
            }
            } else {
            if (Math.random() * boat.catchBonus < rod.catchRate) {
                const availableFish = state.fishTypes.filter(fish => {
                    const meetsRequirements = !fish.requirements || (state.currentBoat >= fish.requirements.boat && state.currentRod >= fish.requirements.rod);
                    const availableAtTime = fish.partOfDay.includes(state.currentPartOfDay);
                    const inZone = fish.zone === state.currentZone;
                    return meetsRequirements && availableAtTime && inZone;
                }).map(fish => ({
                    ...fish,
                    rarity: getAdjustedRarity(fish) // Apply adjusted rarity
                }));

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
                    commit('addMessage', { text: `¡Un pez enorme ha picado! ¡Toca repetidamente para no dejarlo escapar!`, type: 'warning' });
                } else {
                    const value = Math.floor(fishToCatch.value * (state.isNight ? 1.5 : 1));
                    commit('addMessage', { text: `¡Genial! Has atrapado un ${fishToCatch.name} con un valor de ${value}$.`, type: 'catch' });
                    commit('updateFishingStats', { fish: fishToCatch, value });
                    commit('addCaughtFish', { ...fishToCatch, value });
                    if (fishToCatch.isExotic) {
                        commit('incrementExoticFishCount');
                        commit('updateGoalProgress', { type: 'catchExoticFish', amount: 1 }); // Added
                        if (fishToCatch.rarity <= 0.005) { // Assuming rarity <= 0.005 means legendary
                            commit('updateGoalProgress', { type: 'catchLegendaryFish', amount: 1 }); // Added
                        }
                    } else {
                        commit('incrementCommonFishCount');
                        commit('updateGoalProgress', { type: 'catchCommonFish', amount: 1 }); // Added
                    }
                    commit('addMoney', value);
                }
                } else {
                    commit('addMessage', { text: 'Parece que hoy no pican...', type: 'system' });
                }
            } else {
                commit('addMessage', { text: '¡Rayos! El pez se ha escapado.', type: 'warning' });
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
        commit('addMessage', { text: 'Lanzando la caña a las profundidades... ¿Qué misterios nos aguardan?', type: 'system' });
        setTimeout(() => {
            const boat = state.boats[state.currentBoat];
            const rod = state.fishingRods[state.currentRod];

            // Helper function for adjusted rarity
            const getAdjustedRarity = (fish) => {
                let adjustedRarity = fish.rarity;

                // Apply seasonal bonus
                if (fish.seasonalBonus && fish.seasonalBonus[state.currentSeason]) {
                    adjustedRarity *= fish.seasonalBonus[state.currentSeason];
                }

                // Apply temperature bonus
                if (fish.temperatureRange) {
                    const [minTemp, maxTemp] = fish.temperatureRange;
                    if (state.temperature >= minTemp && state.temperature <= maxTemp) {
                        adjustedRarity *= 1.5; // Example bonus for being in preferred temperature range
                    }
                }
                return adjustedRarity;
            };
            
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

            const availableTreasures = state.treasureTypes.filter(treasure => treasure.value <= maxTreasureValue && treasure.zone === state.currentZone);

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
                commit('addMessage', { text: `¡Increíble! Has encontrado un tesoro: ${treasureToCatch.name}!`, type: 'achievement' });
                commit('addCaughtTreasure', treasureToCatch);
                commit('incrementTreasuresCount');
                if (treasureToCatch.value > 0) {
                    commit('addMoney', treasureToCatch.value);
                }
                commit('updateGoalProgress', { type: 'findTreasure', amount: 1 }); // Added
                commit('updateUniqueTreasureGoal');
            }
            } else if (Math.random() < 0.2) { // Lower chance of trash
            const trashItem = state.trashTypes[Math.floor(Math.random() * state.trashTypes.length)];
            if (trashItem.energy) {
                commit('setEnergy', state.energy + trashItem.energy);
                commit('addMessage', { text: `¡Vaya! Encontraste ${trashItem.name} y te da +${trashItem.energy} de energía.`, type: 'catch' });
            } else {
                commit('addCaughtTrash', trashItem);
                commit('incrementTrashCount');
                commit('addMessage', { text: `¡Oh, no! Has pescado ${trashItem.name}.`, type: 'catch' });
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
                    const inZone = fish.zone === state.currentZone;
                    return meetsRequirements && availableAtTime && inZone;
                }).map(fish => ({
                    ...fish,
                    rarity: getAdjustedRarity(fish) // Apply adjusted rarity
                }));

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
                if (fishToCatch.value > 5000 || fishToCatch.isExotic) {
                    commit('setFishToCatch', fishToCatch);
                    commit('setFishFighting', true);
                    commit('addMessage', { text: `¡Un pez enorme ha picado! ¡Toca repetidamente para no dejarlo escapar!`, type: 'warning' });
                } else {
                    const value = Math.floor(fishToCatch.value * (state.isNight ? 1.5 : 1));
                    commit('addMessage', { text: `¡Genial! Has atrapado un ${fishToCatch.name} con un valor de ${value}$.`, type: 'catch' });
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
                    commit('addMessage', { text: 'Parece que hoy no pican...', type: 'system' });
                }
            } else {
                commit('addMessage', { text: '¡Rayos! El pez se ha escapado.', type: 'warning' });
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
            commit('addMessage', { text: `¡Lo lograste! Has atrapado un ${fish.name} con un valor de ${value}$.`, type: 'catch' });
            commit('updateFishingStats', { fish, value });
            commit('addCaughtFish', { ...fish, value });
            if (fish.isExotic) {
                commit('incrementExoticFishCount');
                commit('updateGoalProgress', { type: 'catchExoticFish', amount: 1 });
                // Check if it's a legendary fish
                if (fish.rarity <= 0.005) { // Assuming rarity <= 0.005 means legendary
                    commit('updateGoalProgress', { type: 'catchLegendaryFish', amount: 1 });
                }
            } else {
                commit('incrementCommonFishCount');
                commit('updateGoalProgress', { type: 'catchCommonFish', amount: 1 });
            }
            commit('addMoney', value);
            commit('setFishFighting', false);
            commit('setFishToCatch', null);
        }
        },
        sellAllFish({ commit, state, dispatch }) {
        if (state.caughtFishInventory.length === 0) {
            commit('addMessage', { text: 'No tienes ningún pez para vender. ¡A pescar!', type: 'warning' });
            return;
        }

        const totalValue = state.caughtFishInventory.reduce((sum, fish) => sum + fish.value, 0);
        const fishCount = state.caughtFishInventory.length;

        commit('addMoney', totalValue);
        commit('setCaughtFishInventory', []);
        commit('addMessage', { text: `Has vendido ${fishCount} peces por un total de ${totalValue}$. ¡Buen trabajo!`, type: 'system' });

        // Update goals
        commit('updateGoalProgress', { type: 'sellFish', amount: fishCount });
        commit('updateGoalProgress', { type: 'earnMoney', amount: totalValue });
        },
        buyRod({ commit, state, dispatch }, rodIndex) {
            const rod = state.fishingRods[rodIndex];
            if (state.money >= rod.price) {
                commit('spendMoney', rod.price);
                commit('unlockRod', rodIndex);
                commit('addMessage', { text: `¡Excelente compra! Has adquirido la ${rod.name}.`, type: 'achievement' });
                commit('updateGoalProgress', { type: 'buyRod', amount: 1, id: rodIndex });
            }
        },
        buyBoat({ commit, state, dispatch }, boatIndex) {
            const boat = state.boats[boatIndex];
            if (state.money >= boat.price) {
                commit('spendMoney', boat.price);
                commit('unlockBoat', boatIndex);
                commit('addMessage', { text: `¡Excelente compra! Has adquirido el ${boat.name}.`, type: 'achievement' });
                commit('updateGoalProgress', { type: 'buyBoat', amount: 1, id: boatIndex });
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
        // Iterate backwards to safely remove completed goals
        for (let i = state.currentGoals.length - 1; i >= 0; i--) {
            const goal = state.currentGoals[i];
            if (!goal.completed && goal.current >= goal.target) {
            commit('completeGoal', goal.id); // Pass only the ID
            commit('addMoney', goal.reward);
            commit('addMessage', { text: `¡Felicidades! Has completado el objetivo: "${goal.description}" y ganas ${goal.reward}$.`, type: 'achievement' });
            }
        }
        },
        recycleItem({ commit, state, dispatch }, index) {
            const item = state.caughtTrashInventory[index];
            commit('addMoney', item.recycleValue);
            const newInventory = [...state.caughtTrashInventory];
            newInventory.splice(index, 1);
            commit('setCaughtTrashInventory', newInventory);
            commit('recycle', { count: 1, value: item.recycleValue });
            commit('addMessage', { text: `Has reciclado ${item.name} y has ganado ${item.recycleValue}$.`, type: 'system' });
            commit('updateGoalProgress', { type: 'recycleItems', amount: 1 });
        },
        recycleAllTrash({ commit, state, dispatch }) {
            const totalValue = state.caughtTrashInventory.reduce((sum, item) => sum + item.recycleValue, 0);
            if (totalValue > 0) {
                const itemCount = state.caughtTrashInventory.length;
                commit('addMoney', totalValue);
                commit('recycle', { count: itemCount, value: totalValue });
                commit('setCaughtTrashInventory', []);
                commit('addMessage', { text: `Has reciclado toda la basura y has ganado ${totalValue}$.`, type: 'system' });
                commit('updateGoalProgress', { type: 'recycleItems', amount: itemCount });
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
                commit('addMessage', { text: `Descansas y recuperas tus fuerzas. El costo del descanso es de ${sleepCost}$.`, type: 'system' });
            } else {
                commit('addMessage', { text: `No tienes suficiente dinero para descansar. Necesitas ${sleepCost}$.`, type: 'warning' });
            }
        },
        toggleModal({ commit }, modal) {
        commit('toggleModal', modal);
        },
        unlockZone({ commit, state }, zoneId) {
        const zone = state.zones.find(z => z.id === zoneId);
        if (zone && !zone.unlocked && state.money >= zone.cost) {
            commit('spendMoney', zone.cost);
            commit('unlockZone', zoneId);
            commit('addMessage', { text: `¡Nueva zona desbloqueada! Ahora puedes pescar en ${zone.name}.`, type: 'achievement' });
        }
        },
        travelToZone({ commit }, zoneId) {
        commit('setCurrentZone', zoneId);
        commit('addMessage', { text: `Preparando el viaje a la nueva zona...`, type: 'system' });
        commit('toggleModal', 'map');
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
        getGoals: (state) => {
        return {
            current: state.currentGoals,
            completed: state.completedGoals,
        };
        },
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

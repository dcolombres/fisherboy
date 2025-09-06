<template>
  <div id="gameContainer">
    <UIOverlay />
    <MarketModal />
    <StatsModal />
    <GoalsModal />
    <RecycleModal />
    <TreasuresModal />
    <InstructionsModal />
    <MessageConsole />
    <Equipment />
    <Boat />
    <Storm />
    <Water />
  </div>
</template>

<script>
// Importación de componentes
import UIOverlay from './UIOverlay.vue';
import MarketModal from './MarketModal.vue';
import StatsModal from './StatsModal.vue';
import GoalsModal from './GoalsModal.vue';
import RecycleModal from './RecycleModal.vue';
import TreasuresModal from './TreasuresModal.vue';
import InstructionsModal from './InstructionsModal.vue';
import MessageConsole from './MessageConsole.vue';
import Equipment from './Equipment.vue';
import Boat from './Boat.vue';
import Storm from './Storm.vue';
import Water from './Water.vue';

// Importar el store de Vuex
import { useStore } from 'vuex';

export default {
  name: 'GameContainer',
  components: {
    UIOverlay,
    MarketModal,
    StatsModal,
    GoalsModal,
    RecycleModal,
    TreasuresModal,
    InstructionsModal,
    MessageConsole,
    Equipment,
    Boat,
    Storm,
    Water
  },
  setup() {
    const store = useStore();

    // Mapear estado y acciones del store
    // Esto se expandirá a medida que se refactoricen más métodos
    const money = store.getters.getMoney;
    const fishCount = store.getters.getFishCount;
    const energy = store.getters.getEnergy;
    const gameTime = store.getters.getGameTime;
    const currentDay = store.getters.getCurrentDay;
    const isNight = store.getters.getIsNight;
    const isFishing = store.getters.getIsFishing;
    const boatPosition = store.getters.getBoatPosition;
    const currentRod = store.getters.getCurrentRod;
    const currentBoat = store.getters.getCurrentBoat;
    const unlockedRods = store.getters.getUnlockedRods;
    const unlockedBoats = store.getters.getUnlockedBoats;
    const todayFishCount = store.getters.getTodayFishCount;
    const todayFishValue = store.getters.getTodayFishValue;
    const caughtFishInventory = store.getters.getCaughtFishInventory;
    const caughtTrashInventory = store.getters.getCaughtTrashInventory;
    const stormActive = store.getters.getStormActive;
    const lastStormTime = store.getters.getLastStormTime;
    const lastEnergyRegen = store.getters.getLastEnergyRegen;
    const fishingStats = store.getters.getFishingStats;
    const octopusActive = store.getters.getOctopusActive;
    const lastOctopusDay = store.getters.getLastOctopusDay;
    const mermaidActive = store.getters.getMermaidActive;
    const lastMermaidDay = store.getters.getLastMermaidDay;
    const instructionsHidden = store.getters.getInstructionsHidden;
    const cheatCode = store.getters.getCheatCode;
    const MONEY_CHEAT = store.getters.getMoneyCheat;

    return {
      money, fishCount, energy, gameTime, currentDay, isNight, isFishing, boatPosition,
      currentRod, currentBoat, unlockedRods, unlockedBoats, todayFishCount, todayFishValue,
      caughtFishInventory, caughtTrashInventory, stormActive, lastStormTime, lastEnergyRegen,
      fishingStats, octopusActive, lastOctopusDay, mermaidActive, lastMermaidDay,
      instructionsHidden, cheatCode, MONEY_CHEAT
    };
  },
  data() {
    return {
      // --- DATOS DE CONFIGURACIÓN DEL JUEGO ---
      // Estos datos de configuración se mantendrán aquí por ahora, 
      // pero idealmente también podrían ir a un módulo de configuración en el store.
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
        { name: "Sardina", value: 50, color: "silver", speed: 1, rarity: 0.3 },
        { name: "Atún", value: 100, color: "darkblue", speed: 1.2, rarity: 0.25 },
        { name: "Salmón", value: 200, color: "salmon", speed: 1.5, rarity: 0.2 },
        { name: "Pez Dorado", value: 400, color: "gold", speed: 2, rarity: 0.15 },
        { name: "Pez Espada", value: 900, color: "gray", speed: 2.2, rarity: 0.1 },
        { name: "Tiburón", value: 1500, color: "darkgray", speed: 2.5, rarity: 0.05 },
        { name: "Pez Globo", value: 300, color: "yellow", speed: 1.8, rarity: 0.18 },
        { name: "Lenguado", value: 150, color: "tan", speed: 1.3, rarity: 0.22 },
        { name: "Lubina", value: 2550, color: "silver", speed: 1.6, rarity: 0.2 },
        { name: "Pez Payaso", value: 80, color: "orange", speed: 1.4, rarity: 0.28 },
        {
            name: "Pez Dragón Celestial",
            value: 34500,
            color: "#4a90e2",
            speed: 3.5,
            rarity: 0.001
        },
        {
            name: "Leviatán Abisal",
            value: 28000,
            color: "#1e0f3d",
            speed: 3.2,
            rarity: 0.002
        },
        {
            name: "Quimera Luminosa",
            value: 25000,
            color: "#50fa7b",
            speed: 3.0,
            rarity: 0.003
        },
        {
            name: "Pez Fénix",
            value: 22000,
            color: "#ff5555",
            speed: 2.8,
            rarity: 0.004
        },
        {
            name: "Mini Kraken",
            value: 18500,
            color: "#8b0000",
            speed: 2.7,
            rarity: 0.005
        },
        {
            name: "Sirena Escamada",
            value: 15000,
            color: "#ff79c6",
            speed: 2.6,
            rarity: 0.006
        },
        {
            name: "Pez Unicornio",
            value: 12000,
            color: "#bd93f9",
            speed: 2.5,
            rarity: 0.007
        },
        {
            name: "Medusa de Cristal",
            value: 9000,
            color: "#8be9fd",
            speed: 2.4,
            rarity: 0.008
        },
        {
            name: "Serpiente Marina",
            value: 7500,
            color: "#50fa7b",
            speed: 2.3,
            rarity: 0.009
        },
        {
            name: "Pez Espectral",
            value: 5000,
            color: "#f8f8f2",
            speed: 2.2,
            rarity: 0.01
        },
        {
            name: "Leviatán de las Profundidades",
            value: 45000,
            color: "#800080",
            speed: 4.0,
            rarity: 0.001,
            requirements: { boat: 2, rod: 2 }
        },
        {
            name: "Pez Ancestral",
            value: 42000,
            color: "#4B0082",
            speed: 3.8,
            rarity: 0.002,
            requirements: { boat: 2, rod: 2 }
        },
        {
            name: "Emperador del Océano",
            value: 40000,
            color: "#00008B",
            speed: 3.7,
            rarity: 0.003,
            requirements: { boat: 2, rod: 2 }
        },
        {
            name: "Pez Arcoíris",
            value: 15000,
            color: "#FF1493",
            speed: 2.8,
            rarity: 0.01,
            requirements: { boat: 1, rod: 2 }
        },
        {
            name: "Cazador Nocturno",
            value: 12000,
            color: "#4682B4",
            speed: 2.6,
            rarity: 0.015,
            requirements: { boat: 2, rod: 1 }
        },
        {
            name: "Guardián del Coral",
            value: 10000,
            color: "#FF7F50",
            speed: 2.5,
            rarity: 0.02,
            requirements: { boat: 1, rod: 1 }
        }
      ],
      specialOctopus: {
        name: "Pulpo Ancestral Gigante",
        value: 100000,
        color: "#800080",
        speed: 0.5,
        rarity: 0.2,
        requirements: { boat: 2, rod: 2, night: true, storm: true }
      },
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
      goals: [
        {
            id: 'catch20',
            description: 'Atrapar 20 peces',
            target: 20,
            reward: 2000,
            type: 'fish_count',
            completed: false
        },
        {
            id: 'catch_exotic',
            description: 'Atrapar un pez exótico',
            type: 'exotic_fish',
            reward: 1000,
            completed: false
        },
        {
            id: 'earn20000',
            description: 'Ganar $20,000',
            target: 20000,
            type: 'money',
            reward: 20000,
            completed: false
        },

        {
            id: 'catch100',
            description: 'Atrapar 100 peces',
            target: 100,
            reward: 30000,
            type: 'fish_count',
            completed: false
        },
        {
            id: 'catch5_exotic',
            description: 'Atrapar 5 peces exóticos',
            target: 5,
            type: 'exotic_fish_count',
            reward: 15000,
            completed: false
        },

        {
            id: 'catch500',
            description: 'Atrapar 500 peces',
            target: 500,
            reward: 30000,
            type: 'fish_count',
            completed: false
        },
        {
            id: 'catch50_exotic',
            description: 'Atrapar 50 peces exóticos',
            target: 50,
            type: 'exotic_fish_count',
            reward: 555000,
            completed: false
        },
        {
            id: 'earn1000000',
            description: 'Ganar $1,000,000',
            target: 1000000,
            type: 'money',
            reward: 70000,
            completed: false
        },
        {
            id: 'buy_pro_boat',
            description: 'Comprar el Barco Profesional',
            type: 'pro_boat',
            reward: 80000,
            completed: false
        },
        {
            id: 'catch_leviathan',
            description: 'Atrapar un Leviatán de las Profundidades',
            type: 'specific_fish',
            fishName: 'Leviatán de las Profundidades',
            reward: 1000000,
            completed: false,
            hidden: true
        },
        {
            id: 'catch_ancestral',
            description: 'Atrapar un Pez Ancestral',
            type: 'specific_fish',
            fishName: 'Pez Ancestral',
            reward: 1900000,
            completed: false,
            hidden: true
        },
        {
            id: 'catch_emperor',
            description: 'Atrapar un Emperador del Océano',
            type: 'specific_fish',
            fishName: 'Emperador del Océano',
            reward: 800000,
            completed: false,
            hidden: true
        },
        {
            id: 'catch_rainbow',
            description: 'Atrapar un Pez Arcoíris',
            type: 'specific_fish',
            fishName: 'Pez Arcoíris',
            reward: 300000,
            completed: false,
            hidden: true
        },
        {
            id: 'catch_night_hunter',
            description: 'Atrapar un Cazador Nocturno',
            type: 'specific_fish',
            fishName: 'Cazador Nocturno',
            reward: 250000,
            completed: false,
            hidden: true
        },
        {
            id: 'catch_coral',
            description: 'Atrapar un Guardián del Coral',
            type: 'specific_fish',
            fishName: 'Guardián del Coral',
            reward: 200000,
            completed: false,
            hidden: true
        },
        {
            id: 'recycle_items_50',
            description: 'Reciclar 50 objetos de basura',
            target: 50,
            type: 'recycle_count',
            reward: 5000,
            completed: false
        },
        {
            id: 'recycle_value_50000',
            description: 'Ganar $50,000 reciclando basura',
            target: 50000,
            type: 'recycle_value',
            reward: 75000,
            completed: false
        }
      ],
    };
  },
  methods: {
    // --- MÉTODOS DE UTILIDAD Y MENSAJES ---
    // Muestra el panel de instrucciones.
    showInstructions() {
        const instructions = document.getElementById('instructions');
        instructions.style.display = 'block';
        instructions.classList.remove('instructions-fade');
        this.instructionsHidden = false;
    },
    // Oculta el panel de instrucciones con una transición suave.
    hideInstructions() {
        const instructions = document.getElementById('instructions');
        instructions.classList.add('instructions-fade');
        setTimeout(() => {
            instructions.style.display = 'none';
        }, 1000); // La transición de desvanecimiento es de 1 segundo.
        this.instructionsHidden = true;
    },
    // Alterna la visibilidad del panel de instrucciones.
    toggleInstructions() {
        if(this.instructionsHidden) {
            this.showInstructions();
        } else {
            this.hideInstructions();
        }
    },
    // Añade un mensaje a la consola de mensajes en pantalla.
    addMessage(message, type = 'normal') {
        const console = document.getElementById('messageConsole');
        const messageElement = document.createElement('p');
        messageElement.className = `message message-${type}`;
        messageElement.textContent = message;
        console.appendChild(messageElement);
        console.scrollTop = console.scrollHeight; // Auto-scroll hacia abajo.

        // Limita el número de mensajes en la consola a 10.
        while (console.children.length > 10) {
            console.removeChild(console.firstChild);
        }
    },

    // --- MÉTODOS DE EVENTOS DEL JUEGO ---
    // Activa una tormenta, cambiando el estado y la apariencia del juego.
    activateStorm() {
        if (this.stormActive) return;
        this.stormActive = true;
        document.querySelector('.storm').classList.add('active');
        document.querySelector('.water').classList.add('storm-active');
        this.addMessage('¡Ha comenzado una tormenta! ¡Las tasas de captura y los valores aumentan!', 'system');
        this.createRaindrops();
        const stormDuration = (Math.random() * 2 + 3) * 60 * 1000; // Duración aleatoria entre 3 y 5 minutos.
        this.stormTimeout = setTimeout(this.deactivateStorm, stormDuration);
        this.lastStormTime = Date.now();
    },
    // Desactiva la tormenta y revierte los cambios visuales.
    deactivateStorm() {
        if (!this.stormActive) return;
        this.stormActive = false;
        document.querySelector('.storm').classList.remove('active');
        document.querySelector('.water').classList.remove('storm-active');
        const raindrops = document.querySelectorAll('.raindrop');
        raindrops.forEach(drop => drop.remove());
        this.addMessage('La tormenta ha pasado...', 'system');
        if (this.stormTimeout) {
            clearTimeout(this.stormTimeout);
            this.stormTimeout = null;
        }
    },
    // Crea el efecto visual de la lluvia durante una tormenta.
    createRaindrops() {
        if (!this.stormActive) return;
        const gameContainer = document.getElementById('gameContainer');
        const dropCount = 20;
        for (let i = 0; i < dropCount; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            raindrop.style.left = `${Math.random() * 100}%`;
            const duration = 0.5 + Math.random();
            raindrop.style.animationDuration = `${duration}s`;
            gameContainer.appendChild(raindrop);
            raindrop.addEventListener('animationend', () => {
                raindrop.remove();
            });
        }
        if (this.stormActive) {
            setTimeout(this.createRaindrops, 100);
        }
    },

    // --- MÉTODOS DE INTERACCIÓN DEL JUGADOR ---
    // Gestiona la selección y compra de cañas de pescar.
    selectRod(rodIndex) {
        if (!this.unlockedRods[rodIndex]) {
            const rod = this.fishingRods[rodIndex];
            if (this.money >= rod.price) {
                if (confirm(`¿Quieres comprar la ${rod.name} por $${rod.price}?`)) {
                    this.money -= rod.price;
                    this.unlockedRods[rodIndex] = true;
                    this.addMessage(`¡Has comprado la ${rod.name}!`, 'achievement');
                    this.updateUI();
                    this.updateEquipmentButtons();
                }
            } else {
                this.addMessage(`Necesitas $${rod.price} para comprar esta caña`, 'warning');
            }
            return;
        }
        document.querySelectorAll('.equipment-section button').forEach(button => {
            button.classList.remove('selected');
        });
        const buttons = document.querySelectorAll('.equipment-section button');
        buttons[rodIndex].classList.add('selected');
        this.currentRod = rodIndex;
        const lineColors = ['#ffffff', '#ffff00', '#000000'];
        document.getElementById('fishingLine').style.backgroundColor = lineColors[rodIndex];
        this.addMessage(`Has seleccionado: ${this.fishingRods[rodIndex].name}`);
        this.updateMarketDisplay();
    },
    // Gestiona la selección y compra de barcos.
    selectBoat(boatIndex) {
        if (!this.unlockedBoats[boatIndex]) {
            const boat = this.boats[boatIndex];
            if (this.money >= boat.price) {
                if (confirm(`¿Quieres comprar el ${boat.name} por $${boat.price}?`)) {
                    this.money -= boat.price;
                    this.unlockedBoats[boatIndex] = true;
                    this.addMessage(`¡Has comprado el ${boat.name}!`, 'achievement');
                    const boatElement = document.getElementById('boat');
                    boatElement.style.backgroundImage = `url('${this.boats[boatIndex].image}')`;
                    boatElement.style.transform = `translateX(-30%) scale(${1 + (boatIndex * 0.2)})`;
                    boatElement.className = '';
                    if (boatIndex === 1) boatElement.classList.add('advanced-boat');
                    if (boatIndex === 2) boatElement.classList.add('pro-boat');
                    this.updateUI();
                    this.updateEquipmentButtons();
                }
            } else {
                this.addMessage(`Necesitas $${boat.price} para comprar este barco`, 'warning');
            }
            return;
        }
        const boatButtons = document.querySelectorAll('.equipment-section:nth-child(2) button');
        boatButtons.forEach(button => button.classList.remove('selected'));
        boatButtons[boatIndex].classList.add('selected');
        this.currentBoat = boatIndex;
        this.addMessage(`Has seleccionado: ${this.boats[boatIndex].name}`);
        const boatElement = document.getElementById('boat');
        boatElement.style.backgroundImage = `url('${this.boats[boatIndex].image}')`;
        boatElement.style.transform = `translateX(-30%) scale(${1 + (boatIndex * 0.2)})`;
        boatElement.className = '';
        if (boatIndex === 1) boatElement.classList.add('advanced-boat');
        if (boatIndex === 2) boatElement.classList.add('pro-boat');
        this.updateMarketDisplay();
    },
    // Inicia la acción de pescar.
    startFishing() {
        if (this.isFishing) return;
        this.hideInstructions();
        const energyCost = 15;
        if (!this.updateEnergy(-energyCost)) {
            return;
        }
        this.isFishing = true;
        const line = document.getElementById('fishingLine');
        line.style.height = '200px';
        const lineColors = ['#ffffff', '#ffff00', '#000000'];
        document.getElementById('fishingLine').style.backgroundColor = lineColors[this.currentRod];
        this.addMessage('Lanzando caña...', 'system');
        setTimeout(() => {
            // Probabilidad de pescar basura.
            if (Math.random() < 0.3) {
                const trashItem = this.trashTypes[Math.floor(Math.random() * this.trashTypes.length)];
                this.caughtTrashInventory.push(trashItem);
                this.addMessage(`¡Has pescado ${trashItem.name}! Puedes reciclarlo por $${trashItem.recycleValue}`, 'catch');
                line.style.height = '100px';
                this.isFishing = false;
                return;
            }
            // Lógica para eventos especiales (pulpo, sirena).
            if (this.octopusActive && this.isNight && this.stormActive && this.currentRod === 2 && this.currentBoat === 2) {
                if (Math.random() < 0.3) {
                    this.addMessage('¡¡¡HAS ATRAPADO AL PULPO ANCESTRAL GIGANTE!!!', 'achievement');
                    this.money += this.specialOctopus.value;
                    this.fishCount++;
                    this.updateFishingStats(this.specialOctopus, this.specialOctopus.value);
                    this.deactivateOctopus();
                    this.updateUI();
                    line.style.height = '100px';
                    this.isFishing = false;
                    return;
                }
            }
            // Lógica principal de captura de peces.
            const catchChance = Math.random() * this.boats[this.currentBoat].catchBonus;
            let selectedFish;
            const rarityRoll = Math.random();
            const specialFish = this.fishTypes.filter(f => f.requirements &&
                f.requirements.boat === this.currentBoat &&
                f.requirements.rod === this.currentRod);
            if (specialFish.length > 0 && rarityRoll < specialFish[0].rarity) {
                selectedFish = specialFish[Math.floor(Math.random() * specialFish.length)];
            } else {
                if (catchChance < this.fishingRods[this.currentRod].catchRate) {
                    const regularIndex = Math.floor(Math.random() * 10);
                    selectedFish = this.fishTypes[regularIndex];
                } else {
                    const missMessage = Math.random() < 0.3 ?
                        '¡El pez fue demasiado rápido!' :
                        '¡El pez escapó!';
                    this.addMessage(missMessage, 'warning');
                    line.style.height = '100px';
                    this.isFishing = false;
                    return;
                }
            }
            const bonus = this.boats[this.currentBoat].catchBonus;
            const nightBonus = this.isNight ? 1.5 : 1;
            const stormMultiplier = this.stormActive ? (selectedFish.value >= 5000 ? 3 : 2) : 1;
            const finalValue = Math.floor(selectedFish.value * bonus * nightBonus * stormMultiplier);
            this.todayFishCount++;
            this.todayFishValue += finalValue;
            this.caughtFishInventory.push({
                fish: selectedFish,
                value: finalValue
            });
            this.fishCount++;
            this.updateFishingStats(selectedFish, finalValue);
            let bonusText = [];
            if (this.isNight) bonusText.push('Bono Nocturno');
            if (this.stormActive) bonusText.push('Bono de Tormenta');
            const bonusString = bonusText.length > 0 ? ` (${bonusText.join(', ')})` : '';
            this.addMessage(`¡Has atrapado un ${selectedFish.name}! Valor: $${finalValue}${bonusString}`, 'catch');
            this.updateUI();
            this.updateEquipmentButtons();
            line.style.height = '100px';
            this.isFishing = false;
        }, 2000 / this.boats[this.currentBoat].speedMultiplier);
    },
    // Mueve el barco a izquierda o derecha.
    moveBoat(direction) {
        const speed = 5 * this.boats[this.currentBoat].speedMultiplier;
        this.boatPosition += direction * speed;
        this.boatPosition = Math.max(10, Math.min(90, this.boatPosition));
        document.getElementById('boat').style.left = this.boatPosition + '%';
    },
    // Vende todos los peces del inventario diario.
    sellAllFish() {
        if (this.todayFishCount === 0) {
            this.addMessage('¡No tienes peces para vender!', 'warning');
            return;
        }
        this.money += this.todayFishValue;
        this.addMessage(`¡Has vendido ${this.todayFishCount} peces por $${this.todayFishValue}!`, 'catch');
        this.todayFishCount = 0;
        this.todayFishValue = 0;
        this.caughtFishInventory = [];
        this.updateUI();
        this.updateMarketDisplay();
    },
    // Permite al jugador dormir para restaurar energía y pasar al día siguiente.
    goToSleep() {
        this.hideMarket();
        this.gameTime += 469;
        if (this.gameTime >= 1440) {
            this.gameTime = this.gameTime - 1440;
            this.currentDay++;
        }
        this.energy = 100;
        this.updateEnergy(0);
        this.todayFishCount = 0;
        this.todayFishValue = 0;
        this.caughtFishInventory = [];
        const wakeHours = Math.floor(this.gameTime / 60);
        const wakeMinutes = this.gameTime % 60;
        const timeString = `${wakeHours.toString().padStart(2, '0')}:${wakeMinutes.toString().padStart(2, '0')}`;
        this.addMessage(`Dormiste casi 8 horas. Te despiertas a las ${timeString}. ¡Energía restaurada!`, 'system');
        this.updateUI();
        this.updateMarketDisplay();
        this.updateDayNight();
    },
    // Gestiona la entrada de teclado para mover el barco, pescar y usar trucos.
    handleKeyDown(e) {
        this.cheatCode += e.key.toLowerCase();
        if (this.cheatCode.length > this.MONEY_CHEAT.length) {
            this.cheatCode = this.cheatCode.substring(this.cheatCode.length - this.MONEY_CHEAT.length);
        }
        if (this.cheatCode === this.MONEY_CHEAT) {
            this.money += 150000;
            this.addMessage('TRUCO ACTIVADO: +$150,000!', 'achievement');
            this.updateUI();
            this.updateEquipmentButtons();
            this.updateMarketDisplay();
            this.cheatCode = '';
        }
        switch (e.code) {
            case 'ArrowLeft': this.moveBoat(-1); break;
            case 'ArrowRight': this.moveBoat(1); break;
            case 'ArrowUp': this.startFishing(); break;
            case 'KeyM': this.showMarket(); break;
            case 'KeyS': this.showStats(); break;
            case 'KeyG': this.showGoals(); break;
            case 'KeyR': this.showRecycleScreen(); break;
            case 'KeyT': this.showTreasures(); break;
        }
    },

    // --- MÉTODOS DE ACTUALIZACIÓN DE LA INTERFAZ ---
    // Actualiza los elementos principales de la UI (dinero, peces, energía).
    updateUI() {
        document.getElementById('money').textContent = this.money;
        document.getElementById('fishCount').textContent = this.fishCount;
        document.getElementById('energy-fill').style.width = this.energy + '%';
        this.updateGoalsProgress();
    },
    // Actualiza el estado visual (bloqueado/desbloqueado) de los botones de equipo.
    updateEquipmentButtons() {
        document.getElementById('proRod').classList.toggle('locked', !this.unlockedRods[1]);
        document.getElementById('masterRod').classList.toggle('locked', !this.unlockedRods[2]);
        document.getElementById('advancedBoat').classList.toggle('locked', !this.unlockedBoats[1]);
        document.getElementById('proBoat').classList.toggle('locked', !this.unlockedBoats[2]);
    },
    // Actualiza la barra de progreso de los objetivos.
    updateGoalsProgress() {
        this.goals.forEach(goal => {
            const goalElement = document.getElementById(`goal-${goal.id}`);
            if (!goalElement) return;
            let progress = 0;
            switch (goal.type) {
                // ... (cálculo de progreso)
            }
            const progressBar = goalElement.querySelector('.goal-progress-bar');
            if (goal.type === 'specific_fish') {
                if (progress > 0) progressBar.style.width = '100%';
            }
            if (progress >= 100 && !goal.completed) {
                goal.completed = true;
                this.money += goal.reward;
                this.addMessage(`¡Objetivo cumplido: ${goal.description}! Recompensa: $${goal.reward}`, 'achievement');
                goalElement.classList.add('completed');
                this.updateUI();
                this.showGoals();
                setTimeout(this.hideGoals, 3000);
            }
        });
    },
    // Actualiza la pantalla del mercado con el equipo disponible y el inventario actual.
    updateMarketDisplay() {
        document.getElementById('todayFishCount').textContent = this.todayFishCount;
        document.getElementById('todayFishValue').textContent = this.todayFishValue;

        const rodsContainer = document.getElementById('fishing-rods-market');
        rodsContainer.innerHTML = ''; // Limpia el contenedor antes de redibujar.

        this.fishingRods.forEach((rod, index) => {
            const div = document.createElement('div');
            div.className = 'equipment-item';
            if (index === this.currentRod) div.classList.add('selected');

            const statsText = `Poder: ${rod.power}x | Velocidad: ${rod.speed}x | Tasa de Captura: ${Math.round(rod.catchRate * 100)}%`;

            const infoDiv = document.createElement('div');
            infoDiv.className = 'equipment-info';
            infoDiv.innerHTML = `<div class="equipment-name">${rod.name} ${index === this.currentRod ? '(Equipado)' : ''}</div><div class="equipment-stats">${statsText}</div>`;
            div.appendChild(infoDiv);

            if (this.unlockedRods[index]) {
                const ownedLabel = document.createElement('span');
                ownedLabel.className = 'owned-label';
                ownedLabel.textContent = 'Comprado';
                div.appendChild(ownedLabel);
            } else {
                const buyDiv = document.createElement('div');
                const priceSpan = document.createElement('span');
                priceSpan.className = 'equipment-price';
                priceSpan.textContent = `$${rod.price}`;
                buyDiv.appendChild(priceSpan);

                const buyButton = document.createElement('button');
                buyButton.className = 'buy-button';
                buyButton.textContent = 'Comprar';
                buyButton.disabled = this.money < rod.price;
                buyButton.addEventListener('click', () => this.selectRod(index)); // Asigna el evento de forma segura.
                buyDiv.appendChild(buyButton);
                div.appendChild(buyDiv);
            }
            rodsContainer.appendChild(div);
        });

        const boatsContainer = document.getElementById('boats-market');
        boatsContainer.innerHTML = '';

        this.boats.forEach((boat, index) => {
            const div = document.createElement('div');
            div.className = 'equipment-item';
            if (index === this.currentBoat) div.classList.add('selected');

            const statsText = `Velocidad: ${boat.speedMultiplier}x | Bono de Captura: ${boat.catchBonus}x`;
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'equipment-info';
            infoDiv.innerHTML = `<div class="equipment-name">${boat.name} ${index === this.currentBoat ? '(Equipado)' : ''}</div><div class="equipment-stats">${statsText}</div>`;
            div.appendChild(infoDiv);

            if (this.unlockedBoats[index]) {
                const ownedLabel = document.createElement('span');
                ownedLabel.className = 'owned-label';
                ownedLabel.textContent = 'Comprado';
                div.appendChild(ownedLabel);
            } else {
                const buyDiv = document.createElement('div');
                const priceSpan = document.createElement('span');
                priceSpan.className = 'equipment-price';
                priceSpan.textContent = `$${boat.price}`;
                buyDiv.appendChild(priceSpan);

                const buyButton = document.createElement('button');
                buyButton.className = 'buy-button';
                buyButton.textContent = 'Comprar';
                buyButton.disabled = this.money < boat.price;
                buyButton.addEventListener('click', () => this.selectBoat(index)); // Asigna el evento de forma segura.
                buyDiv.appendChild(buyButton);
                div.appendChild(buyDiv);
            }
            boatsContainer.appendChild(div);
        });
    },
    // Actualiza la pantalla de reciclaje con el inventario de basura.
    updateRecycleDisplay() {
        const trashContainer = document.getElementById('trash-items');
        trashContainer.innerHTML = '';

        if (this.caughtTrashInventory.length === 0) {
            trashContainer.innerHTML = '<p style="text-align: center;">No hay basura para reciclar</p>';
            return;
        }

        this.caughtTrashInventory.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'trash-item';

            const infoDiv = document.createElement('div');
            infoDiv.className = 'trash-info';
            infoDiv.innerHTML = `<span>${item.name}</span><span>Valor: $${item.recycleValue}</span>`;
            itemDiv.appendChild(infoDiv);

            const recycleButton = document.createElement('button');
            recycleButton.className = 'recycle-button';
            recycleButton.textContent = 'Reciclar';
            recycleButton.addEventListener('click', () => this.recycleItem(index)); // Asigna el evento de forma segura.
            itemDiv.appendChild(recycleButton);
            
            trashContainer.appendChild(itemDiv);
        });
    },
    // Actualiza las estadísticas de pesca del jugador.
    updateFishingStats(fish, value) {
        if (!this.fishingStats.fishByType[fish.name]) {
            this.fishingStats.fishByType[fish.name] = { count: 0, totalValue: 0 };
        }
        this.fishingStats.fishByType[fish.name].count++;
        this.fishingStats.fishByType[fish.name].totalValue += value;
        this.fishingStats.totalCaught++;
        this.fishingStats.totalValue += value;

        document.getElementById('totalFishCaught').textContent = this.fishingStats.totalCaught;
        document.getElementById('totalValueEarned').textContent = this.fishingStats.totalValue;

        const statsGrid = document.querySelector('#statsModal .stats-grid');
        if (statsGrid) {
            statsGrid.innerHTML = '';
            Object.entries(this.fishingStats.fishByType).forEach(([fishName, stats]) => {
                const statDiv = document.createElement('div');
                statDiv.className = 'fish-stat';
                statDiv.innerHTML = `
                <div class="fish-stat-name">${fishName}</div>
                <div class="fish-stat-count">Atrapados: ${stats.count}</div>
                <div class="fish-stat-value">Valor: $${stats.totalValue}</div>
            `;
                statsGrid.appendChild(statDiv);
            });
        }
    }
  },
  // mounted() se ejecuta una vez que el componente ha sido añadido al DOM.
  mounted() {
    // Inicia los intervalos de juego principales.
    window.fishAnimationInterval = setInterval(this.createFish, 3000); // Crea peces nadando.
    document.addEventListener('keydown', this.handleKeyDown); // Escucha las teclas presionadas.
    setInterval(this.updateDayNight, 1000); // Actualiza el ciclo día/noche.
    setInterval(this.handleEnergyRegeneration, 1000); // Regenera energía.

    // this.$nextTick espera a que el DOM de los componentes hijos esté listo.
    this.$nextTick(() => {
      this.createGoalsUI();
      
      // Selecciona el equipo inicial por defecto.
      document.querySelector('.equipment-section:first-child button').classList.add('selected');
      document.querySelector('.equipment-section:nth-child(2) button').classList.add('selected');
      
      // Estas llamadas a métodos ahora usarán el store de Vuex para obtener datos
      // y despachar acciones.
      // this.updateUI(); // Se actualizará a través de getters y watchers
      // this.updateEquipmentButtons(); // Se actualizará a través de getters y watchers
      this.addMessage('¡Bienvenido al juego de pesca!', 'system');

      // Los listeners para los botones de cerrar en los modales.
      document.getElementById('closeGoals').addEventListener('click', this.hideGoals);
      document.getElementById('goalsOverlay').addEventListener('click', this.hideGoals);
      
      document.getElementById('closeStats').addEventListener('click', this.hideStats);
      document.getElementById('statsOverlay').addEventListener('click', this.hideStats);
      
      document.getElementById('closeRecycle').addEventListener('click', this.hideRecycleScreen);
      
      document.getElementById('closeTreasures').addEventListener('click', this.hideTreasures);
      window.addEventListener('click', (event) => {
          const treasuresModal = document.getElementById('treasuresModal');
          if (event.target === treasuresModal) {
              this.hideTreasures();
          }
      });

      // Oculta las instrucciones iniciales después de 10 segundos.
      setTimeout(this.hideInstructions, 10000);
    });
  }
};
</script>

<style>
/* Estilos para GameContainer */
</style>

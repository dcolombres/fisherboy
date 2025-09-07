<template>
  <div class="volume-control">
    <button @click="toggleMute">{{ isMuted ? 'Unmute' : 'Mute' }}</button>
    <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="setVolume" />
  </div>
</template>

<script>
import { ref, watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'VolumeControl',
  setup() {
    const store = useStore();
    const isMuted = ref(false);
    const volume = ref(0.5);
    const audio = ref(null);
    const music = ref({});
    const mainMusicIndex = ref({}); // New ref to track index for main music alternation

    const currentPartOfDay = computed(() => store.getters.getCurrentPartOfDay);

    const musicFiles = {
      main: {
        dawn: ['/src/music/dawn.mp3', '/src/music/dawn2.mp3'],
        noon: ['/src/music/noon.mp3', '/src/music/noon2.mp3'],
        afternoon: ['/src/music/afternoon.mp3', '/src/music/afternoon2.mp3'],
        night: ['/src/music/night.mp3', '/src/music/night2.mp3'],
      },
    };

    onMounted(() => {
      for (const type in musicFiles) {
        for (const partOfDay in musicFiles[type]) {
          if (Array.isArray(musicFiles[type][partOfDay])) {
            musicFiles[type][partOfDay].forEach((path, index) => {
              const audioFile = new Audio(path);
              audioFile.preload = 'auto';
              if (!music.value[type]) {
                music.value[type] = {};
              }
              if (!music.value[type][partOfDay]) {
                music.value[type][partOfDay] = [];
              }
              music.value[type][partOfDay][index] = audioFile;
            });
            mainMusicIndex.value[partOfDay] = 0; // Initialize index for main music alternation
          } else {
            const audioFile = new Audio(musicFiles[type][partOfDay]);
            audioFile.preload = 'auto';
            if (!music.value[type]) {
              music.value[type] = {};
            }
            music.value[type][partOfDay] = audioFile;
          }
        }
      }
      // playMusic(); // Removed this call
    });

    let currentFadeOutId = null;
    let currentFadeInId = null;

    const playMusic = () => {
      // Clear any ongoing fades
      if (currentFadeOutId) cancelAnimationFrame(currentFadeOutId);
      if (currentFadeInId) cancelAnimationFrame(currentFadeInId);

      const partOfDay = store.getters.getCurrentPartOfDay;

      // Alternate between main tracks (e.g., dawn.mp3 and dawn2.mp3)
      const currentMainIndex = mainMusicIndex.value[partOfDay] || 0;
      const newMusicFile = music.value.main[partOfDay][currentMainIndex];
      mainMusicIndex.value[partOfDay] = (currentMainIndex + 1) % music.value.main[partOfDay].length;

      if (!newMusicFile || audio.value === newMusicFile) {
        return;
      }

      const oldAudio = audio.value;
      audio.value = newMusicFile;

      audio.value.loop = true;
      audio.value.volume = 0; // Start new audio at 0 volume
      audio.value.muted = isMuted.value;

      if (!isMuted.value) {
        audio.value.play();
      }

      const crossfadeDuration = 5000; // 5 seconds for smoother transition
      const startTime = performance.now();

      const fadeOut = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = elapsed / crossfadeDuration;

        if (oldAudio) {
          oldAudio.volume = Math.max(0, volume.value * (1 - progress));
          if (oldAudio.volume === 0) {
            oldAudio.pause();
          }
        }

        if (progress < 1) {
          currentFadeOutId = requestAnimationFrame(fadeOut);
        } else if (oldAudio) {
          oldAudio.pause();
          oldAudio.volume = 0; // Ensure it's completely silent
        }
      };

      const fadeIn = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = elapsed / crossfadeDuration;

        audio.value.volume = Math.min(volume.value, volume.value * progress);

        if (progress < 1) {
          currentFadeInId = requestAnimationFrame(fadeIn);
        } else {
          audio.value.volume = volume.value; // Ensure it reaches target volume
        }
      };

      if (oldAudio) {
        currentFadeOutId = requestAnimationFrame(fadeOut);
      }
      currentFadeInId = requestAnimationFrame(fadeIn);
    };

    const toggleMute = () => {
      isMuted.value = !isMuted.value;
      if (audio.value) {
        audio.value.muted = isMuted.value;
      }
    };

    const setVolume = () => {
      if (audio.value) {
        audio.value.volume = volume.value;
      }
    };

    

    watch(() => store.getters.getGameStarted, (newValue) => {
      if (newValue) {
        playMusic();
      }
    });

    return {
      isMuted,
      volume,
      toggleMute,
      setVolume,
      playMusic, // Expose playMusic
    };
  },
};
</script>

<style scoped>
.volume-control {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
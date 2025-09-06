<template>
  <div id="recycleScreen">
    <div class="recycle-content">
        <button id="closeRecycle">×</button>
        <h2 class="recycle-title">Recycling Center</h2>
        
        <div id="trash-items"></div>
        <button class="recycle-all-button" onclick="recycleAllTrash()">Recycle All</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recycle'
};
</script>

<style>
/* Recycle styles */
</style>

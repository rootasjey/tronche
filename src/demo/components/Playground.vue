<template>
  <div>
    <h1>Tronche - Avatar generator</h1>
    <p>This is a simple demo of the Vue.js avatar components.</p>

    <div style="display: flex; gap: 1rem; margin: 2rem 0;">
      <button @click="handleRandomColors">Random Colors</button>
      <button @click="isSquare = !isSquare">{{ isSquare ? 'Round' : 'Square' }}</button>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; padding: 2rem;">
      <div v-for="(name, index) in sampleNames" :key="index" style="text-align: center;">
        <AvatarMarble
          :name="name"
          :colors="currentColors"
          :size="80"
          :square="isSquare"
        />
        <p>{{ name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AvatarMarble from '../../runtime/components/avatar-marble.vue'

const sampleNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
const defaultColors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'];
const colorPalettes = [
  ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  ['#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#E17055'],
  ['#00B894', '#00CEC9', '#0984E3', '#6C5CE7', '#A29BFE']
];

const currentColors = ref([...defaultColors]);
const isSquare = ref(false);

const handleRandomColors = () => {
  const randomIndex = Math.floor(Math.random() * colorPalettes.length);
  currentColors.value = [...colorPalettes[randomIndex]];
};
</script>

<style scoped>
h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
}

p {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 2rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #f8f9fa;
}
</style>

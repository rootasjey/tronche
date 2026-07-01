<template>
  <div class="avatar-container">
    <div class="avatar-section" ref="avatarRef">
      <Avatar
        :name="avatarName"
        :colors="playgroundColors"
        :size="size"
        :variant="variant"
        :square="square"
      />
    </div>
    <input
      v-model="avatarName"
      class="input"
      @focus="handleFocus"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Avatar from '../../runtime/components/Avatar.vue'

interface Props {
  name: string
  playgroundColors: string[]
  size: number
  square: boolean
  variant: 'beam' | 'bauhaus' | 'ring' | 'sunset' | 'pixel' | 'marble'
}

const props = defineProps<Props>()

const avatarName = ref(props.name)
const avatarRef = ref<HTMLDivElement>()

const handleFocus = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.select()
}

// Watch for prop changes
watch(() => props.name, (newName) => {
  avatarName.value = newName
})
</script>

<style scoped>
.avatar-container {
  display: grid;
  grid-gap: var(--sp-s);
  padding: 0 var(--sp-m);
  font-size: 0.8rem;
}

.avatar-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  padding: var(--textbox);
  font: inherit;
  color: inherit;
  border: 1px solid transparent;
  transition: 0.5s;
  width: 100%;
  text-align: center;
  border-radius: 100rem;
  background: transparent;
}

.input:hover {
  border-color: var(--c-fieldHover);
  transition: 0.2s;
}

.input:focus {
  border-color: var(--c-fieldFocus);
  outline: none;
}
</style>

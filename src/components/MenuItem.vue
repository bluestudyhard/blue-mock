<script setup lang="ts">
import remixiconUrl from '/remixicon.symbol.svg'

const props = defineProps<{
  icon: string | undefined
  title: string | undefined
  menuPos: { top: number, left: number }
  // action: () => void
  isActive?: () => boolean
}>()
</script>

<template>
  <button
    class="menu-item"
    :class="{ 'is-active': isActive ? isActive() : false }"
    :title="title" 
    @click="$emit('action')"
  >
    <svg class="remix">
      <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
    </svg>
  </button>
</template>

<style lang="scss">
.menu-item {
  background: transparent;
  border: none;
  border-radius: 0.4rem;
  color: transparent;
  cursor: pointer;
  height: 1.75rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  width: 1.75rem;
  position: fixed;
  top: -1000px;
  left: -1000px;
  display: none;

  svg {
    fill: currentColor;
    height: 100%;
    width: 100%;
  }

  &.is-active {
    display: block;
    color: #4177f4;
    background-color: #e0e9ff;
  }

  &:hover {
    color: #4177f4;
    background-color: #e0e9ff;
  }
}

.tippy-box {
  background: #dfdfdf;
  border-radius: 0.4rem;
  width: 12rem;
  height: 30rem;
}
</style>

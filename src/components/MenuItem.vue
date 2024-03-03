<script setup lang="ts">
import remixiconUrl from '/fonts/remixicon.symbol.svg'

defineProps<{
  icon: string
  title: string
  menuPosTop: number
  action: () => void
  isActive?: () => boolean
}>()
</script>

<template>
  <button
    class="menu-item"
    :class="{ 'is-active': isActive ? isActive() : false }"
    :title="title"
    :style="{ top: `${menuPosTop}px` }"
    @click="action"
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
  left: 206px;

  svg {
    fill: currentColor;
    height: 100%;
    width: 100%;
  }

  &.is-active,
  &:hover {
    color: #1a5fff;
    background-color: #a2d4ff;
  }
}
</style>

<script setup lang="ts">
import remixiconUrl from '/fonts/remixicon.symbol.svg'
import type { Editor } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import MenuBar from './MenuBar.vue'

defineProps<{
  icon: string | undefined
  title: string | undefined
  menuPos: { top: number, left: number }
  action: () => void
  isActive?: () => boolean

}>()
const editor = inject<Editor>('editor')
const tippyBind = ref<HTMLElement | null>(null)
onMounted(() => {
  if (tippyBind.value) {
    const el = document.createElement('div')
    const app = createApp(MenuBar, { editor })
    app.provide('editor', editor)
    app.mount(el)

    tippy(tippyBind.value, {
      // your optionalProps here
      // trigger: 'click',
      interactive: true,
      content: el,
      placement: 'left',
    })
  }
})
</script>

<template>
  <button
    ref="tippyBind" class="menu-item" :class="{ 'is-active': isActive ? isActive() : false }" :title="title"
    :style="{ top: isActive ? `${menuPos.top}px` : `-1000px`, left: `${menuPos.left}px` }" @click="action"
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

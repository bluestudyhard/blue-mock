<!--
 * new page
 * @author: blue
 * @since: 2024-03-04
 * MenuBar.vue
-->

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import remixiconUrl from '/remixicon.symbol.svg'

const props = defineProps<{
  editor: Editor
}>()
// defineEmits(['action'])
const { menuActionList } = initMenuList(props.editor)

const menus = menuList.map((item) => {
  const title = item.title
  const itemInActionList = menuActionList.find(actionItem => actionItem.title === title)

  return {
    title,
    icon: item.icon,
    action: itemInActionList?.action || (() => {}), // 这样就不会报类型错误了
    isActive: itemInActionList?.isActive || (() => false),
  }
})
</script>

<template>
  <div class="h-30 w-20 container">
    <div flex w="40" class="flex-wrap">
      <!-- is-active 是一个 CSS 类，它会根据后面的表达式的结果动态地添加或移除。表达式 item.isActive ? item.isActive() : false 是一个三元运算符，它会检查 item.isActive 是否存在并且是一个函数。如果是，那么它会调用 item.isActive() 函数并返回结果；如果不是，那么它会返回 false。 -->
      <button
        v-for="(item, index) in menus"
        :key="index"
        :class="{ 'is-active': item.isActive() }"
        class="menu-item-bar"
        :title="item.title"
        @click="() => {
          item.action()
        }"
      >
        <svg class="remix">
          <use :xlink:href="`${remixiconUrl}#ri-${item.icon}`" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-item-bar {
  background: #f6f9f9;
  color: #252525;
  border: none;
  border-radius: 0.4rem;

  cursor: pointer;
  height: 1.75rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  width: 1.75rem;

  svg {
    fill: currentColor;
    height: 100%;
    width: 100%;
  }

  &.is-active,
  &:hover {
    color: #4177f4;
    background-color: #e0e9ff;
  }
}
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
</style>

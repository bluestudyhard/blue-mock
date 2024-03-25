import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import * as Y from 'yjs'
import { useEditor } from '@tiptap/vue-3'
import type { EditorView } from 'prosemirror-view'
import type { EditorState } from 'prosemirror-state'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Collaboration from '@tiptap/extension-collaboration'
import { BubbleMenu } from '@tiptap/extension-bubble-menu'

export function getEditor(
  isScrolling: Ref<boolean>,
  tippyBind: Ref<HTMLElement>,
  menuPost: Ref<{ top: number, left: number }>,
  curIcon: Ref<string>,
) {
  const ydoc = new Y.Doc()

  const editor = useEditor({
    content: `
   
        `,
    extensions: [
      StarterKit,
      TaskList,
      Highlight,
      TaskItem,
      BubbleMenu.configure({
        element: document.querySelector('.bubble-menu') as HTMLElement,
        tippyOptions: {
          placement: 'right-start',
          offset: [0, 20],
        },
      }),
      Typography,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-empty',
        considerAnyAsEmpty: true,
        placeholder: 'write something...',
      }),
      Collaboration.configure({
        document: ydoc,
      }),
    ],
    editable: true, // 是否可编辑
    autofocus: true, // 自动聚焦 就是页面开始时光标会在编辑器中 start在开头 end在结尾  all 选择整个文档
    // 输入规则

    onSelectionUpdate: (e) => {
      isScrolling.value = false
      tippyBind.value.style.display = 'flex'
      handleActiveNodeType()
      handleNodePostion()
    },
    onCreate: () => {
      initMenuItemPost()
    },
  })

  /**
   * @description 获取tippymenu的初始位置
   */
  function initMenuItemPost() {
    const view = editor?.value?.view as EditorView

    // 初始时拿到编辑器第一行的p标签的坐标
    const initPost = view.coordsAtPos(1)

    menuPost.value.top = initPost.top
    menuPost.value.left = initPost.left - 35
  }
  /**
   * @description 获取当前选中的节点类型 并设置icon 手动isActive
   */
  function handleActiveNodeType() {
    const state = editor?.value?.state as EditorState
    const selection = state.selection
    const { from: startPos, to: endPos } = selection

    let _cnt = 0
    let firstType = ''
    let lastType = ''
    let level: number | undefined
    state.doc.nodesBetween(startPos, endPos, (node) => {
      if (!level)
        level = node.attrs.level

      // console.log(node)
      if (_cnt === 0)
        firstType = node.type.name
      else
        lastType = node.type.name

      _cnt++
    })
    let type = lastType
    if (lastType === 'paragraph' || lastType === '' || lastType === 'text')
      type = firstType

    // console.log(type, level)
    if (type === 'paragraph') {
      curIcon.value = 'paragraph'
    }
    else {
      curIcon.value = menuList.find(({ attrs }) => {
        return attrs?.level === level && attrs?.type === type
      })?.icon || 'paragraph'
    }
  }
  /**
   * @description 获取每一行编辑器选中的节点的位置
   */
  function handleNodePostion() {
    const state = editor?.value?.state as EditorState
    const selection = state.selection
    const { from: startPos } = selection
    // 获取编辑器的视图
    const view = editor?.value?.view as EditorView
    const editorElement = view.dom
    // 初始时拿到编辑器第一行的p标签的坐标

    // 获取编辑器的左边距
    const editorleft = editorElement.offsetLeft
    menuPost.value.left = editorleft - 30

    // 获取选中元素的坐标
    const startCoords = view.coordsAtPos(startPos)

    menuPost.value.top = startCoords.top
  }

  return {
    editor,
    ydoc,
  }
}

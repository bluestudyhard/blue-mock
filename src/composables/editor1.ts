import StarterKit from '@tiptap/starter-kit'
import type { Editor } from '@tiptap/vue-3'
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

export function initEditor() {
  const editor = useEditor({
    content: `
       
            `,
    extensions: [
      StarterKit,
      TaskList,
      Highlight,
      TaskItem,

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
  }) as Ref<Editor>
}

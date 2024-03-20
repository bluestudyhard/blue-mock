import type { Editor } from '@tiptap/vue-3'

export interface MenuAttr {
  type: 'paragraph' | 'heading' | 'blockquote' | 'orderedList' | 'bulletList' | 'taskList' | 'codeBlock'
  level?: number
}

export interface MenuItem {
  icon: string
  title: string
  attrs?: MenuAttr
}

interface MenuItemWithAction {
  title: string
  action: () => void
  isActive?: () => boolean
}
export const menuList: MenuItem[] = [
  {
    icon: 'bold',
    title: 'Bold',
    attrs: { type: 'paragraph' },
  },
  {
    icon: 'italic',
    title: 'Italic',
    attrs: { type: 'paragraph' },
  },
  {
    icon: 'strikethrough',
    title: 'Strike',
    attrs: { type: 'paragraph' },
  },
  {
    icon: 'code-view',
    title: 'Code',
    attrs: { type: 'paragraph' },
  },
  {
    icon: 'mark-pen-line',
    title: 'Highlight',
    attrs: { type: 'paragraph' },
  },
  {
    icon: 'h-1',
    title: 'Heading 1',
    attrs: { type: 'heading', level: 1 },
  },
  {
    icon: 'h-2',
    title: 'heading 2',
    attrs: { type: 'heading', level: 2 },
  },
  {
    icon: 'h-3',
    title: 'heading 3',
    attrs: { type: 'heading', level: 3 },
  },
  {
    icon: 'paragraph',
    title: 'Paragraph',
    attrs: { type: 'paragraph' },
  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    attrs: { type: 'bulletList' },
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    attrs: { type: 'orderedList' },
  },
  {
    icon: 'list-check-2',
    title: 'Task List',
    attrs: { type: 'taskList' },
  },
  {
    icon: 'code-box-line',
    title: 'Code Block',
    attrs: { type: 'codeBlock' },
  },
  {
    icon: 'double-quotes-r',
    title: 'Blockquote',
    attrs: { type: 'blockquote' },
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    attrs: { type: 'blockquote' },
  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    attrs: { type: 'paragraph' },
  },
  {
    icon: 'text-wrap',
    title: 'Hard Break',
    attrs: { type: 'paragraph' },
  },
  {
    icon: 'align-left',
    title: 'text-align-left',
  },
  {
    icon: 'align-center',
    title: 'text-align-center',
  },
  {
    icon: 'align-right',
    title: 'text-align-right',
  },
  {
    icon: 'format-clear',
    title: 'Clear Format',
  },
  {
    icon: 'arrow-go-back-line',
    title: 'Undo',
  },
  {
    icon: 'arrow-go-forward-line',
    title: 'Redo',
  },
]
export function initMenuList(editor: Editor) {
  const menuActionList: MenuItemWithAction[] = [
    {
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      title: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      title: 'Highlight',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      title: 'heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      title: 'heading 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      title: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      title: 'Task List',
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskList'),
    },
    {
      title: 'Code Block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      title: 'text-align-left',
      action: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: () => editor.isActive('textAlign', 'left'),
    },
    {
      title: 'text-align-center',
      action: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: () => editor.isActive('textAlign', 'center'),

    },
    {
      title: 'text-align-right',
      action: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: () => editor.isActive('textAlign', 'right'),
    },
    {
      title: 'Horizontal Rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      title: 'Hard Break',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      title: 'Clear Format',
      action: () => editor.chain()
        .focus()
        .clearNodes()
        .unsetAllMarks()
        .run(),
    },
    {
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
  ]

  return {
    menuList,
    menuActionList,
  }
}

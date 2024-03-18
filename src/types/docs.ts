interface paragraph {
  type: string
  content: { type: string, text: string }[]
}

export interface docType {
  type: string
  content: paragraph[]
}

export interface docsListType {
  name: string
  size: number
  created_at?: string
  updated_at?: string
}

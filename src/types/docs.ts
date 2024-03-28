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

interface docsToolBarItem {
  name: string
  description: string
  method?: any
}
export interface docsToolBarType {
  name: string
  description: string
  icon: string
  color: string
  dropDownMenu?: docsToolBarItem[]
}

export interface docsListDeleteType {
  // 状态码
  code: number
}

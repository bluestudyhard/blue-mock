import type { docsListDeleteType, docsListType } from '~/types'
import { createService } from '~/utils/request'

const api = {
  DOCUMENTS: 'tiptap/documents/',
}
const {
  VITE_APP_USER_SECRET: appSecret,
} = import.meta.env

const service = createService(api.DOCUMENTS)

export async function getDocsList() {
  const res = await service.get<docsListType[]>('', {
    headers: {
      Authorization: appSecret,
    },
  })

  return res.data
}

export async function _createDoc(name: string) {
  const res = await service.post<docsListType>('', {
    name,
  }, {
    headers: {
      Authorization: appSecret,
    },
  })

  return res.data
}

// 删除文档根据文件名
export async function _deleteDoc(name: string) {
  console.log(name)
  try {
    // 查看实际请求地址
    console.log(`${api.DOCUMENTS}${name}`)
    const res = await service.delete<docsListDeleteType>(`${name}`, {
      headers: {
        Authorization: appSecret,
      },
    })
    console.log(res)
    // return res.data
  }
  catch (e) {
    console.log(e)
  }
}

import type { docsListType } from '~/types'
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

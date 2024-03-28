import type { docsListType } from '~/types/index'
import { _deleteDoc, getDocsList as _getDocsList } from '~/service/docsService'

const useDocsStore = defineStore({
  id: 'docs',
  state: () => ({
    docsList: [] as docsListType[],
  }),
  actions: {
    async getDocsList() {
      if (this.docsList.length > 0)
        return this.docsList

      const res = await _getDocsList()
      this.docsList = res
    },
    // 增删改查时，更新docsList
    async updateDocsList() {
      // const res = await _getDocsList()

    },
    // 删除文档根据文件名
    async deleteDoc(name: string) {
      // await _deleteDoc(name)
      const success = this.docsList = this.docsList.filter(doc => doc.name !== name)
      if (success.length > 0)
        console.log('success', success)
      else console.log('fail')
      // this.updateDocsList()
    },
    async createDoc(name: string) {
      this.docsList.push({
        name,
        size: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    },
  },
  // 持久化
  persist: {
    storage: persistedState.localStorage,
  },
})

export default useDocsStore

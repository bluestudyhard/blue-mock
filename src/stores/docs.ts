import type { docsListType } from '~/types/index'
import { getDocsList as _getDocsList } from '~/service/docsService'

const useDocsStore = defineStore({
  id: 'docs',
  state: () => ({
    docsList: [] as docsListType[],
  }),
  actions: {
    async getDocsList() {
      console.log('length', this.docsList.length)
      // if (this.docsList.length > 1)
      //   return
      const res = await _getDocsList()
      this.docsList = res
    },
  },
  // 持久化
  persist: true,
})

export default useDocsStore

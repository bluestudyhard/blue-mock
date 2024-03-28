import type { docsToolBarType } from '~/types'
import useDocsStore from '~/stores/docs'

async function docsCreateNewDoc(name: string) {
  const docsStore = useDocsStore()
  await docsStore.createDoc(name)
}

export const docsToolBar = [
  {
    name: '新建',
    description: '新建文档开始协作',
    icon: 'ElIconDocumentAdd',
    color: '#5083FB',
    dropDownMenu: [
      {
        name: '新建文档',
        description: '新建一个文档',
        method: (name: string) => docsCreateNewDoc(name),
      },
      {
        name: '新建文件夹',
        description: '新建一个文件夹',
      },
    ],
  },
  {
    name: '上传',
    description: '上传本地文件',
    icon: 'ElIconUploadFilled',
    color: '#FF811A',
    dropDownMenu: [
      {
        name: '上传文件',
        description: '上传本地文件',
        method: () => console.log('上传文件'),
      },
      {
        name: '上传文件夹',
        description: '上传本地文件夹',
      },
    ],
  },
] as docsToolBarType[]

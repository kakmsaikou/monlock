// 存放全局变量
declare module '*.svg' {
  const content: string;
  export default content;
}

type RecordItem = {
  type: string,
  tags: string[],
  notes: string,
  amount: number | undefined
  createdAt?: Date
}

type Tag = {
  id: string,
  name: string
}

type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => string
  update: (id: string, name: string) => string
  remove: (id: string) => boolean
  save: () => void
}

interface Window {
  tagList: Tag[],
  createTag: (name: string) => void
  removeTag: (id: string) => boolean
  updateTag: TagListModel['update']
  findTag: (id: string) => Tag | undefined
  recordList: RecordItem[]
  createRecord: (record: RecordItem) => void
}
// 存放全局变量
declare module '*.svg' {
  const content: string;
  export default content;
}

type RecordItem = {
  type: string,
  tag: Tag,
  notes: string,
  amount: number | undefined
  createdAt?: string
}

type Tag = {
  id: string,
  name: string,
  icon: string
}

type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => string
  update: (id: string, name: string) => string
  remove: (id: string) => boolean
  save: () => void
}

type RootState = {
  recordList:RecordItem[],
  tagList: Tag[],
  currentTag?: Tag
  createRecordError: Error | null
  createTagError: Error | null
}

// interface Window {
// }
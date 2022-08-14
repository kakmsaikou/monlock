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
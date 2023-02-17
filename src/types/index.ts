export type Category = {
  id?: string,
  title: string,
  limit: number,
  progressPercent?: number,
  progressColor?: string,
  spend?: number,
}

export type Record = {
  categoryId: string | null | undefined,
  amount: number,
  description: string,
  type: string,
  date: string,
}
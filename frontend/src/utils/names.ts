export function getCategoryName(category: string): string {
  return (
    {
      note: '记录',
      lookback: '回顾',
      programming: '编程',
      tutorial: '教程',
    }[category] || category
  )
}

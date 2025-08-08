export function getCategoryName(category: string): string {
  return (
    {
      programming: '编程',
    }[category] || category
  )
}

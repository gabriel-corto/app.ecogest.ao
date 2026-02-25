export const useDateFormatter = (date: string | Date) => {
  const formatter = Intl.DateTimeFormat('pt', {
    hour: '2-digit',
    month: '2-digit',
    day: '2-digit',
    minute: '2-digit',
    year: 'numeric',
  })

  const stringToDate = new Date(date)
  return formatter.format(stringToDate)
}

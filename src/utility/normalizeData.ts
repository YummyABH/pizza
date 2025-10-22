export function normalizeTime(time: string) {
  const date = new Date(time)
  const pad = (n: number) => n.toString().padStart(2, '0')
  const formatted = `${pad(date.getHours())}:${pad(date.getMinutes())} ${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  return formatted
}

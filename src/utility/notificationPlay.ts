export const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3')
  audio.volume = 1
  audio.play().catch((e) => console.log('Не удалось воспроизвести звук:', e))
}

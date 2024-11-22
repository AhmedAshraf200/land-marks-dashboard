export const calculateTimeDifference = (createdAt: Date): string => {
  const now = new Date()
  const difference = now.getTime() - createdAt.getTime()

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

  let result = ''

  if (days >= 1) {
    result += `${days} days `
  }

  if (hours >= 1 || result !== '') {
    result += `${hours} h `
  }

  result += `${minutes} min ago`

  return result
}

export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function getNumberAsked(user) {
  return user.questions.length
}

export function getNumberAnswered(user) {
  return Object.keys(user.answers).length
}

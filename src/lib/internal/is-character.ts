export function isCharacter(value: string) {
  return /^[A-Za-z0-9]$/.test(value)
}
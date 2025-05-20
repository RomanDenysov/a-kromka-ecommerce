export function getInitials(name: string) {
  if (name.length === 0) {
    return null;
  }

  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function formatDate(value: Date | string): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString();
}

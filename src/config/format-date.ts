export function formatDate(date: Date): string {
  const options: any = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return date.toLocaleString("es-ES", options);
}

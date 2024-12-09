import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(date: Date): string {
  const adjustedDate = new Date(date);

  const options: any = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Santiago",
  };

  return format(adjustedDate, "PPPPpp", { locale: es });
}

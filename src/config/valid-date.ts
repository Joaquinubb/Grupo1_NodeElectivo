/**
 * Valida si una fecha está en formato ISO 8601.
 * @param date - La fecha a validar.
 * @returns true si la fecha está en formato ISO 8601, false en caso contrario.
 */
export function ValidDate(date: string): boolean {
  // Expresión regular para validar el formato ISO 8601
  const isoDateRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
  return isoDateRegex.test(date);
}

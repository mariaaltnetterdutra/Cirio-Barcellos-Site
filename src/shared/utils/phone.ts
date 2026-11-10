const MAX_DIGITS = 11;
const MIN_DIGITS = 10;
const MIN_AREA_CODE = 11;
const MOBILE_FIRST_DIGIT = "9";

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, MAX_DIGITS);
}

export function formatWhatsApp(value: string): string {
  const digits = onlyDigits(value);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const number = digits.slice(2);
  const isMobile = number.startsWith(MOBILE_FIRST_DIGIT);

  if (isMobile) {
    const tail = number.slice(1);
    const middle = tail.slice(0, 4);
    const end = tail.slice(4);
    return `(${areaCode}) ${number[0]}${middle ? ` ${middle}` : ""}${end ? `-${end}` : ""}`;
  }

  const middle = number.slice(0, 4);
  const end = number.slice(4);
  return `(${areaCode}) ${middle}${end ? `-${end}` : ""}`;
}

export function isValidWhatsApp(digits: string): boolean {
  if (!/^\d+$/.test(digits)) return false;
  if (digits.length < MIN_DIGITS || digits.length > MAX_DIGITS) return false;
  return Number(digits.slice(0, 2)) >= MIN_AREA_CODE;
}

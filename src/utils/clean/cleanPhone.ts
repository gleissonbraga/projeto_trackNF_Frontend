export default function cleanPhone(phone: string | number): string {
  return phone.toString().replace(/\D/g, "");
}
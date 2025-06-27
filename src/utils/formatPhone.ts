export default function formatPhone(phone: string | number): string {
  const cleaned = phone.toString().replace(/\D/g, ""); // remove tudo que não é número
  return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}
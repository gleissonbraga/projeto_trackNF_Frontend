export function cleanCPF(value: string) {
  return value.replace(/\D/g, "");
}
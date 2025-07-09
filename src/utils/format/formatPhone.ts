export default function formatPhone(value: string): string {
  return value
    .replace(/\D/g, "") // Remove tudo que não for número
    .replace(/^(\d{2})(\d)/, "($1) $2") // Coloca parênteses e espaço
    .replace(/(\d{5})(\d{1,4})/, "$1-$2") // Coloca hífen
    .slice(0, 15); // Limita o número de caracteres
}
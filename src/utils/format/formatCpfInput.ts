export function formatCPFInput(value: string) {
  return value
    .replace(/\D/g, "")               // remove tudo que não for número
    .replace(/^(\d{3})(\d)/, "$1.$2")            // insere o primeiro ponto
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3") // insere o segundo ponto
    .replace(/\.(\d{3})(\d)/, ".$1-$2")          // insere o hífen
    .slice(0, 14);                                // limita a 14 caracteres (CPF formatado)
}
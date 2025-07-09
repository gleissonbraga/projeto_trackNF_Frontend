export  function formatCNPJInput(value: string) {
    return value
      .replace(/\D/g, "") // remove tudo que não for número
      .replace(/^(\d{2})(\d)/, "$1.$2") // insere o primeiro ponto
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // insere o segundo ponto
      .replace(/\.(\d{3})(\d)/, ".$1/$2") // insere a barra
      .replace(/(\d{4})(\d)/, "$1-$2") // insere o hífen
      .slice(0, 18); // limita a 18 caracteres
  }


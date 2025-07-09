export  function cleanCNPJ(value: string) {
    return value.replace(/\D/g, "");
  }

function cleanMoney(money: string): number {
  const cleaned = money.replace(/\D/g, ''); // remove tudo que não é dígito
  return Number(cleaned);
}
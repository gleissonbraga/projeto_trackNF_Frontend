export default function formatMoney(money: number) {
  const formated = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(money);
  return formated;
}

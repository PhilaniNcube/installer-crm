// write a function that takes in a number and returns a string and formats it as a currency string

export default function formatCurrency(value:number) {
  return value.toLocaleString("en-ZA", {
    style: "currency",
    currency: "ZAR",
  });
}



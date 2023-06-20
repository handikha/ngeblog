export default function formatNumber(number) {
  const formatNumber = new Intl.NumberFormat("en-US");
  return formatNumber.format(number);
}

export const numFormatter = (number) => {

  if(number <= 0) return 0;
  if(number < 1000) return number;

  const SYMBOL = ["", "K", "M", "G", "T", "P", "E"];

  const num = Math.abs(number);
  const tier = Math.log10(num) / 3 | 0;

  if(tier == 0) return Number;

  const suffix = SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  return scaled.toFixed(1).replace(/\.0$/, '') + suffix;
}
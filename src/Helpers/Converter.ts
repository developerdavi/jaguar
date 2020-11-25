export function toWei(value: number): number {
  return value * 10 ** 18;
}

export function toEther(value: number): number {
  return value * 10 ** -18;
}

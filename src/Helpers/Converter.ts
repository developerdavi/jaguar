export function toWei(value: number): string {
  return (value * 10 ** 18).toString();
}

export function toEther(value: number): number {
  return value * 10 ** -18;
}

export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(value);
};

export const distanceFormat = (mileages: any) => {
  const distance = mileages?._sum?.mileageEnd - mileages?._sum?.mileageStart;
  return `${distance} KM`;
};

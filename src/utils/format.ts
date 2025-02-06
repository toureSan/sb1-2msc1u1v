export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}/hr`
}

export const formatRating = (rating: number): string => {
  return rating.toFixed(1)
}
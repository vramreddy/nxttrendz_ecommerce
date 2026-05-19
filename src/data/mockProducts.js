const createImageUrl = label =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="img" aria-label="${label}">
      <rect width="640" height="420" rx="28" fill="#e2e8f0" />
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#475569" font-family="Arial, sans-serif" font-size="34" font-weight="700">${label}</text>
    </svg>
  `)}`

const mockProducts = [
  {
    id: '1001',
    title: 'Classic Cotton Shirt',
    brand: 'Ram Apparel',
    price: 799,
    rating: 4.5,
    categoryId: '1',
    availability: 'In Stock',
    description: 'A breathable everyday shirt built for comfort and easy styling.',
    totalReviews: 128,
    imageUrl: createImageUrl('Cotton Shirt'),
  },
  {
    id: '1002',
    title: 'Wireless Headphones',
    brand: 'Sound Nova',
    price: 2499,
    rating: 4.2,
    categoryId: '2',
    availability: 'In Stock',
    description: 'Lightweight over-ear headphones with deep bass and all-day battery life.',
    totalReviews: 96,
    imageUrl: createImageUrl('Headphones'),
  },
  {
    id: '1003',
    title: 'Air Fryer XL',
    brand: 'Kitchen Pulse',
    price: 4999,
    rating: 4.8,
    categoryId: '3',
    availability: 'In Stock',
    description: 'Crispy results with less oil. Great for fries, snacks, and quick meals.',
    totalReviews: 214,
    imageUrl: createImageUrl('Air Fryer'),
  },
  {
    id: '1004',
    title: 'Organic Basmati Rice',
    brand: 'Green Basket',
    price: 699,
    rating: 4.1,
    categoryId: '4',
    availability: 'In Stock',
    description: 'Premium long-grain rice with a fragrant aroma and fluffy texture.',
    totalReviews: 58,
    imageUrl: createImageUrl('Basmati Rice'),
  },
  {
    id: '1005',
    title: 'Building Blocks Set',
    brand: 'Tiny Genius',
    price: 1299,
    rating: 4.6,
    categoryId: '5',
    availability: 'In Stock',
    description: 'Colorful blocks that encourage imagination, coordination, and creative play.',
    totalReviews: 83,
    imageUrl: createImageUrl('Blocks'),
  },
  {
    id: '1006',
    title: 'Slim Fit Jeans',
    brand: 'Urban Thread',
    price: 1599,
    rating: 3.9,
    categoryId: '1',
    availability: 'In Stock',
    description: 'A versatile slim fit denim jean that pairs with almost anything.',
    totalReviews: 74,
    imageUrl: createImageUrl('Slim Jeans'),
  },
]

export const getFilteredProducts = ({
  activeOptionId,
  activeCategoryId,
  searchInput,
  activeRatingId,
} = {}) => {
  const normalizedSearch = searchInput.trim().toLowerCase()

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory =
      activeCategoryId === '' || product.categoryId === activeCategoryId
    const matchesRating =
      activeRatingId === '' || product.rating >= Number(activeRatingId)
    const matchesSearch =
      normalizedSearch === '' ||
      product.title.toLowerCase().includes(normalizedSearch)

    return matchesCategory && matchesRating && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((firstProduct, secondProduct) => {
    if (activeOptionId === 'PRICE_LOW') {
      return firstProduct.price - secondProduct.price
    }

    return secondProduct.price - firstProduct.price
  })

  return sortedProducts
}

export const getProductById = id =>
  mockProducts.find(product => product.id === id) ?? null

export const getSimilarProductsById = id => {
  const product = getProductById(id)
  if (product === null) {
    return []
  }

  const similarProducts = mockProducts
    .filter(
      eachProduct => eachProduct.id !== id && eachProduct.categoryId === product.categoryId,
    )
    .slice(0, 4)

  if (similarProducts.length > 0) {
    return similarProducts
  }

  return mockProducts.filter(eachProduct => eachProduct.id !== id).slice(0, 4)
}

export default mockProducts
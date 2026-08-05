import { Product } from '../../products/models/product.model';
import { HomeProductCard } from '../components/product-showcase/product-showcase';

export function mapProductToCard(product: Product): HomeProductCard {
  return {
    id: product.id,
    name: product.productName,
    price: `Rs ${product.sellingPrice}`,
    image: getLocalImage(product.productName, product.genericName),
    vendorName: undefined,
    strength: product.strength,
    form: product.dosageForm,
    quantity: String(product.stockQuantity),
  };
}

function getLocalImage(productName?: string, genericName?: string): string | null {
  const key = `${productName ?? ''} ${genericName ?? ''}`.trim().toLowerCase();

  if (key.includes('paracetamol') || key.includes('acetaminophen')) {
    return '/assets/Paracetamol.jpg';
  }
  if (key.includes('brufin') || key.includes('ibuprofen')) {
    return '/assets/Brufin.jpg';
  }
  if (key.includes('lisinopril')) {
    return '/assets/Lisinopril.jpg';
  }
  if (key.includes('albuterol')) {
    return '/assets/Albuterol.jpg';
  }
  if (key.includes('metformin')) {
    return '/assets/Metformin.webp';
  }

  // Temporary fallback until backend provides imageUrl
  return '/assets/Paracetamol.jpg';
}

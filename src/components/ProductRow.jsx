import ProductCardComponent from './ProductCardComponent';

export default function ProductRow({ products }) {
  return (
    <div className="product-row">
      {products.map(p => (
        <ProductCardComponent 
          key={p.id} 
          product={p} 
        />
      ))}
    </div>
  );
}

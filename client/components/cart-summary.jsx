import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(items) {
  let total = 0;
  return (
    <div className="row justify-content-center">
      <a onClick={() => this.props.setView('catalog', {})} className="my-2 back text-muted">&lt; Back to catalog</a>
      <h2>My Cart</h2>
      {
        items.map(product => {
          total = total + product.price;
          return (
            <CartSummaryItem
              key={product.productId}
              img={product.image}
              name={product.name}
              price={product.price}
              short={product.shortDescription}
            />
          );
        })
      }
      <h3>Item Total:${total}</h3>
    </div>
  );
}

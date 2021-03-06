import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  let total = 0;
  let body = null;
  if (props.items.length === 0) {
    body = <div className="row mb-3">
      <p className="col-12">Your Cart is currently empty! Go checkout our catalog!</p>
      <h3 className="col-12">Item Total: ${total}</h3>
    </div>;
  } else {
    body = <div className="row mb-3">
      {
        props.items.map(product => {
          total = total + product.price;
          return (
            <CartSummaryItem
              key={product.cartItemId}
              img={product.image}
              name={product.name}
              price={product.price}
              short={product.shortDescription}
            />
          );
        })
      }
      <div className="row col-12 py-4 justify-content-between">
        <h3 className="col-3">Item Total: ${total}</h3>
        <button onClick={() => props.setView('checkout', { total: total })} className="col-2 btn btn-primary">Checkout</button>
      </div>
    </div>;
  }
  return (
    <div className="container">
      <a onClick={() => props.setView('catalog', {})} className="row my-3 back text-muted">&lt; Back to catalog</a>
      <h2 className="row mb-4">My Cart</h2>
      {body}
    </div>
  );
}

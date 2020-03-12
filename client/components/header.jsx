import React from 'react';

export default function Header(props) {
  let itemText = '';
  if (props.cartItemCount === 1) {
    itemText = 'item';
  } else {
    itemText = 'items';
  }
  return (
    <div className="row justify-content-between pt-2 pb-1 bg-dark">
      <div className="row col-3 ml-3">
        <i className="fas fa-dollar-sign fa-lg mt-2 mx-1 text-white"></i>
        <h5 className="text-white mt-1">Wicked Sales</h5>
      </div>
      <div className="row col-2">
        <a onClick={() => props.setView('cart', {})}className="text-white back mt-1">{`${props.cartItemCount} ${itemText}`}</a>
        <i className="fas fa-shopping-cart fa-2x text-white"></i>
      </div>
    </div>
  );
}

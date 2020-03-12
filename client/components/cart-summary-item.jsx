import React from 'react';

export default function CartSummaryItem(item) {
  return (
    <div>
      <div className="row card">
        <div>
          <img className="card-image" src={item.img} alt={item.short}/>
        </div>
        <div>
          <h5 className="card-title">{item.name}</h5>
          <p>${item.price}</p>
          <p className="card-text">{item.short}</p>
        </div>
      </div>
    </div>
  );
}

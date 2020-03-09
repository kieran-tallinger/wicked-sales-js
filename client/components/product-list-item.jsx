import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="card">
      <img src={props.img} alt={props.short}/>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p>${props.price}</p>
        <p className="card-text">{props.short}</p>
      </div>
    </div>
  );
}

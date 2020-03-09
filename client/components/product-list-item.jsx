import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="col-4">
      <div className="card my-2 card-spot">
        <img className="card-img-top card-image" src={props.img} alt={props.short}/>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p>${props.price}</p>
          <p className="card-text">{props.short}</p>
        </div>
      </div>
    </div>
  );
}

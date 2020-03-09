import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="card">
      <img src="../../server/public/images/favicon.png" alt="sample-image"/>
      <div className="card-body">
        <h5 className="card-title">Card Title</h5>
        <p>$0.00</p>
        <p className="card-text">Some sample text as placeholder</p>
      </div>
    </div>
  );
}

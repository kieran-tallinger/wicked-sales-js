import React, { Component } from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {

  }

  render() {
    return (
      <div className="row">
        <div>
          {
            this.state.products.map(student => {
              return (
                <ProductListItem
                  key={student.id}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

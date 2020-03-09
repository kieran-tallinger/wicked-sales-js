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
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        this.setState({
          grades: data
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
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
      </div>

    );
  }
}

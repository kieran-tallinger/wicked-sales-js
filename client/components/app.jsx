import React, { Component } from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="container">
        <Header />
        <ProductList />
      </div>
    );
  }
}

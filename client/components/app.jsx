import React, { Component } from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
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

import React, { Component } from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.checkView = this.checkView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  checkView() {
    if (this.state.view.name === 'catalog') {
      return <ProductList setView={this.setView}/>;
    } else if (this.state.view.name === 'details') {
      return <ProductDetails setView={this.setView} params={this.state.view.params}/>;
    }
  }

  getCartItems() {
    fetch('/api/cart')
      .then(data => {
        this.setState({
          cart: data
        });
      });
  }

  render() {
    const page = this.checkView();
    return (
      <div className="container">
        <Header cartItemCount={this.state.cart.length} />
        {page}
      </div>
    );
  }
}

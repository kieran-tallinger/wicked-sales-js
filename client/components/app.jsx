import React, { Component } from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

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
    this.addToCart = this.addToCart.bind(this);
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
      return <ProductDetails setView={this.setView} addToCart={this.addToCart} params={this.state.view.params}/>;
    } else if (this.state.view.name === 'cart') {
      return <CartSummary setView={this.setView} items={this.state.cart}/>;
    }
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => {
        this.setState({
          cart: data
        });
      });
  }

  addToCart(product) {
    const fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', fetchParams)
      .then(res => res.json())
      .then(data => {
        this.setState({
          cart: this.state.cart.concat(data)
        });
      });
  }

  placeOrder(order) {
    const fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    };
    fetch('/api/orders', fetchParams)
      .then(result => {
        this.setState({
          view: {
            name: 'catalog',
            params: {}
          },
          cart: []
        });
      });
  }

  render() {
    const page = this.checkView();
    return (
      <div className="container">
        <Header setView={this.setView} cartItemCount={this.state.cart.length} />
        {page}
      </div>
    );
  }
}

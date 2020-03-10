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
      }
    };
    this.setView = this.setView.bind(this);
    this.checkView = this.checkView.bind(this);
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
      return <ProductDetails setView={this.setView} params={this.view.params}/>;
    }
  }

  render() {
    const page = this.checkView();
    return (
      <div className="container">
        <Header />
        {page}
      </div>
    );
  }
}

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
    let page = null;
    if (this.state.view.name === 'catalog') {
      page = <ProductList setView={this.setView}/>;
    } else if (this.state.view.name === 'details') {
      page = <ProductDetails />;
    }
    return (
      <div className="container">
        <Header />
        {page}
      </div>
    );
  }
}

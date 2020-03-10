import React, { Component } from 'react';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const id = this.props.params.productId;
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          product: data
        });
      });
  }

  renderCatalog() {
    return (
      <div className="row">
        <a onClick={() => this.props.setView('catalog', {})} className="my-2 back text-muted">&lt; Back to catalog</a>
        <div className="row">
          <img className="col-4 mr-2" src={this.state.product.image} alt={this.state.product.shortDescription} />
          <div className="col-7">
            <h2>{this.state.product.name}</h2>
            <h5 className="text-muted">${this.state.product.price}</h5>
            <p>{this.state.product.shortDescription}</p>
          </div>
          <div className="row">
            <p>{this.state.product.longDescription}</p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { product } = this.state;
    return product ? this.renderCatalog() : (
      <span>Loading details..</span>
    );
  }
}

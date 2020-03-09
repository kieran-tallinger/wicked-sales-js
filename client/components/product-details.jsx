/* eslint-disable */
import React, { Component } from 'react';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount(id) {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          product: data
        });
      });
  }

  render() {
    return (
      null
    );
  }
}

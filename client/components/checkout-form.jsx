import React, { Component } from 'react';

export default class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: 0,
      shippingAddress: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleCardChange(e) {
    this.setState({
      creditCard: e.target.value
    });
  }

  handleAddressChange(e) {
    this.setState({
      shippingAddress: e.target.value
    });
  }

  render() {
    return (
      <div>hi</div>
    );
  }
}

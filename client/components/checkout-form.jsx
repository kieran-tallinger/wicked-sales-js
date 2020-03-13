import React, { Component } from 'react';

export default class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    const newOrder = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.onSubmit(newOrder);
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
  }

  render() {
    return (
      <div className="row mt-3">
        <h2 className="col-12">My Cart</h2>
        <h5 className="col-12 text-muted">Order Total: ${this.props.total}</h5>
        <form className="col-12" onSubmit={this.handleSubmit}>
          <div className="form-row mb-2">
            <label htmlFor="name">Name</label>
            <input
              required
              autoFocus
              id='name'
              type='text'
              placeholder='Please enter name'
              className="form-control"
              value={this.state.name}
              onChange={this.handleNameChange}/>
          </div>
          <div className="form-row mb-2">
            <label htmlFor="credit">Credit Card</label>
            <input
              required
              id='credit'
              type='text'
              placeholder='Please enter card number for order'
              className="form-control"
              value={this.state.creditCard}
              onChange={this.handleCardChange} />
          </div>
          <label htmlFor="address">Shipping Address</label>
          <div className="form-row address-text mb-2">
            <textarea
              required
              id='address'
              placeholder='Please enter address for shipping'
              className="form-control "
              value={this.state.shippingAddress}
              onChange={this.handleAddressChange} />
          </div>
          <div className="row justify-content-between">
            <a onClick={() => this.props.setView('catalog', {})} className="col-3 back text-muted">&lt; Continue Shopping</a>
            <button type='submit' className='col-2 btn btn-primary mr-3'>Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}

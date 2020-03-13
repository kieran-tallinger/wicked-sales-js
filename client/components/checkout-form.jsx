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
      <div className="row">
        <h2>My Cart</h2>
        <h5 className="text-muted">Order Total: </h5>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              required
              autoFocus
              id='name'
              type='text'
              placeholder='Please enter name for order'
              className="form-control"
              value={this.state.name}
              onChange={this.handleNameChange}/>
          </div>
          <div className="form-row">
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
          <div className="form-row">
            <label htmlFor="address">Shipping Address</label>
            <textarea
              required
              id='address'
              placeholder='Please enter card number for order'
              className="form-control"
              value={this.state.creditCard}
              onChange={this.handleAddressChange} />
          </div>
          <div className="row justify-content-between">
            <a onClick={() => this.props.setView('catalog', {})} className="col-3 back text-muted">&lt; Continue Shopping</a>
            <button type='submit' className='col-2 btn btn-primary'>Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}

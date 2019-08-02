import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllProductsThunk, deleteProduct } from '../store/allProducts';
import { addToCartThunk, setCartIdThunk } from '../store/cart';
import { Button } from 'semantic-ui-react';

export class allProducts extends React.Component {
  async componentDidMount() {
    await this.props.fetchProducts();
    await this.props.setCartId(this.props.user.id);
  }

  render() {
    const products = this.props.products;
    console.log('PROPS', this.props);
    return (
      <div>
        <ul id="UsersList">
          {products.map(product => {
            return (
              <li key={product.id}>
                <NavLink to={`products/${product.id}`}>
                  PRODUCT: {product.name}
                  RATING: {products.rating}
                </NavLink>

                <img className="user-image" src={product.imageUrl} />
                <Button
                  type="button"
                  className="addToCart"
                  onClick={() =>
                    this.props.quickAdd({
                      quantity: 1,
                      unitPrice: product.price,
                      productId: product.id,
                      orderId: this.props.cart.id
                    })
                  }
                >
                  QUICK ADD
                </Button>
                <button
                  type="button"
                  onClick={() => this.props.deleteProduct(product.id)}
                >
                  DELETE
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.allProductsReducer,
  user: state.user,
  cart: state.cartReducer
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(getAllProductsThunk()),
  deleteProduct: productId => dispatch(deleteProduct(productId)),
  quickAdd: item => dispatch(addToCartThunk(item)),
  setCartId: id => dispatch(setCartIdThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(allProducts);

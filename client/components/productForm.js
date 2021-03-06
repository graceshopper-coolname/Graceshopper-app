import React from 'react';
import { Form, Message, Container, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  addProductThunk,
  getAllProductsThunk,
  editProductThunk
} from '../store/allProducts';
import { runInThisContext } from 'vm';
import { getCategoriesThunk } from '../store/categories';

class ProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      inventoryQuantity: '',
      availability: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAvailabilityCheckbox = this.handleAvailabilityCheckbox.bind(
      this
    );
    this.handleCategoryCheckbox = this.handleCategoryCheckbox.bind(this);
  }
  componentDidMount() {
    this.props.getCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categories !== this.props.categories) {
      const newCategories = this.props.categories.map(category => {
        const obj = {};
        obj.name = category.name;
        obj.value = false;
        return obj;
      });
      this.setState({ categories: newCategories });
    }

    if (prevProps.product !== this.props.product) {
      const product = this.props.product;
      this.setState({
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        inventoryQuantity: product.inventoryQuantity
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    console.log('inside handle submit');
    event.preventDefault();
    if (this.props.type === 'edit') {
      this.props.editProduct(this.state);
    } else {
      this.props.addProduct(this.state);
    }
    this.setState({
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      inventoryQuantity: '',
      availability: false
    });
  }

  handleAvailabilityCheckbox() {
    this.setState({ availability: !this.state.availability });
  }

  async handleCategoryCheckbox(event) {
    console.log('CLICKED ON', event.target.innerText);
    console.log('STATE.categories', this.state.categories);
    const target = event.target.innerText;
    await this.setState(state => {
      console.log('-------------------');
      console.log('INSIDE SET STATE');
      state.categories.map(cat => {
        if (cat.name === target) {
          console.log('NEW OBJ, ', { category: cat.name, value: !cat.value });
          return { category: cat.name, value: !cat.value };
        } else {
          return { category: cat.name, value: cat.value };
        }
      });
    });
    console.log('AFTER SET STATE');
    console.log('STATE', this.state);
  }

  render() {
    const {
      name,
      description,
      imageUrl,
      price,
      inventoryQuantity,
      availability,
      categories
    } = this.state;
    console.log('this.state', this.state);
    console.log('PRODUCT FORM PROPS IN RENDER', this.props);
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} success={this.state.formSuccess}>
          <Form.Input
            width={10}
            fluid
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />

          <Form.Input
            width={10}
            label="Description"
            placeholder="Tell us more about this product"
            name="description"
            value={description}
            onChange={this.handleChange}
            required
          />

          <Form.Input
            width={10}
            fluid
            label="Image URL"
            placeholder="Image URL"
            required
            name="imageUrl"
            onChange={this.handleChange}
            value={imageUrl}
          />

          <Form.Input
            width={10}
            fluid
            label="Price"
            placeholder="Price"
            value={price}
            name="price"
            onChange={this.handleChange}
            required
          />

          <Form.Input
            width={10}
            fluid
            label="Inventory Quantity"
            placeholder="Quantity"
            name="inventoryQuantity"
            value={inventoryQuantity}
            onChange={this.handleChange}
            required
          />

          {/* <Form.Group widths="equal">
            <label>Categories</label>
            {this.props.categories.map(category => (
              <Form.Checkbox
                key={category.name}
                label={category.name}
                name={category.name}
                value={category.name}
                onChange={this.handleCategoryCheckbox}
              />
            ))}
          </Form.Group> */}
          <Form.Group>
            <Form.Checkbox
              label="Available?"
              name="availability"
              value={availability}
              onChange={this.handleAvailabilityCheckbox}
            />
          </Form.Group>

          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories,
    products: state.allProductsReducer
  };
};
const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProductThunk(product)),
  editProduct: product => dispatch(editProductThunk(product)),
  getCategories: () => dispatch(getCategoriesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);

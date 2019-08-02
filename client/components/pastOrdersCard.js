import React from 'react';

export const PastOrdersCard = props => {
  console.log('PROPs', props);
  console.log('first product', props.order.products[0]);
  // console.log('quantity', props.order.products[0].quantity)
  // console.log('unit price', props.order.products[0].unitPrice)
  return (
    <div>
      <div>PAST ORDERS CARD</div>
      <div>ID: {props.order.id}</div>
      <div>Order placed at: {props.order.createdAt}</div>
      <div>
        Items:
        {props.order.products.map(product => (
          <div>
            <img src={product.imageUrl} />
            <div>Name: {product.name}</div>
            <div>Quantity: {product.ProductOrder.quantity}</div>
            <div>
              Cost:{' '}
              {product.ProductOrder.quantity * product.ProductOrder.unitPrice}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

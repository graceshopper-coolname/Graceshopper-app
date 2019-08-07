import React from 'react';
import { Grid } from 'semantic-ui-react';

export const PastOrdersCard = props => {
  return (
    <div>
      {props.order.products.map(product => (
        <Grid key={product.id}>
          <Grid.Row>
            <Grid.Column width={15}>
              <img src="https://placekitten.com/300/300" />
            </Grid.Column>
            <Grid.Column width={15}>
              <div>Name: {product.name}</div>
              <div>Quantity: {product.ProductOrder.quantity}</div>
              <div>
                Cost:{' '}
                {product.ProductOrder.quantity * product.ProductOrder.unitPrice}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ))}
    </div>
  );
};

import React from 'react';
import { connect } from 'react-redux';
import { getPastOrdersThunk } from '../store/pastOrders';
import { PastOrdersCard } from './PastOrdersCard';
import { Card, Segment, Container } from 'semantic-ui-react';

export class pastOrders extends React.Component {
  async componentDidMount() {
    await this.props.getPastOrders();
  }

  render() {
    const pastOrders = this.props.pastOrders;

    return (
      <div>
        <div>
          <h2>Your past orders:</h2>
        </div>
        <Container>
          <Segment.Group>
            {pastOrders.map(order => (
              <Segment key={order.id}>
                <PastOrdersCard order={order} />
              </Segment>
            ))}
          </Segment.Group>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pastOrders: state.pastOrdersReducer
});

const mapDispatchToProps = dispatch => ({
  getPastOrders: () => dispatch(getPastOrdersThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(pastOrders);

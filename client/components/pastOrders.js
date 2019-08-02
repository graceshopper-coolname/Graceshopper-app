import React from 'react';
import { connect } from 'react-redux';
import { getPastOrdersThunk } from '../store/pastOrders';
import { PastOrdersCard } from './pastOrdersCard';

export class pastOrders extends React.Component {
  async componentDidMount() {
    await this.props.getPastOrders();
  }

  render() {
    console.log('past orders', this.props.pastOrders);
    const pastOrders = this.props.pastOrders;
    return (
      <div>
        <div>
          <h2>Your past orders:</h2>
        </div>
        <div>
          {pastOrders.map(order => (
            <PastOrdersCard key={order.id} order={order} />
          ))}
        </div>
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

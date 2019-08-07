import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Card, Container, Grid, Icon, Image } from 'semantic-ui-react';
import { getAllUsersThunk, deleteUserThunk } from '../store/allUsers';

export class allUsers extends React.Component {
  async componentDidMount() {
    await this.props.fetchUsers();
  }

  handleDelete = (event, userId) => {
    event.preventDefault();
    this.props.deleteUser(userId, '/users');
  };

  render() {
    const users = this.props.users;
    return (
      <div>
        <Card.Group itemsPerRow={4}>
          {users.map(user => {
            console.log('USER', user);
            return (
              <Card>
                <Image src={user.imageUrl} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>
                    <NavLink to={`users/${user.id}`}>
                      {user.firstName} {user.lastName}
                    </NavLink>
                  </Card.Header>
                  <Card.Meta>
                    <span className="date">{user.address}</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content>
                  <Button
                    type="button"
                    className="remove"
                    onClick={event => this.handleDelete(event, user.id)}
                  >
                    DELETE USER
                  </Button>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.allUsersReducer
});

const mapDispatchToProps = dispatch => ({
  deleteUser: userId => dispatch(deleteUserThunk(userId)),
  fetchUsers: () => dispatch(getAllUsersThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(allUsers);

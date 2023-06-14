import React, { Component } from 'react';
import firebase from './Firestore';
import NavBar from './navBar';
import { Container, Jumbotron } from 'react-bootstrap';

class ProtestDocument extends Component {
  constructor(props) {
    super(props);
    this.state = { protestname: '', description: '', location: '', time: '', };
  }

  componentWillMount() {
    let id = this.props.match.params.id
    const db = firebase.firestore();
    const protestRef = db.collection("protest");
    protestRef.doc(id).onSnapshot(docSnapshot => {
      this.setState({ protestname: docSnapshot.data().protestname });
      this.setState({ description: docSnapshot.data().description });
      this.setState({ location: docSnapshot.data().location });
      this.setState({ time: docSnapshot.data().time });
    })

  }
  render() {
    return (
      <div class='protestHeader'>
        <NavBar />
        <Container>
          <Jumbotron>
            <h1>{this.state.protestname}</h1>
            <p>{this.state.description}</p>
            <p>{this.state.location}</p>
            <p>{this.state.time}</p>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default ProtestDocument;

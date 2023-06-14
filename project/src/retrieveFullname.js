import firebase from './Firestore';
import React, { Component } from 'react';
import Login from './Login';

class Fullname extends Component {
  constructor() {
    super();
    this.state = { signedIn: false, currentUser: null, fullname: '' };
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          signedIn: true,
          currentUser: user
        });
        const db = firebase.firestore();
        const userRef = db.collection("users");
        let observer = userRef.doc(user.uid).onSnapshot(docSnapshot => {
          this.setState({ fullname: docSnapshot.data().fullname });
        }, err => {
          console.log('Encountered error: ${err}');
        });
      }
    })
  }

  render() {
    if (this.state.signedIn) {
      return (
        <div>
          {this.state.fullname}
        </div>
      );
    } else {
      return (
        <div>
          <Login />
        </div>
      )
    }
  }
}

export default Fullname;
// getFullname = db => {
//   let doc = db.collection('users').doc(fullname);
//
//   let observer = doc.onSnapshot(docSnapshot => {
//     return docSnapshot
//     console.log('Received doc snapshot: ${docSnapshot}');
//     observer();
//   }, err => {
//     console.log('Encountered error: ${err}')
//   });
// }
//
// getFullname(db)

// getDocuments = db =>{
//   let userRef = db.collection('users').doc(fullname);
//   let getDoc = userRef.get()
//     .then(doc => {
//       if (!doc.exists) {
//         console.log('No such document');
//       } else {
//         console.log('Document data:', doc.data());
//       }
//     })
//     .catch(err => {
//       console.log('Error getting document', err);
//     })
//     return getDoc
// }
//
// console.log(getDocuments(protest))

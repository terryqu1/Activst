import firebase from './Firestore';
import React, { Component } from 'react';
import protest from './protest';

class Location extends Component {
  constructor() {
    super();
    this.state = { signedIn: false, currentUser: null, location: '' };
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({

        });
        const db = firebase.firestore();
        const protestRef = db.collection("protest");
        let rand = db.collection('protest')

        let database = [];
        protestRef.doc().get().then(getDoc => {
          database.push(getDoc.location)
        })

        let observer = protestRef.doc(protestRef.uid).onSnapshot(snapshot => {
          this.setState({ protest: snapshot.data().protest });
        }, err => {
          console.log('Encountered error: ${err}');
        });
      }
    })
  }

  render() {
    return (
      <div>  {this.state.database} </div>
    )
  }
}

export default Location;
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

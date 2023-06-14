import React, {Component} from 'react';
import NavBar from './navBar';
import firebase from './Firestore';

class Welcome extends Component{
  constructor(){
    super();
    this.state = {signedIn: false, currentUser: null, fullname:''};
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          signedIn: true,
          currentUser: user
        });
        const db = firebase.firestore();
        const userRef = db.collection("users");
        console.log(user.uid);
        let observer = userRef.doc(user.uid).onSnapshot(docSnapshot => {
          console.log(docSnapshot.data());
          this.setState({fullname:docSnapshot.data().fullname});
        }, err => {
        });
      }
    })
  }
  render(){
    console.log(this.state.fullname);
    return(
      <div>
      <NavBar />
      <div class='welcome'>
      Welcome to Activst, {this.state.fullname}
      <br />
   <b>    We hope you enjoy your stay! </b>
      </div>
      </div>
    )
  }
}

export default Welcome;

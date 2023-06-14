import React, {Component} from 'react';
import firebase from './Firestore';
import ProtestPage from './ProtestPage';

class ProtestList extends Component {
  constructor(){
    super();
    this.state = {protestComponents:[]};
  }
  componentWillMount(){
    let protests = [];
    const db = firebase.firestore();
    db.collection("protest").get().then((snapshot) => {
      snapshot.forEach((doc) => (
        protests.push({
          protestname: doc.data().protestname,
          description: doc.data().description,
          location: doc.data().location,
          time: doc.data().time,
          keyTerm: doc.data().keyTerm
        })
      ))
      console.log(protests);
      const protestComponents = protests.map(p=>(
        <ProtestPage protestname = {p.protestname}
                     description = {p.description}
                     location = {p.location}
                     time = {p.time}
                     keyTerm = {p.keyTerm}/>
      ));
      this.setState({protestComponents:protestComponents});
    })
  }

    render(){
    return(
      <div>
      here are some protests:
      {this.state.protestComponents}
      </div>
    );
  }
  }

export default ProtestList;

import React, {Component} from 'react';
import './App.css';
import NavBar from './navBar';
import { Container, Row, Col, Image, Jumbotron, Button } from 'react-bootstrap';
import firebase from './Firestore';
import Fullname from './retrieveFullname';
import Biography from './retrieveBiography';
import Editprofile from './Editprofile';

class BetterProfile extends Component{
  constructor() {
    super();
    this.state = {url:"", protestIDs:"", protestnames:[], locations:[], descriptions:[], times:[], loaded: false};
  }
  previewProfileImage( uploader ) {
      //ensure a file was selected
      if (uploader.files && uploader.files[0]) {
          var imageFile = uploader.files[0];
          var reader = new FileReader();
          reader.onload = function (e) {

          }
          reader.readAsDataURL( imageFile );
      }
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          signedIn: true,
          currentUser: user,
        });
        const db = firebase.firestore();
        const userRef = db.collection("users");
        const protestRef = db.collection("protest");

        userRef.doc(user.uid).get().then(getDoc => {
          if (!getDoc.exists) {
            userRef.doc(user.uid).set({
              fullname: user.displayName,
              email: user.email

            });
          }
        });
        userRef.doc(user.uid).onSnapshot(docSnapshot => {
          this.setState({protestIDs: docSnapshot.data().protests});
          if (this.state.protestIDs != null) {
          this.state.protestIDs.forEach(protestID => {
            protestRef.doc(protestID).onSnapshot(docSnapshot => {
              this.setState({ protestnames: [...this.state.protestnames, docSnapshot.data().protestname] });
              this.setState({ descriptions: [...this.state.descriptions, docSnapshot.data().description] });
              this.setState({ locations: [...this.state.locations, docSnapshot.data().location] });
              this.setState({ times: [...this.state.times, docSnapshot.data().time] });
            })
          });
        }
          this.setState({loaded: true})
          console.log(this.state.loaded)
        }, err => {
          console.log('Encountered error: ${err}');
        });
      }
  });
}


updateInput = e => {
  this.setState({
    [e.target.name]: e.target.value
    });
    }

addURL = e => {
  e.preventDefault();
  this.setState({
      url:""
    })
    const db = firebase.firestore();

      db.settings({
        timestampsInSnapshots: true
      });

        const userRef = db.collection("users").add({
        url:this.state.url
        });
  }

  render(){
    if (this.state.loaded === true) {
      console.log(this.state.protestnames)
    const loadProtests = (protestnames,b,c,d) =>{
      for (var i = 0; i < protestnames.length; i++) {
        return(
          <div>
            <p>Created:</p>
            <p>{protestnames[i]}</p>
            <p>{b[i]}</p>
            <p>{c[i]}</p>
            <p>{d[i]}</p>
          </div>
        )
      }

    }
    let protestnames = this.state.protestnames;
    let locations = this.state.locations;
    let descriptions = this.state.descriptions;
    let times = this.state.times;
    for (var i = 0; i < protestnames.length; i++) {
      // return(
      //   <div>
      //     <p>{protestnames[i]}</p>
      //     <p>{descriptions[i]}</p>
      //     <p>{locations[i]}</p>
      //     <p>{times[i]}</p>
      //   </div>
      // )
    }
      return(
      <body>
      <div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3"></script>
        <div>
        <NavBar/>
      <Container>
      <Jumbotron>
        <h1><Fullname/></h1>
        <Row>
          <Col xs={6} md={4}>
            <a href="/"/><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"/>
          </Col>
        </Row>
        <p>
          <Biography />
        </p>
        <p>
          <Button href='/Editprofile'>Edit Profile</Button>
        </p>
        <hr/>
        <h1>Latest Activity:</h1>
        <p>{loadProtests(protestnames,locations,descriptions,times)}</p>

        <p>
        <a class="resp-sharing-button__link"
href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io"
target="_blank" rel="noopener" aria-label="Share on Facebook">
  <div class="resp-sharing-button resp-sharing-button--facebook
resp-sharing-button--large"><div aria-hidden="true"
class="resp-sharing-button__icon resp-sharing-button__icon--circle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24
24"><circle cx="12" cy="12" r="11.5"/><path d="M15.84
9.5H13.5V8.48c0-.53.35-.65.6-.65h1.4v-2.3h-2.35c-2.3 0-2.65 1.7-2.65
2.8V9.5h-2v2h2v7h3v-7h2.1l.24-2z"/></svg>
    </div>Share on Facebook</div>
</a>

<a class="resp-sharing-button__link"
href="https://twitter.com/intent/tweet/?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;url=http%3A%2F%2Fsharingbuttons.io"
target="_blank" rel="noopener" aria-label="Share on Twitter">
  <div class="resp-sharing-button resp-sharing-button--twitter
resp-sharing-button--large"><div aria-hidden="true"
class="resp-sharing-button__icon resp-sharing-button__icon--circle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
d="M18.5 7.4l-2 .2c-.4-.5-1-.8-2-.8C13.3 6.8 12 8 12 9.4v.6c-2
0-4-1-5.4-2.7-.2.4-.3.8-.3 1.3 0 1 .4 1.7 1.2 2.2-.5 0-1 0-1.2-.3 0
1.3 1 2.3 2 2.6-.3.4-.7.4-1 0 .2 1.4 1.2 2 2.3 2-1 1-2.5 1.4-4 1 1.3 1
2.7 1.4 4.2 1.4 4.8 0 7.5-4 7.5-7.5v-.4c.5-.4.8-1.5 1.2-2z"/><circle
cx="12" cy="12" r="11.5"/></svg>
    </div>Share on Twitter</div>
</a>

<a class="resp-sharing-button__link"
href="https://plus.google.com/share?url=http%3A%2F%2Fsharingbuttons.io"
target="_blank" rel="noopener" aria-label="Share on Google+">
  <div class="resp-sharing-button resp-sharing-button--google
resp-sharing-button--large"><div aria-hidden="true"
class="resp-sharing-button__icon resp-sharing-button__icon--circle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24
24"><circle cx="12" cy="12" r="11.5"/><ellipse cx="10.24" cy="8.5"
transform="rotate(-45 10.234 8.5)" rx="2.89" ry="3.08"/><path d="M9.85
5.5h4.2"/><ellipse cx="10.24" cy="16.32" rx="4.48" ry="2.59"/><path
d="M11.85 11.1c-.93 2.35 2.86 1.64 2.86 5.22M17.5 7v5M20
9.5h-5"/></svg>
    </div>Share on Google+</div>
</a>

<a class="resp-sharing-button__link"
href="https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;caption=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;content=http%3A%2F%2Fsharingbuttons.io&amp;canonicalUrl=http%3A%2F%2Fsharingbuttons.io&amp;shareSource=tumblr_share_button"
target="_blank" rel="noopener" aria-label="Share on Tumblr">
  <div class="resp-sharing-button resp-sharing-button--tumblr
resp-sharing-button--large"><div aria-hidden="true"
class="resp-sharing-button__icon resp-sharing-button__icon--circle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24
24"><circle cx="12" cy="12" r="11.5"/><path d="M12.5
4.5v3h2v2h-2v3.72c0 2.47 1.48 2.7 3 1.7v2.7c-4.1
1.92-6-.62-6-3.6V9.5h-2V8.14c.55-.18 1.24-.43
1.63-.77.4-.33.7-.73.94-1.2.24-.46.4-.95.5-1.67h1.93z"/></svg>
    </div>Share on Tumblr</div>
</a>

<a class="resp-sharing-button__link"
href="mailto:?subject=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;body=http%3A%2F%2Fsharingbuttons.io"
target="_self" rel="noopener" aria-label="Share by E-Mail">
  <div class="resp-sharing-button resp-sharing-button--email
resp-sharing-button--large"><div aria-hidden="true"
class="resp-sharing-button__icon resp-sharing-button__icon--circle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
d="M19.5 16c0 .8-.7 1.5-1.5 1.5H6c-.8 0-1.5-.7-1.5-1.5V8c0-.8.7-1.5
1.5-1.5h12c.8 0 1.5.7 1.5 1.5v8zm-2-7.5L12 13 6.5 8.5m11 6l-4-2.5m-7
2.5l4-2.5"/><circle cx="12" cy="12" r="11.5"/></svg></div>Share by
E-Mail</div>
</a>

<a class="resp-sharing-button__link"
href="https://pinterest.com/pin/create/button/?url=http%3A%2F%2Fsharingbuttons.io&amp;media=http%3A%2F%2Fsharingbuttons.io&amp;description=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking."
target="_blank" rel="noopener" aria-label="Share on Pinterest">
  <div class="resp-sharing-button resp-sharing-button--pinterest
resp-sharing-button--large"><div aria-hidden="true"
class="resp-sharing-button__icon resp-sharing-button__icon--circle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24
24"><circle cx="12" cy="12" r="11.5"/><path d="M8
11.2c-.15-.32-.25-.72-.25-1.22 0-2.32 1.74-4.4 4.53-4.4 2.47 0 3.82
1.5 3.82 3.52 0 2.64-1.17 4.88-2.9 4.88-.97
0-1.7-.8-1.46-1.77.28-1.14.8-2.4.8-3.23 0-.76-.4-1.38-1.23-1.38-.95
0-1.74 1-1.74 2.37 0 .86.3 1.45.3 1.45l-1.2 5c-.34 1.5-.04 3.33-.02
3.5.02.1.16.15.22.06.1-.12 1.26-1.56 1.66-3l.66-2.53c.32.6 1.25 1.14
2.24 1.14 2.95 0 4.95-2.7 4.95-6.3 0-2.73-2.3-5.27-5.82-5.27-4.36
0-6.57 3.14-6.57 5.75 0 .85.18 1.64.53 2.28l1.5-.8z"/></svg>
    </div>Share on Pinterest</div>
</a>

<a class="resp-sharing-button__link"
href="https://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fsharingbuttons.io&amp;title=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;summary=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;source=http%3A%2F%2Fsharingbuttons.io"
target="_blank" rel="noopener" aria-label="Share on LinkedIn">
  <div class="resp-sharing-button resp-sharing-button--linkedin
resp-sharing-button--large"><div aria-hidden="true"
class="resp-sharing-button__icon resp-sharing-button__icon--circle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24
24"><circle cx="12" cy="12" r="11.5"/><path d="M15 12.5c-.28
0-.5.22-.5.5v3.5h-3s.03-6.48 0-7h3v.83s.46-.75 1.7-.75c1.56 0 2.3 1.12
2.3 3.3v3.62h-3V13c0-.28-.23-.5-.5-.5zm-7.5-3h2v7h-2z"/><circle
cx="8.5" cy="6.5" r="1"/></svg>
    </div>Share on LinkedIn</div>
</a>

<a class="resp-sharing-button__link"
href="https://reddit.com/submit/?url=http%3A%2F%2Fsharingbuttons.io&amp;resubmit=true&amp;title=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking."
target="_blank" rel="noopener" aria-label="Share on Reddit">
  <div class="resp-sharing-button resp-sharing-button--reddit
resp-sharing-button--large"><div aria-hidden="true"
class="resp-sharing-button__icon resp-sharing-button__icon--circle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24
24"><circle cx="12" cy="12" r="11.5"/><ellipse cx="12" cy="14.37"
rx="6.2" ry="4.24"/><path d="M14.3 16.25c-.62.36-1.42.57-2.3.57-.88
0-1.7-.2-2.32-.58"/><circle cx="14.61" cy="13.39" r=".98"/><circle
cx="9.39" cy="13.39" r=".98"/><path d="M16.4 11.38c.26-.55.82-.92
1.47-.92.9 0 1.63.73 1.63 1.63 0 .8-.6 1.47-1.38 1.6"/><circle
cx="17.22" cy="7.52" r="1.63"/><path d="M7.6
11.38c-.26-.54-.82-.92-1.47-.92-.9 0-1.63.73-1.63 1.63 0 .8.6 1.47
1.38 1.6M12 10.12s-.08-4.82 3.6-2.6"/></svg>
    </div>Share on Reddit</div>
</a>

        </p>
      </Jumbotron>
          <footer class="footer">
            <p>© Activst 2019</p>
          </footer>
      </Container>

      </div>
    </body>
    )
      } else {
        return (
          <div class="loading">
            <Container>
              <Jumbotron>
              please wait
              </Jumbotron>
            </Container>
          </div>
        )
      }
    }
}


export default BetterProfile;

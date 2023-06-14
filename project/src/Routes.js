import App from './App';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Login from './Login';
import User from './User';
import Leaderboard from './Leaderboard';
import Protest from './protest';
import About from './About';
import History from './history';
import BetterProfile from './BetterProfile';
import React from 'react';
import Welcome from './Welcome';
import CustomProtestPage from './customProtestPage';
import ProtestList from './ProtestList';
import ProtestDocument from './ProtestDocument';
import Editprofile from './Editprofile';

const Routes = () => (
  <Router>
    <div>
      <Route exact path={"/"} component={() => <App />} />
      <Route exact path={"/login"} component={() => <Login />} />
      <Route exact path={"/user"} component={() => <User />} />
      <Route exact path={"/about"} component={() => <About />} />
      <Route exact path={"/myProfile"} component={() => <BetterProfile />} />
      <Route exact path={"/Leaderboard"} component={() => <Leaderboard />} />
      <Route exact path={"/protest.js"} component={() => <Protest />} />
      <Route exact path={"/history"} component={() => <History />} />
      <Route exact path={"/welcome"} component={() => <Welcome />} />
      <Route exact path={"/Editprofile"} component={() => <Editprofile />} />
      <Route exact path={"/customProtestPage"} component={() => <CustomProtestPage />} />
      <Route exact path={"/ProtestPage"} component={() => <ProtestList />} />
      <Route path='/protest/:id' component={ProtestDocument} />
    </div>
  </Router>
);


export default Routes;

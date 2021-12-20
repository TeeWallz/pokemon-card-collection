import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import BoardCollections from "./components/collections-list.component";
import CreateCollection from "./components/collections-create.component"
import ViewCollection from "./components/collections-view.component.js"

import { logout } from "./actions/auth";

import { clearMessage } from "./actions/message";

import { history } from './helpers/history';
import AuthVerify from "./common/auth-verify";
import NotFound from "./components/NotFound";
import CollectionViewEpic from "./components/collection-view-epic-component";
import CollectionViewEpicWrapper from "./components/collections-view-epic.function";
import CollectionViewWrapper from "./components/collection-view.function";
import {loadCardsFromLocal} from "./helpers/tcgApiLocalData";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      console.log(user.roles)

      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    const user = this.props.user;

    console.log(user?.roles);
    console.log("haha");

    return (
        <Router history={history}>
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={"/"} className="navbar-brand">
                bezKoder
              </Link>

              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>

                {user?.roles.includes("ROLE_MODERATOR") && (
                    <li className="nav-item">
                      <Link to={"/mod"} className="nav-link">
                        Moderator Board
                      </Link>
                    </li>
                )}

                {user?.roles.includes("ROLE_ADMIN")   && (
                    <li className="nav-item">
                      <Link to={"/admin"} className="nav-link">
                        Admin Board
                      </Link>
                    </li>
                )}

                <li className="nav-item">
                  <Link to={"/collections"} className="nav-link">
                    Collections
                  </Link>
                </li>


                {currentUser && (
                    <React.Fragment>
                      <li className="nav-item">
                        <Link to={"/epic"} className="nav-link">
                          Epic
                        </Link>
                      </li>
                    </React.Fragment>
                )}
              </div>

              {currentUser ? (
                  <div className="navbar-nav ml-auto" style={{marginLeft: 'auto'}}>
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        {currentUser.username}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/user"} className="nav-link">
                        User
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        LogOut
                      </a>
                    </li>
                  </div>
              ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                      </Link>
                    </li>
                  </div>
              )}
            </nav>

            <div className="mt-3">
              <Routes>
                <Route exact path={"/"} element={<Home/>} />
                <Route exact path={"/home"} element={<Home/>} />

                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/profile" element={<Profile/>} />
                <Route path="/user" element={<BoardUser/>} />
                <Route path="/mod" element={<BoardModerator/>} />
                <Route path="/admin" element={<BoardAdmin/>} />

                <Route path="/collections" element={<BoardCollections/>} />
                <Route path="/collection/create" element={<CreateCollection/>} />

                <Route path="/collection/:id" element={<CollectionViewWrapper/>} />

                <Route path="/epic" element={<CollectionViewEpicWrapper/>} />
                {/*<Route path="/epic/:collectionId" element={<CollectionViewEpicWrapper/>} />*/}
                <Route path="*" element={<NotFound/>} />




              </Routes>
            </div>
            <AuthVerify logOut={this.logOut}  history={history}/>
          </div>
        </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Chat from  './components/Chat/Chat';
import Join from './components/Join/Join';
import Layout from "./hoc/Layout/Layout";

import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <BrowserRouter>
          <Route path="/" exact component={Join} />
          <Route path="/chat" component={Chat} />
        </BrowserRouter>
      </Layout>
    )
  }
}

export default App;

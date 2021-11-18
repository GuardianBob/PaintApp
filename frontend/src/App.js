import './App.css';
import React, { Component } from 'react' 
import Home from './Home';
import Modal from "./components/Modal"; 
import axios from "axios";
import { Route, BrowserRouter, Routes } from "react-router-dom";


//  These are necessary in order to use the proxy or forbidden errors will occur when trying to POST, Delete, etc.
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      // modal: false,
    };
    this.routerRef = React.createRef();
  }
  
  // toggle = () => {
  //   this.setState({ modal: !this.state.modal });
  // };


  render() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        // { {this.state.modal ? (
        //   <Modal
        //     activeItem={this.state.activeItem}
        //     toggle={this.toggle}
        //     onSave={this.handleSubmit}
        //   />
        // ): null} }
    )
  }
}

export default App;

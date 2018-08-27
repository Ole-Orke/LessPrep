import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConnectApp from "./ConnectApp.js";
import store from './store.js';
import { connect, Provider } from "react-redux";

ReactDOM.render(<Provider store={store} ><ConnectApp store={store}/></Provider>, document.getElementById('root'));

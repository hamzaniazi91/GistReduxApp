import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './store'
// import store from './store'
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';


const store = configureStore()


ReactDOM.render(<Provider store={store}>
    
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

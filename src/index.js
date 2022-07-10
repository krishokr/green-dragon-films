import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './Style/custom.css';
import './Style/fontawesome.js';

import {store, persistor} from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';

ReactDOM.render(
  
    <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);



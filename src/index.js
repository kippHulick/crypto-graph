import React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

// import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
// import { persistStore } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import storageSession from 'redux-persist/lib/storage/session'
// import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import './components/styles/index.css'
import { Auth0Provider } from "@auth0/auth0-react";

import BaseLayout from './components/layout/BaseLayout';
import CoinsReducer from './reducers/CoinReducer';

import App from './components/App';
import About from './components/About';
import ExchangeReducer from './reducers/ExchangeReducer';
import CoinList from './components/CoinList';

// // Local storage config
// const localConfig = {
//   key: 'root',
//   storage,
// }

// // Session storage config
// const sessionConfig = {
//   key: 'user',
//   storage: storageSession,
// }

// const rootReducer = combineReducers({
//   user: persistReducer(localConfig, UserReducer),
//   coins: CoinsReducer
// })

// const persistedReducer = persistReducer(sessionConfig, rootReducer)

const store = configureStore({
  reducer: {
    coins: CoinsReducer,
    exchanges: ExchangeReducer
  },
  middleware: [thunk]
})

// let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <Auth0Provider domain="dev-3j62jc38.us.auth0.com" clientId="kOfMzkpDU8RnrJVMI6KRLBRkc221WKg8" redirectUri={window.location.origin} >
        {/* <PersistGate persistor={persistor} loading={null}> */}
          <Router>
            <BaseLayout>
              <Routes>

                <Route path="/" element={<App />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/list" element={<CoinList />}/>

              </Routes>
            </BaseLayout>
          </Router>
        {/* </PersistGate> */}
      </Auth0Provider>
    </Provider>

  </React.StrictMode>,
);

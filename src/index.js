import React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';

import BaseLayout from './components/layout/BaseLayout';
import CoinsReducer from './reducers/CoinReducer';

import App from './components/App';
import About from './components/About';
import ExchangeReducer from './reducers/ExchangeReducer';
import CoinPage from './components/CoinPage';
import CoinItem from './components/CoinItem';

const store = configureStore({
  reducer: {
    coins: CoinsReducer,
    exchanges: ExchangeReducer
  },
  middleware: [thunk]
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>
        <Router>
          <BaseLayout>
            <Routes>

              <Route path="/" element={<CoinPage />}/>
              <Route path="/about" element={<About />}/>
              {/* <Route path="/coins" element={<CoinPage />}/> */}
              <Route path="/coins/:id" element={<CoinItem />}/>

            </Routes>
          </BaseLayout>
        </Router>
    </Provider>

  </React.StrictMode>,
);

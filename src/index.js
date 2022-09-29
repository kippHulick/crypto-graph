import React from 'react';
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';

import BaseLayout from './components/layout/BaseLayout';
import Reducer from './components/Reducer';

import App from './App';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, Reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<App />}/>
            
          </Routes>
        </BaseLayout>
      </Router>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
);

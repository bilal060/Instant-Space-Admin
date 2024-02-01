import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import UserReducer from './store/user/reducers/UserReducer';
import PlanReducer from './store/plan/reducers/PlanReducer';
import UserEarnings from './store/Earning/reducer/EarningReducer';
import ChatReducer from './store/chat/reducers/ChatReducer';
import CategoryReducer from './store/category/reducers/CategoryReducer';
import SpaceReducer from './store/space/reducers/SpaceReducer';
import BookingReducer from './store/booking/reducers/BookingReducer';
import SocketReducer from './store/socket/reducers/SocketReducer';
import NotificationReducer from './store/notification/reducers/NotificationReducer';

const { persistStore, persistReducer } = require('redux-persist');

const rootReducer = combineReducers({
  user: UserReducer,
  chat: ChatReducer,
  category: CategoryReducer,
  space: SpaceReducer,
  booking: BookingReducer,
  Earnings: UserEarnings,
  notification: NotificationReducer,
  socket: SocketReducer,
  plan: PlanReducer
});

let devtools, store;
const isClient = typeof window !== 'undefined';
if (isClient) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f;

  const storage = require('redux-persist/lib/storage').default;
  const persistConfig = {
    key: 'instant-space',
    storage,
    blacklist: ['notification', 'socket']
  };

  store = createStore(
    persistReducer(persistConfig, rootReducer),
    compose(applyMiddleware(thunk), devtools)
  );

  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(rootReducer, compose(applyMiddleware(thunk)));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
//미들웨어(231020)
import promiseMiddleWare from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers/index.js";
//CSS import(231020) -> (231021) 5.0 이상부터 import를 할필요가 없음
// import 'antd/dist/antd.css';


// 미들웨어(231020)
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleWare,
  ReduxThunk
)(createStore);





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

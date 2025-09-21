import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { init as initApm } from '@elastic/apm-rum' // eslint-disable-next-line
// var apm = initApm({
//   serviceName: 'smart-frontend',
//   serverUrl: 'https://b6bb3776fd6a48568d655062db74fe18.apm.us-east1.gcp.elastic-cloud.com:443',
//   serviceVersion: '',
//   environment: 'develop'
// })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div>
    <App />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

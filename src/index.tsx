import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { ConnectedRouter } from 'react-router-redux';

import { App } from './components/App';
import { TOASTR_TIMEOUT } from './config';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {
  history,
  store,
} from './store/Store';


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
        <App />
        <ReduxToastr timeOut={TOASTR_TIMEOUT}/>
      </Fragment>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

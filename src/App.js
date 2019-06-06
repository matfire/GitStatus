import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './Routes'
class App extends React.Component {
  render() {
    return(
        <Router>
          <Routes />
        </Router>
      );
  }
}
export default App;

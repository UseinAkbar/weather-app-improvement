import React, { useState } from 'react';
import Home from './Components/Home';
import Error from './Components/Error';
import Load from './Components/Load';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Weather from './Components/Weather';
import Location from './Components/Location';
import Footer from './Components/Footer';

function App() {
  const [isLoad, setLoad] = useState(false)

  document.addEventListener('readystatechange', () => {
    if(document.readyState !== 'complete') {
      setLoad(!isLoad)
    } else {
      setTimeout(() => {
        setLoad(!isLoad)
      }, 1000)
    }
  })

  return (
    <Router>
      {isLoad ? <Load /> : <div className="App">
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/weather' component={Weather} />
          <Route path='/location' component={Location} />
          <Route component={Error}></Route>
        </Switch>
        <Footer />
      </div>}
    </Router>
  );
}

export default App;

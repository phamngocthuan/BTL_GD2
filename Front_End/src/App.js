import './App.css';
import {Switch , Route, Redirect} from 'react-router-dom'

import HomePageManger from './components/pages/HomePageManager'
import FormTest from './components/molecules/FormTest'

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
            <Redirect to="/home-page" />
        </Route>
        <Route path="/home-page"
            component={() => <HomePageManger />}
        ></Route>
        <Route path="/form" component={() => <FormTest />}> 

        </Route>
      </Switch>

    </div>
  );
}

export default App;

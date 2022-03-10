import logo from './logo.svg';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import '~semantic-ui-css/semantic.css'    //Added before App.css so App.css can override the semantic css
import './App.css';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react'

function App() {
  return (
    <Router>
      {/* <div>Hello World</div> */}
    <MenuBar/>
      <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/register' element={<Register/>}/>
    </Routes>
    </Router>
    );
      {/* <Container> */}
      {/* </Container> */}
}

export default App;

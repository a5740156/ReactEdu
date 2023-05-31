import logo from './logo.svg';
import './App.css';
import { Button,Navbar, Container, Nav } from 'react-bootstrap';
import timeTable from './img/시차표.png';
import { useState } from 'react';
import sData from './data.js';

function App() {

  let[shoes] = useState(sData);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">EGG</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Cart</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      <div className='main-bg' style={{backgroundImage : 'url('+ timeTable + ')' }}>
      </div>
      <div className='container'>


        <div className='row'>
          {
            sData.map( (a,i) =>  {
              return (
                <Card shoes={sData[i]} i={i}/>
              )
            })
          }
          
          
         
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  return(
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) + '.jpg'}  width="80%"/>
      <h2>{props.shoes.title}</h2>
      <p>{props.shoes.content}</p>
    </div>
  );
}

export default App;

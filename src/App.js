import logo from './logo.svg';
import './App.css';
import { Button,Navbar, Container, Nav } from 'react-bootstrap';
import timeTable from './img/시차표.png';
import { useEffect, useState } from 'react';
import sData from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './routes/Detail.js';
import axios from 'axios';

function App() {

  let[shoes, setShoes] = useState(sData);
  let naviGate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">EGG</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={ () => { naviGate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={ () => { naviGate('/detail/:id')}}>Detail</Nav.Link>
          <Nav.Link onClick={ () => { naviGate('/event')}}>Event</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      
      {/* <Link to="/">홈</Link>
      <Link to="">상세페이지</Link> */}

      <button onClick={
        () => {
          let tempShoes = shoes.sort((a,b) => {
            if(a.title > b.title) return 1;
            if(a.title < b.title) return -1;
            return 0;
          });
          // console.log(tempShoes);
          setShoes(tempShoes);
          console.log(shoes);
        }
      }> 정렬하기 버튼</button>
      <Routes>
        <Route path='/' element={
            <>
            <div className='main-bg' style={{backgroundImage : 'url('+ timeTable + ')' }}></div>
            <div className='container'>
              <div className='row'>
                {
                  shoes.map( (data, i) =>  {
                    return (
                      <Card shoes={data} i={i}/>
                    )
                  })
                }
              </div>
            </div>
            <button onClick={ () => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) =>{
                let temp = [...shoes, ...result.data];
                setShoes(temp);
              })
              
              // axios.post('/sdfsdf', {name : 'kim'})
              // Promis.all([ axios1, axios2])

            }}>더보기</button>
            </>
        }/>
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>}/>

        <Route path='/about' element={ <About/> }>
          <Route path='member' element={<div>맴버임</div>}/>
          <Route path='location' element={ <div>위치정보임</div>}/>  
        </Route>
        <Route path='/event' element={<EventPage/>}>
          <Route path='1' element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path='2' element={<div>생일기념 쿠폰받기</div>}/>
          <Route />
        </Route>  
      </Routes>

    </div>
  );
}
function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}
function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
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

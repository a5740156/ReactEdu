import logo from './logo.svg';
import './App.css';
import { Button,Navbar, Container, Nav } from 'react-bootstrap';
import timeTable from './img/시차표.png';
import { createContext, useEffect, useState } from 'react';
import sData from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './routes/Detail.js';
import Cart from './routes/Cart.js';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export let Context1 = createContext();

function App() {

  let[shoes, setShoes] = useState(sData);
  let naviGate = useNavigate();
  let [btnCnt , setBtnCnt] = useState(0);
  let[재고]  = useState([10,11,12]);

  let result = useQuery('작명', ()=>{
    axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      return a.data;
    })
  })

  // result.data 데이터
  // result.isLoading loading 중일때 true
  // result.error dpfjskTdmfEo

  // localStorage는 문자만 저장할 수 있음.
  let obj = {name : 'kim'}
  localStorage.setItem('data' , JSON.stringify(obj));
  let getStorage = localStorage.getItem('data');
  console.log(JSON.parse(getStorage).name);

  useEffect(() =>{
    let getData = localStorage.getItem('watched');
    if(getData !== null && getData !== '' && getData !== [] ){
      localStorage.setItem('watched' , JSON.stringify( [] ))
    }
  }, [])

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">EGG</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={ () => { naviGate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={ () => { naviGate('/detail/1')}}>Detail</Nav.Link>
          <Nav.Link onClick={ () => { naviGate('/event')}}>Event</Nav.Link>
          <Nav.Link onClick={ () => { naviGate('/cart')}}>cart</Nav.Link>
        </Nav>
        <Nav className='ms-auto'>
          {result.isLoading  ? '로딩중' : 'result.data.name'}
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
                setBtnCnt(btnCnt);
                console.log(btnCnt)
                let temp = [];
                if(btnCnt < 3){
                  temp = [...shoes, ...result.data];
                }                              
                setShoes(temp);
              })

            }}>더보기</button>
            </>
        }/>
        <Route path='/detail/:id' element={
          <Context1.Provider value={{재고, shoes}}>
            <Detail shoes={shoes}/>
          </Context1.Provider>
        }/>
        <Route path='/cart' element={
          <Cart/>
        }/>
        
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

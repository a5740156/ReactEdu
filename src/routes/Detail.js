import { useContext, useState } from "react";
import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {Context1} from './../App.js';
import { useDispatch } from "react-redux";
import { addItem } from "../store.js";

let YellowButton = styled.button`
    background : ${props => props.bg};
    color : ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`

function Detail(props) {

    // 훅 컴포넌드가 장착, 업데이트 될때 실행됨
    // 랜더링이 완료된 후 실행된다.
    // Effect? 


    let [displayGubun, setDisplayGubun] = useState(true);

    let[tab, setTab] = useState(0);
    // let {재고} = useContext(Context1);

    let dispatch = useDispatch();

    useEffect(() => {
        console.log('훅');
        let a =  setTimeout( () => {setDisplayGubun(false);} , 2000);
        return () => {
            // useEffect 실행전에 실행되는 부분
            // 기존타이머는 제거
            clearTimeout(a);
        }
    }, [])

    // useEffect(() => {}) 재렌더링마다 코드실행
    // useEffect(() => {} , []) 1번만 실행
    // useEffect(() => {
    //  return() => {}
    //}) 

    let [count, setCount] = useState(0);

    let {id} = useParams();
    // console.log(props);
    let fingProduct = props.shoes.find( x => x.id == id);
    useEffect( () => {
        let getData = localStorage.getItem('watched');
        getData = JSON.parse(getData);
        getData.push(fingProduct.id)
        getData = new Set(getData);
        getData = Array.from(getData);
        localStorage.setItem('watched' , JSON.stringify(getData))
    }, [])

    let [iptValue, setIptValue] = useState('');
    useEffect( () => {
        console.log(iptValue)
        console.log(isNaN(iptValue) )
        if(isNaN(iptValue) == true) {
            alert('그러지마시오')
        }
    }, [iptValue])
    return(
        
        <div className="container">
       
                {/* <YellowButton bg="blue">버튼</YellowButton>
                <YellowButton bg="orange">버튼</YellowButton> */}
            {
                displayGubun == true 
                ?<div className="alert alert-warning">
                    2초이내 구매시 할인
                </div>
                : null
            }
            {count}
            <button onClick={() => {setCount(count + 1)}}> 버튼</button>
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                    <input onChange={ (e) => setIptValue(e.target.value)}/>
                    <h4 className="pt-5">{fingProduct.title}</h4>
                    <p>{fingProduct.content}</p>
                    <p>{fingProduct.price}</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem({id : 1, name : "Grey Yordan", count : 1}));
                    }}>주문하기</button> 
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                <Nav.Link eventKey="link0" onClick={() => {setTab(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link1" onClick={() => {setTab(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link2" onClick={() => {setTab(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab} />
           
        </div> 
    )
}

function TabContent({tab}){
    // if(tab == 0 ){
    //     return <div >내용0</div> 
    // }else if(tab == 1 ){
    //     return <div >내용1</div> 
    // }else if(tab == 2 ){
    //     return <div >내용2</div> 
    // }else {
    //     return null;
    // }
    let {재고} = useContext(Context1);

    let [fade, setFade] =useState('');
    useEffect( () => {
        let a = setTimeout( () => {
            setFade('end');
        } , 100)

        // useEffect 실행전 실행하기 위함 클린함수
        return () => {
            clearTimeout(a);
            setFade('');
        }
    },[tab]);
    return <div className={'start ' + fade}>
        {재고}
        { [<div>내용0</div> ,<div >내용1</div> ,<div >내용2</div> ][tab] }
    </div>
}

export default Detail;
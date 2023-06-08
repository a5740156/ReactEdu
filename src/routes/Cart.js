import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge, changeName, creCount, increseCount } from "./../store.js";

function Cart(){

    let data = useSelector((state)=>{
        return state;
    })
    let dispatch = useDispatch();
    
    return(
        <div>
            
            {
                data.user.name 
            }
            {
                data.user.age
            }

            <button onClick={ ()=>{
                dispatch(changeAge(100))
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.cart.map( (data,i)=> {
                            return (
                                <tr>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.count}</td>
                                    <td><button onClick={() => {
                                        dispatch(increseCount(data.id))
                                    }}>+</button></td>
                                </tr>
                            )
                        })
                    }
                   
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;
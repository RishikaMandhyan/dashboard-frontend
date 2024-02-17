

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";

export const Testing=()=>{

  //this state that goes inside function in useSelector is global state
  //and returns state corresponding to the reducer corresponding to user name ki slice

  
  const user= useSelector(state=> state.user)
  const dispatch= useDispatch();

  const handleAdd=()=>{
    dispatch(addUser('ewfwe'));
  }

    return (
        <>
        <div onClick={handleAdd}> Add user</div>
        {user.isAuthenticated? <div>{user.username}</div> : null}
        {/* <div onClick={handleRemove}> Remove user</div> */}
        </>
    )
}

import { useContext } from "react"
import AuthContext, { AUTH_STATE } from "../contexts/AuthContext"
import Overlay from "./Overlay"


const LoginForm = () => {
    const { login, authState, showLoginForm } = useContext(AuthContext)
    
    if(showLoginForm && authState !== AUTH_STATE.PENDING){
      return (
        <div className='flex justify-center'>
            <div className='flex-col justify-between bg-[#FAFAFA] fixed rounded-2xl mt-[50px] w-[350px] h-[450px] z-50'>
                <div className='flex-col justify-center h-[25%] w-full rounded-2xl'>
                    <i className='mt-[22.5%] mb-10 mx-[43.5%] fas fa-circle-user fa-2xl text-gray-600' />
                    <div className="items-center h-[90px] bg-orange-200 ml-[15%] mr-[15%]">
                        <div>LOGIN</div>
                        <button className="mx-auto px-5 rounded-2xl py-1 bg-gray-400" onClick={login}>Login</button>
                    </div>
                </div>
            </div>
            <Overlay />
        </div>
      )
    }
    return <></>
  }

  export default LoginForm
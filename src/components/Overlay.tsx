import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"

const Overlay = () => {
    const { closeShowingForm } = useContext(AuthContext)
    return <div onClick={closeShowingForm} className='fixed bg-[#454545]/90 top-[70px] right-0 left-0 bottom-0 w-[100%] h-[100%] z-0' />
}

export default Overlay
import userAtom from '@/atom/userAtom'
import { useSetRecoilState } from 'recoil'
import useShowToast from './useShowToast'

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom)
  const showToast = useShowToast()

  const logout = async()=>{
    try{
      const res = await fetch("/api/users/logout",{
        method:"POST",
        headers :{
          "Content-Type":"application/json"
        },
      })
      const data = await res.json()
      if(data.error){
        showToast(null,data.error,"error")
        return
      }
      //clear local storage      
      localStorage.removeItem("user-hives");
      //clear state
      setUser(null) 
    }catch(error){
      showToast(null,error,"error")
    }
  }

  return logout
}

export default useLogout

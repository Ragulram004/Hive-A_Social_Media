import React from 'react'
import { Button } from './ui/button'
import { useSetRecoilState } from 'recoil'
import userAtom from '@/atom/userAtom'
import useShowToast from '@/hooks/useShowToast'


const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast()

  const handleLogout = async()=>{
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

  return (
    <Button
      colorPalette = {"red"}
      variant = {"surface" }
      position = {"fixed"}
      top = {'30px'}
      right = {"30px"}
      size = {"sm"}
      onClick = {handleLogout}
    >
      Logout
    </Button>
  )
}

export default LogoutButton

import {Text} from "@chakra-ui/react"
import { Button } from "./ui/button"
import useShowToast from "@/hooks/useShowToast"
import useLogout from "@/hooks/useLogout"

const SettingsPage = () => {

  const showToast = useShowToast()
  const logout = useLogout()

  const disableAccount = async() => {
    if(!window.confirm("Are you sure you want to disable your account?")) return

    try{
      const res = await fetch("/api/users/disable",{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await res.json()
      if(data.error){
        showToast("Error",data.error,"error")
        return
      }
      if(data.success){
        await logout()
        showToast("Success","Your account has been disabled","success")
      }

    }catch(error){
      showToast("Error",error.message,"error")
    }
  }

  return (
    <>
      <Text my={1}  >
        Disable Your Account
      </Text>
      <Text>
        Your can "Activate" Your account anytime by logging in.
      </Text>
      <Button
        size={"sm"}
        colorPalette={"red"}
        variant={"solid"}
        onClick={disableAccount}
      >Disable Account</Button>
    </>
  )
}

export default SettingsPage

import { Button } from './ui/button'
import { IoMdLogOut } from "react-icons/io";
import { Text } from '@chakra-ui/react'
import useLogout from '@/hooks/useLogout'


const LogoutButton = () => {

  const logout = useLogout()
  
  return (
    <Button
      colorPalette = {"red"}
      variant = {"surface" }
      position = {"fixed"}
      top = {'30px'}
      right = {"30px"}
      size = {"sm"}
      onClick = {logout}
      title = "Logout"
    >
      <IoMdLogOut size={30} /> <Text display={{base:"none",md:"block"}}>Logout</Text>
    </Button>
  )
}

export default LogoutButton

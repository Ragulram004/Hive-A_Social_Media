import { Flex, Image, Link} from "@chakra-ui/react"
import { useColorMode } from "./ui/color-mode"
import { useRecoilValue } from "recoil"
import userAtom from "@/atom/userAtom"
import {Link as RouterLink} from "react-router-dom"
import { AiFillHome } from "react-icons/ai"
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  const {colorMode,toggleColorMode} = useColorMode()
  const user = useRecoilValue(userAtom)
  return (
    <Flex justifyContent={"space-between"} just mt={6} mb="12">
      {user &&(
        <Link as={RouterLink} to="/" title="Home">
          <AiFillHome size={24} />
        </Link>
      )}
      <Image
        cursor={"pointer"}
        alt="logo"
        src={colorMode === "dark" ?"/light-logo.svg":"/dark-logo.svg"}
        onClick={toggleColorMode}
        width={6}
      />
      {user &&(
        <Link as={RouterLink} to={`/${user.username}`} title="Profile">
          <FaUserAlt size={22} />
        </Link>
      )}
    </Flex>
    
  )
}

export default Header

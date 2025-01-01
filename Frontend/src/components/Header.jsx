import { Flex, Image} from "@chakra-ui/react"
import { useColorMode } from "./ui/color-mode"

const Header = () => {
  const {colorMode,toggleColorMode} = useColorMode()
  return (<Flex justifyContent={"center"} mt={6} mb="12">
    <Image
      cursor={"pointer"}
      alt="logo"
      src={colorMode === "dark" ?"/light-logo.svg":"/dark-logo.svg"}
      onClick={toggleColorMode}
      width={6}
    />
  </Flex>)
}

export default Header

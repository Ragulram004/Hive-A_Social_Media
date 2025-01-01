import { Button } from "@/components/ui/button"
import { Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <Link to="/markzuckerberg">
      <Flex w={"full"} justifyContent={"center"} >
        <Button variant={"surface"} size={"sm"}>Visit Profile</Button>
      </Flex>
    </Link>
  )
}

export default HomePage

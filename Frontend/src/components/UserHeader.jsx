import { Box, Flex,VStack,Text,Link } from "@chakra-ui/react"
import {Avatar,AvatarGroup } from "./ui/avatar"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"

import { toaster } from "@/components/ui/toaster"


const userHeader = () => {

  const copyURL = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL).then(()=>{
      toaster.create({
        description: "Profile link copied to clipboard.",
        type: "info",
      })
    })
  } 

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Mark Zuckerberg
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"} >markzucerberg</Text>
            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
              hives.next
            </Text>
          </Flex>
        </Box>
        <Box>
          <AvatarGroup>
            <Avatar
              name = "Mark Zuckerberg"
              src = "/zuck-avatar.png"
              size = {{
                base: "md",
                md: "2xl"
              }}
            />
          </AvatarGroup>
        </Box>
      </Flex>

      <Text >
        Co-founder, executive chairman and CEO of Meta Platforms.
      </Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>3.6k followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container"> <BsInstagram size={24} cursor={"pointer"}/> </Box>
          <Box className="icon-container">
            <MenuRoot>
              <MenuTrigger asChild>
                <CgMoreO size={24} cursor={"pointer"}/>
              </MenuTrigger>
              <MenuContent bg={"gray.dark"}>
                <MenuItem onClick={copyURL}>Copy link</MenuItem>
              </MenuContent>
            </MenuRoot>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
          <Text fontWeight={"bold"}>Hives</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1.5px solid gray"} justifyContent={"center"} color={"gray.light"} pb="3" cursor={"pointer"}>
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>        
      </Flex>
    </VStack>
  )
}

export default userHeader

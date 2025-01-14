import { Box, Flex,VStack,Text, Link, Spinner } from "@chakra-ui/react"
import {Avatar,AvatarGroup } from "./ui/avatar"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { Button } from "./ui/button"
import { toaster } from "@/components/ui/toaster"
import { useRecoilValue } from "recoil"
import userAtom from "@/atom/userAtom"
import { Link as RouterLink } from "react-router-dom"
import useFollowUnfollow from "@/hooks/useFollowUnfollow"


const userHeader = ({user}) => {
  const currentUser = useRecoilValue(userAtom) //logged in user
  const {handleFollowUnfollow, updating, following} = useFollowUnfollow(user)

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
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"} >{user.username}</Text>
            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
              hives.next
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <AvatarGroup>
              <Avatar
                name = {user.name}
                src = {user.profilePic}
                size = {{
                  base: "lg",
                  md: "2xl"
                }}
              />
            </AvatarGroup>
          )}
          {!user.profilePic && (
            <AvatarGroup>
              <Avatar
                name = {user.name}
                src = "https://bit.ly/broken-link"
                size = {{
                  base: "md",
                  md: "2xl"
                }}
              />
            </AvatarGroup>
          )}
        </Box>
      </Flex>

      <Text >
        {user.bio}
      </Text>

      {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/update" color={"blue.500"}>
          <Button size={"xs"} p={0} variant={"link"}>Update Profile</Button>
        </Link>
      )}
      {currentUser?._id !== user._id && (        
          <Button size={"xs"} variant={"surface"}
            onClick={handleFollowUnfollow}
            isLoading={updating}
          >
            {updating ? <Spinner size="xs" color="white" /> : (
              following? "Unfollow" : "Follow"
            )}
          </Button>
        
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} followers </Text>
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

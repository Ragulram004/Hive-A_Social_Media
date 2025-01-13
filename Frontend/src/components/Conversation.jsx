import {  Avatar,Box, Flex, Stack,Circle, Image, Text,Float } from '@chakra-ui/react'
import { useColorMode, useColorModeValue } from './ui/color-mode'
import { use } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '@/atom/userAtom'
import { BsCheck2All, BsFillImageFill } from 'react-icons/bs'
import { selectedConversationAtom } from '@/atom/messagesAtom'
import { FaUser } from "react-icons/fa6";


const Conversation = ({conversation, isOnline}) => {
  const user = conversation.participants[0]
  const lastMessage = conversation.lastMessage
  const currentUser = useRecoilValue(userAtom)
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
  const colorMode = useColorMode()

  // console.log(selectedConversation)

  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={1}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      onClick={() => setSelectedConversation({
        _id: conversation._id,
        userId: user._id,
        userProfilePic: user.profilePic,
        username: user.username,
        mock: conversation.mock
      })}
      bg={selectedConversation._id === conversation._id ? (colorMode === "light" ?"gray.400": "gray.dark") : ""}
    >
      <Box>
        <Avatar.Root  variant="subtle" size={"lg"}>
          <Avatar.Image src={user.profilePic} />
          <Avatar.Fallback><FaUser /></Avatar.Fallback>
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            {isOnline &&
              <Circle
                bg="green.500"
                size="8px"
                outline="0.2em solid"
                outlineColor="bg"
              />
            }
          </Float>
        </Avatar.Root>
      </Box>
      
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight= "700" display={"flex"} alignItems={"center"}>
          {user.username} <Image src='/verified.png' w={4} h={4} ml={1}/>
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === lastMessage.sender ? (
            <Box color={lastMessage.seen ? "blue.400":""}>
              <BsCheck2All size={13}/>
            </Box>
          ) : ""}
          {lastMessage?.text.length >18 ? lastMessage.text.substring(0,18) + "..." : lastMessage.text ||
            <BsFillImageFill size={13}/>
          }
        </Text>
      </Stack>

    </Flex>
  )
}

export default Conversation

import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Avatar } from './ui/avatar'
import { useColorModeValue } from './ui/color-mode'
import { useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '@/atom/messagesAtom'
import userAtom from '@/atom/userAtom'

const Message = ({ownMessage, message}) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom)
  const user = useRecoilValue(userAtom)

  return (
    <>
    {ownMessage ? (      
      <Flex
        gap={2}
        alignSelf={"flex-end"}
      >
        <Text maxW={"350px"} bg={useColorModeValue("gray.100","gray.800")} p={2} borderRadius={"md"}>
          {message.text}
        </Text>
        <Avatar src={user.profilePic} w='7' h='7'/>
      </Flex>
    ):(
      <Flex
        gap={2}
      >
        <Avatar src={selectedConversation.userProfilePic} w='7' h='7'/>
        <Text maxW={"350px"} bg={useColorModeValue("gray.300","gray.900")} p={2} borderRadius={"md"}>
          {message.text}
        </Text>
      </Flex>
    )}
    </>
  )
}

export default Message

import { Flex, Text, Box, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Avatar } from './ui/avatar'
import { useColorModeValue } from './ui/color-mode'
import { useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '@/atom/messagesAtom'
import userAtom from '@/atom/userAtom'
import { BsCheck2All } from 'react-icons/bs'
import { Skeleton } from './ui/skeleton'

const Message = ({ownMessage, message}) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom)
  const user = useRecoilValue(userAtom)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <>
    {ownMessage ? (      
      <Flex
        gap={2}
        alignSelf={"flex-end"}
      >
        {message.text &&(
          <Flex bg={useColorModeValue("gray.100","gray.800")} maxW={"350px"} p={1} borderRadius={"md"} >
            <Text color={"white"}>{message.text}</Text>
            <Box alignSelf={"flex-end"} ml={1} color={message.seen ? "blue.400":""} fontWeight={"bold"} >
              <BsCheck2All size={12}/>
            </Box>
          </Flex>
        )}
        {message.img && !imgLoaded &&(
          <Flex mt={5} w={"200px"}>
            <Image
              src={message.img}
              alt='Image'
              borderRadius={4}
              hidden
              onLoad={() => setImgLoaded(true)}
            />
            <Skeleton w={"200px"} h={"200px"} />
          </Flex>
        )}
        {message.img && imgLoaded &&(
          <Flex mt={5} w={"200px"}>
            <Image
              src={message.img}
              alt='Image'
              borderRadius={4}
              onLoad={() => setImgLoaded(true)}
            />
            <Box alignSelf={"flex-end"} ml={1} color={message.seen ? "blue.400":""} fontWeight={"bold"} >
              <BsCheck2All size={12}/>
            </Box>
          </Flex>
        )}
        <Avatar src={user.profilePic} w='7' h='7'/>
      </Flex>
    ):(
      <Flex
        gap={2}
      >
        <Avatar src={selectedConversation.userProfilePic} w='7' h='7'/>
        {message.text &&(
          <Text maxW={"350px"} bg={useColorModeValue("gray.300","gray.900")} p={2} borderRadius={"md"}>
            {message.text}
          </Text>
        )}
        {message.img && !imgLoaded &&(
          <Flex mt={5} w={"200px"}>
            <Image
              src={message.img}
              alt='Image'
              borderRadius={4}
              hidden
              onLoad={() => setImgLoaded(true)}
            />
            <Skeleton w={"200px"} h={"200px"} />
          </Flex>
        )}
        {message.img && imgLoaded &&(
          <Flex mt={5} w={"200px"}>
            <Image
              src={message.img}
              alt='Image'
              borderRadius={4}
              onLoad={() => setImgLoaded(true)}
            />
          </Flex>
        )}
      </Flex>
    )}
    </>
  )
}

export default Message

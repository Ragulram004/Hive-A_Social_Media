import React,{useState} from 'react'
import { Flex,Text, Box, Separator} from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'
import { Avatar } from './ui/avatar'

const Comment = ({reply,lastReply}) => {
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={reply.userAvatar} size="sm" />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>{reply.username}</Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply && <Separator />}
    </>
  )
}

export default Comment
 
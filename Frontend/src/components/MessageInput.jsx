import { Input, Group,Box } from '@chakra-ui/react'
import React from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { useColorModeValue } from './ui/color-mode'

const MessageInput = () => {
  return (
    <form>
      <Group attached w={"full"} shadow={"sm"}  borderRadius={"full"}>
        <Input w={"full"} placeholder='Message' borderRadius={"full"}/>
        <Box fontSize={"2xl"} border={"1px solid"} p={"7.5px"} borderColor={useColorModeValue("gray.200","gray.800")}  borderRadius={"full"}><IoSendSharp/></Box>
      </Group>
    </form>
  )
}

export default MessageInput

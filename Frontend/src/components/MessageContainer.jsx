import { Flex, Separator, Text, Image } from "@chakra-ui/react"
import { useColorModeValue } from "./ui/color-mode"
import { Avatar } from "./ui/avatar"
import { Skeleton, SkeletonCircle } from "./ui/skeleton"
import Message from "./Message"
import MessageInput from "./MessageInput"
import { useEffect, useState } from "react"
import useShowToast from "@/hooks/useShowToast"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedConversationAtom } from "@/atom/messagesAtom"
import userAtom from "@/atom/userAtom"

const MessageContainer = () => {
  const showToast = useShowToast()
  const [selectedConversation,setSelectedConversation] = useRecoilState(selectedConversationAtom)
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [messages, setMessages] = useState([])
  const currentUser = useRecoilValue(userAtom)
 
  useEffect(()=>{
    const getMessages = async ()=>{
      setLoadingMessages(true)
      setMessages([])
      try{
        const res = await fetch(`/api/messages/${selectedConversation.userId}`)
        const data = await res.json()
        if(data.error){
          showToast(`Error`,data.error,"error")
          return
        }
        setMessages(data)
      }catch(error){
        showToast("Error",error.message,"error")
      }finally{
        setLoadingMessages(false)
      }
    }
    getMessages()
  },[selectedConversation.userId])

  return (
    <Flex 
      flex={70}
      bg= {useColorModeValue("gray.200","gray.dark")}
      borderRadius={"md"}
      flexDir={"column"}
      p={2}
    >
      {/* Message Header */}
      <Flex
        w={"full"}
        h = {12}
        alignItems={"center"}
        gap={2}
      >
        <Avatar src ={selectedConversation.userProfilePic} size={"sm"} />
        <Text display={"flex"} alignItems={"center"} >
          {selectedConversation.username} <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Separator />

      {/* Message Body */}
      <Flex flexDir={"column"} px={4} gap={4} my={4} height={"400px"} overflowY={"auto"}>
        {loadingMessages && (
          [...Array(6)].map((_, index) => (
            <Flex key={index}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={index %2 === 0 ? "flex-start" : "flex-end"}
            >
              {index % 2 === 0 && <SkeletonCircle src ='' size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h={"8px"} w={"250px"}  />
                <Skeleton h={"8px"} w={"250px"}  />
              </Flex>
              {index % 2 !== 0 && <SkeletonCircle src ='' size={7} />}
            </Flex>
          ))
        )}
        {!loadingMessages && (
          messages.map((message) => (
            <Message key = {message._id} message  = {message} ownMessage={currentUser._id === message.sender} />
          ))
        )}
      </Flex>
      <MessageInput/>
    </Flex>
  )
}

export default MessageContainer

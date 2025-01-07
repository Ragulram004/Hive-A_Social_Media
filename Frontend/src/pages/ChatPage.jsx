import { useState,useEffect } from "react"
import { Box, Flex, Text, Input } from "@chakra-ui/react"
import { MdPersonSearch } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import Conversation from "@/components/Conversation";
import { useColorModeValue } from "@/components/ui/color-mode";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "@/components/MessageContainer";
import useShowToast from "@/hooks/useShowToast";
import { useRecoilState } from "recoil";
import { conversationAtom, selectedConversationAtom } from "@/atom/messagesAtom";


const ChatPage = () => {
  const showToast = useShowToast()
  const [loadingConversations,setLoadingConversations] = useState(true)
  const [conversations,setConversations] = useRecoilState(conversationAtom)
  const [selectedConversation,setSelectedConversation] = useRecoilState(selectedConversationAtom)

  useEffect(()=>{
    const getConversations = async()=>{
      try{
        const res = await fetch("/api/messages/conversations")
        const data = await res.json()
        if(data.error){
          showToast("Error",data.error,"error")
          return
        }
        console.log(data)
        setConversations(data)
      }catch(error){
        showToast("Error",error.message,"error")
      }finally{
        setLoadingConversations(false)
      }
    }
    getConversations()
  },[setConversations])

  return (
    <Box position={"absolute"}  
      left={"50%"}
      transform={"translateX(-50%)"}
      w={{
        base:"100%",
        md:"80%",
        lg:"800px"
      }}
      p={4}
    >
      <Flex
        gap={4}
        flexDirection={{
          base:"column",
          md:"row"
        }}
        maxW={{
          sm:"100%",
          md:"full"
        }}
        mx={"auto"}
      >
        <Flex flex={30}
          gap={2}
          flexDirection={"column"}
          maxW={{
            sm:"250px",
            md:"full"
          }}
          mx={"auto"}
        >
          <Text fontWeight={700} color={useColorModeValue("gray.600","gray.400")}>
            Your Conversations
          </Text>
            <form>
              <Flex alignItems={"center"} gap={2}>
                <Input placeholder="Search a user"/>
                <Button size={"sm"} variant={"surface"}>
                  <MdPersonSearch size={20} />
                </Button>
              </Flex>
            </form>
            {loadingConversations && (
              [0,1,2,3,4].map((_,i)=>(
                <Flex key={i} gap={4} alignItems={"center"} p={1} borderRadius={"md"}>
                  <Box>
                    <SkeletonCircle size={10}/>
                  </Box>
                  <Flex w={"full"} flexDirection={"column"} gap={3} >
                    <Skeleton height="5" width="70%" />
                    <Skeleton height="3"  />
                  </Flex>
                </Flex>
              ))
            )}
            {!loadingConversations && (
              conversations?.map(conversation=>(
                <Conversation key={conversation._id} conversation={conversation}/>
              ))
            )}
        </Flex>
        {!selectedConversation._id && (
         <Flex
            flex={70}
            borderRadius={"md"}
            p={2}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
          >
            <GiConversation size={50}/>
            <Text fontSize={14} fontWeight={600}>Select a conversation to start messaging</Text>
          </Flex> 
        )}
        {selectedConversation._id && (
          <MessageContainer/>
        )}
      </Flex>
    </Box>
  )
}

export default ChatPage

import { useState,useEffect } from "react"
import { Box, Flex, Text, Input, Spinner } from "@chakra-ui/react"
import { MdPersonSearch } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import Conversation from "@/components/Conversation";
import { useColorModeValue } from "@/components/ui/color-mode";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "@/components/MessageContainer";
import useShowToast from "@/hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import { conversationAtom, selectedConversationAtom } from "@/atom/messagesAtom";
import userAtom from "@/atom/userAtom";
import { useSocket } from "@/context/SocketContext";


const ChatPage = () => {
  const showToast = useShowToast()
  const [loadingConversations,setLoadingConversations] = useState(true)
  const [conversations,setConversations] = useRecoilState(conversationAtom)
  const [selectedConversation,setSelectedConversation] = useRecoilState(selectedConversationAtom)
  const [searchText,setSearchText] = useState("")
  const [searchingUser, setSearchingUser] = useState(false)
  const currentUser = useRecoilValue(userAtom)
  const {socket,onlineUsers} = useSocket()

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

  const handleConversationSearch = async(e)=>{
    e.preventDefault()
    setSearchingUser(true)
    try{
      const res = await fetch(`/api/users/profile/${searchText}`)
      const searchUser = await res.json();
      if(searchUser.error){
        showToast("Error",searchUser.error,"error")
        return
      }

      // if user try to message himself
      if(searchUser._id === currentUser._id){
        showToast("Error","You can't chat with yourself","error")
        return
      }
      //if user already in converstion with
      if(conversations.find(conversation => conversation.participants[0]._id === searchUser._id )){
        setSelectedConversation({
          _id: conversations.find(conversation => conversation.participants[0]._id === searchUser._id )._id,
          userId: searchUser._id,
          username: searchUser.username,
          userProfilePic: searchUser.profilePic
        })
        return
      }

      const mockConversation = {
				mock: true,
				lastMessage: {
					text: "",
					sender: "",
				},
				_id: Date.now(),
				participants: [
					{
						_id: searchUser._id,
						username: searchUser.username,
						profilePic: searchUser.profilePic,
					},
				],
			};
      setConversations((prevConvs) => [...prevConvs, mockConversation])  

    }catch(error){
      showToast("Error",error.message,"error")
    }finally{
      setSearchingUser(false)
    }
  }

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
            <form onSubmit={handleConversationSearch}>
              <Flex alignItems={"center"} gap={2}>
                <Input placeholder="Search a user"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} />
                <Button size={"sm"} variant={"surface"} onClick={handleConversationSearch}>
                  {searchingUser ? <Spinner size={"sm"}/> : <MdPersonSearch size={20} />}
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
                <Conversation key={conversation._id} 
                  isOnline ={onlineUsers.includes(conversation.participants[0]._id)}
                  conversation={conversation}
                />
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

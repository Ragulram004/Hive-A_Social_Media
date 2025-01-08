import { Input, Group,Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { useColorModeValue } from './ui/color-mode'
import useShowToast from '@/hooks/useShowToast'
import { conversationAtom, selectedConversationAtom } from '@/atom/messagesAtom'
import { useRecoilState, useRecoilValue } from 'recoil'

const MessageInput = ({setMessages}) => {
  const [messageText,setMessageText] = useState("")
  const showToast = useShowToast()
  const selectedConversation = useRecoilValue(selectedConversationAtom)
  const [conversations,setConversations] = useRecoilState(conversationAtom)

  const handleSendMessage = async(e) =>{
    e.preventDefault();
		if (!messageText.trim()) return;

		try {
			const res = await fetch("/api/messages", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: messageText,
					recipientId: selectedConversation.userId,
				}),
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			setMessages((messages) => [...messages, data]);

			setConversations((prevConvs) => {
				const updatedConversations = prevConvs.map((conversation) => {
					if (conversation._id === selectedConversation._id) {
						return {
							...conversation,
							lastMessage: {
								text: messageText,
								sender: data.sender,
							},
						};
					}
					return conversation;
				});
				return updatedConversations;
			});
			setMessageText("");
		} catch (error) {
			showToast("Error", error, "error");
    }
  }


  return (
    <form onSubmit={handleSendMessage}>
      <Group attached w={"full"} shadow={"sm"}  borderRadius={"full"}>
        <Input w={"full"} placeholder='Message' borderRadius={"full"}
          value = {messageText}
          onChange={(e)=>setMessageText(e.target.value)}
        />
        <Box fontSize={"2xl"} 
          border={"1px solid"} 
          p={"7.5px"} 
          borderColor={useColorModeValue("gray.200","gray.800")}  
          borderRadius={"full"}
          onClick={handleSendMessage}
        >
          <IoSendSharp/>
        </Box>
      </Group>
    </form>
  )
}

export default MessageInput

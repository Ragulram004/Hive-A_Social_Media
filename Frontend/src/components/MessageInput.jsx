import { Input, Flex, Box, Spinner } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { BsFillImageFill } from 'react-icons/bs';
import { useColorModeValue } from './ui/color-mode';
import useShowToast from '@/hooks/useShowToast';
import usePreviewImg from '@/hooks/usePreviewImg'; // Import your hook
import { conversationAtom, selectedConversationAtom } from '@/atom/messagesAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  PopoverCloseTrigger,
} from '@/components/ui/popover';

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState('');
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg(); // Use your hook
  const showToast = useShowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [conversations, setConversations] = useRecoilState(conversationAtom);
  const [open, setOpen] = useState(false);
	const [isSending, setIsSending] = useState(false);

  const imageRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() && !imgUrl) return;

		setIsSending(true)

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
          img: imgUrl,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
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
      setMessageText('');
      setImgUrl('');
      setOpen(false);
    } catch (error) {
      showToast('Error', error.message, 'error');
    }finally{
			setIsSending(false)
		}
  };

  const handleImageUpload = (e) => {
    handleImageChange(e); // Delegate to the hook
    setOpen(true); // Open the popover after image selection
  };

  return (
    <Flex gap={2} align="center">
      <form onSubmit={handleSendMessage} style={{ flex: 95 }}>
        <Flex w="100%" shadow="sm" borderRadius="full" align="center">
          <Input
            placeholder="Message"
            borderRadius="full"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Box
            fontSize="2xl"
            border="1px solid"
            p="7.5px"
            borderColor={useColorModeValue('gray.200', 'gray.800')}
            borderRadius="full"
            onClick={handleSendMessage}
            cursor="pointer"
          >
            <IoSendSharp />
          </Box>
        </Flex>
      </form>
      <Flex cursor="pointer" flex={5}>
        <BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
        <Input
          type="file"
          hidden
          ref={imageRef}
          onChange={handleImageUpload} // Use the wrapped upload handler
        />
      </Flex>
      <PopoverRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <PopoverTrigger>
          <Box display="none" /> {/* Placeholder trigger, hidden */}
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Flex flexDirection="column" align="center">
              <Box as="img" src={imgUrl} maxW="100%" mb={2} />
              <Box mt={2}>
                {!isSending ? (
									<IoSendSharp size={24} cursor="pointer" onClick={handleSendMessage} />
								):(
									<Spinner size={"xs"}/>
								)}
              </Box>
            </Flex>
          </PopoverBody>
          <PopoverCloseTrigger>
            <Box onClick={() => setImgUrl('')} cursor="pointer">
              Close
            </Box>
          </PopoverCloseTrigger>
        </PopoverContent>
      </PopoverRoot>
    </Flex>
  );
};

export default MessageInput;

import React,{useState} from "react";
import { Flex, Text, Image, Box } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import Actions from "@/components/Actions";
import Comment from "@/components/Comment";
import { Button } from "@/components/ui/button";

const PostPage = () => {

  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex>
          <Flex alignItems="center" gap={3} w="full">
            <Avatar src='/zuck-avatar.png' size="md" name="Mark Zuckerberg" />
            <Flex alignItems="center">
              <Text fontSize="sm" fontWeight="bold">Mark Zuckerberg</Text>
              <Image src="/verified.png" w={4} h={4} ml={4} alt="Verified Badge" />
            </Flex>
          </Flex>
          <Flex gap={4} alignItems="center"> 
            <Text fontSize={"sm"} color={"gray.light"} >1d</Text>
            <BsThreeDots/>
          </Flex>
      </Flex>
      <Text my={3}>Let's talk about Hives</Text>
      <Box
        position={"relative"}
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/post1.png"} w="full" />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>238 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} ></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} likes
        </Text> 
      </Flex>
      <Box borderBottom={"1px solid"} borderColor={"gray.dark"} my={3}/>
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post</Text>
        </Flex>
        <Button variant="surface">Get</Button>
      </Flex>
      <Box borderBottom={"1px solid"} borderColor={"gray.dark"} my={3}/>
      <Comment
        comment = "Looks really good!"
        createdAt = "2d"
        likes = {100}
        username = "johnpetterson"
        userAvatar = "https://bit.ly/dan-abramov"
      />
      <Comment
        comment = "useFull"
        createdAt = "3d"
        likes = {10}
        username = "janedoe"
        userAvatar = "https://bit.ly/sage-adebayo"
      />
      <Comment
        comment = "nice content"
        createdAt = "5d"
        likes = {150}
        username = "sallydoe"
        userAvatar = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
      />
      
    </>
  );
};

export default PostPage;

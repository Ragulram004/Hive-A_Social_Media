import React,{useEffect, useState} from "react";
import { Flex, Text, Image, Box, Spinner } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import Actions from "@/components/Actions";
import Comment from "@/components/Comment";
import { Button } from "@/components/ui/button";
import useShowToast from "@/hooks/useShowToast";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useParams } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { formatDistanceStrict } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "@/atom/userAtom";
import useDeletePost from "@/hooks/useDeletePost";

const PostPage = () => {
  const {user,loading} = useGetUserProfile()
  const showToast = useShowToast()
  const [post,setPost] = useState(null)
  const {pid} = useParams()
  const currentUser = useRecoilValue(userAtom)
  const {handleDeletePost} = useDeletePost()

  useEffect(() => {
    const getPost = async()=>{
      try{
        const res = await fetch(`/api/posts/${pid}`)
        const data = await res.json()
        if(data.error){
          showToast("Error",data.error,"error")
          return
        }
        console.log(data)
        setPost(data)
      }catch(error){
        showToast("Error",error.message,"error")
      }
    }  
    getPost()
  }, [pid])
  
  

  if(!user && loading){
    return(
      <Flex justifyContent={"center"} alignItems={"center"} height={"80vh"}>
        <Spinner size="xl" />
      </Flex>
    )
  }

  if(!post) return null
  return (
    <>
      <Flex>
          <Flex alignItems="center" gap={3} w="full">
            <Avatar src={user.profilePic} size="md" name="Mark Zuckerberg" />
            <Flex alignItems="center">
              <Text fontSize="sm" fontWeight="bold">
                {user.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={4} alt="Verified Badge" />
            </Flex>
          </Flex>
          <Flex gap={4} alignItems={"center"}>
            <Text fontSize={"xs"} color={"gray.light"} w={36} textAlign={"right"}>
              {formatDistanceStrict(new Date(post.createdAt), new Date())}
            </Text>
            {currentUser?._id === user._id && <MdOutlineDeleteOutline cursor={"pointer"} size={18} onClick={()=>handleDeletePost(post._id)} />}
          </Flex>
      </Flex>
      <Text my={3}>{post.text}</Text>
      {post.img && <Box
        position={"relative"}
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={post.img} w="full" />
      </Box>}

      <Flex gap={3} my={3}>
        <Actions post = {post} />
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
      {post.replies.map((reply)=>(
       <Comment
        key={reply._id}
        reply={reply}
        lastReply = {reply._id === post.replies[post.replies.length - 1]._id}
      /> 
      ))}
      
      
    </>
  );
};

export default PostPage;

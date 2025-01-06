import { Flex,Box, Image,Text, Separator  } from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from './ui/avatar'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'
import useShowToast from '@/hooks/useShowToast'
import {formatDistanceStrict } from 'date-fns'
import { MdOutlineDeleteOutline } from "react-icons/md";
import {  useRecoilValue } from 'recoil'
import userAtom from '@/atom/userAtom'
import { toaster } from './ui/toaster'
import useDeletePost from '@/hooks/useDeletePost'


const Post = ({post,postedBy}) => {
  const [user,setUser] = useState(null)
  const showToast = useShowToast()
  const navigate = useNavigate()
  const currentUser = useRecoilValue(userAtom)
  const {handleDeletePost} = useDeletePost()

  useEffect(()=>{
    const getUser = async()=>{
      try{
        const res = await fetch("/api/users/profile/"+postedBy)
        const data = await res.json()
        if(data.error){
          showToast("Error",data.error,"error")
          return
        }
        setUser(data)

      }catch(error){
        showToast("Error",error,"error")
        setUser(null)
      }
    }
    if(postedBy)getUser();
  },[postedBy])
  

  if(!user) return null
  return (
    <>
      <Flex gap={3} mb={4} py={5} w={"full"}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name={user.name} src={user?.profilePic}
            onClick={(e)=>{
              e.preventDefault()
              navigate(`/${user.username}`)
            }}
          />
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>💭</Text>}
            {post.replies[0] && (
              <Avatar
                w="25px"
                h="25px"
                name='sage abebayo' 
                src= {post.replies[0] .profilePic}
                position={"absolute"}
                top={"0px"}
                left={"7px"}
                padding="2px"
              />
            )}
            {post.replies[1] &&(
              <Avatar
                w="25px"
                h="25px"
                name='Dan Abramov'
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                left={"-7px"}
                padding="2px"
              />
            )}
            {post.replies[2] &&(
              <Avatar
                w="25px"
                h="25px"
                name='Random User'
                src={post.replies[2].userProfilePic}
                position={"absolute"}
                bottom={"-1px"}
                left={"22px"}
                padding="2px"
              />
            )}
            
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
            <Flex flex={1} flexDirection={"column"} gap={2}>
              <Flex justifyContent={"space-between"} w={"full"}>
                <Link  to={`/${user.username}/post/${post._id}`} >
                  <Flex w={"full"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}
                      onClick={(e)=>{
                        e.preventDefault()
                        navigate(`/${user.username}`)
                      }}
                      >{user?.username}</Text>
                    <Image src='/verified.png' w={4} h={4} ml={1}/>
                  </Flex>
                </Link>
                <Flex gap={4} alignItems={"center"}>
                  <Text fontSize={"xs"} color={"gray.light"} w={36} textAlign={"right"}>
                    {formatDistanceStrict(new Date(post.createdAt), new Date())}
                  </Text>
                  {currentUser?._id === user._id && <MdOutlineDeleteOutline cursor={"pointer"} size={18} onClick={()=> handleDeletePost(post._id)} />}
                </Flex>
              </Flex>
              <Link  to={`/${user.username}/post/${post._id}`} >
              <Text fontSize={"sm"} marginBottom={2}>{post.text}</Text>
                {post.img &&(
                  <Box
                  position={"relative"}
                  borderRadius={6}
                  overflow={"hidden"}
                  border={"1px solid"}
                  borderColor={"gray.light"}
                  >
                    <Image src={post.img} w="full" />
                  </Box>
                )}
              </Link>
            </Flex>
          
          <Flex gap={3} my={1}>
            <Actions post={post}/>
          </Flex>
        </Flex>
      </Flex>
      <Separator />
    </>
  )
}

export default Post

import React,{useEffect, useState} from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '@/components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '@/hooks/useShowToast'
import { Flex, Spinner } from '@chakra-ui/react'
import Post from '@/components/Post'
import useGetUserProfile from '@/hooks/useGetUserProfile'

const UserPage = () => {
  const {user,loading} = useGetUserProfile()
  const {username} = useParams()
  const showToast = useShowToast()
  const [posts,setPosts] = useState([])
  const [fetchingPosts, setFetchingPosts] = useState(true)

  useEffect(()=>{
   
    const getPosts = async() =>{
      setFetchingPosts(true)
      try{
        const res = await fetch(`/api/posts/user/${username}`)
        const data = await res.json()
        console.log(data)
        if(data.error){
          showToast("Error",data.error,"error")
          return
        }
        setPosts(data)
      }catch(error){
        showToast("Error",error.message,"error")
        setPosts([])
      }finally{
        setFetchingPosts(false)
      }
    }

    getPosts();
  },[username])

  if(!user && loading){
    return(
      <Flex justifyContent={"center"} alignItems={"center"} height={"80vh"}>
        <Spinner size="xl" />
      </Flex>
    )
  }
  if(!user && !loading){
    return(
      <Flex justifyContent={"center"} alignItems={"center"} height={"80vh"}>
        <h1>User not found</h1>
      </Flex>
    )
  } 
  return (
    <>
      <UserHeader user={user}/>
      {!fetchingPosts && posts.length === 0 && (
        <Flex justifyContent={"center"} alignItems={"center"} height={"80vh"}>
          <h1>No posts found</h1>
        </Flex>
      )}
      {fetchingPosts && (
        <Flex justifyContent={"center"} alignItems={"center"} height={"80vh"}>
          <Spinner size="xl" />
        </Flex>
      )}
      {posts.map((post) =>(
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ))}
    </>
  )
}

export default UserPage

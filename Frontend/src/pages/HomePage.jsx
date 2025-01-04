import { useEffect,useState } from "react"
import { Flex,Spinner } from "@chakra-ui/react"
import useShowToast from "@/hooks/useShowToast"
import Post from "@/components/Post"

const HomePage = () => {
  const[posts,setPosts] = useState([])
  const[loading,setLoading] = useState(true)
  const showToast = useShowToast()
  
  useEffect(()=>{
    const getFeedPosts = async() =>{
      try{
        const res = await fetch("/api/posts/feed")
        const data = await res.json()
        if(data.error){
          showToast("Error",data.error,"error")
          return
        }
        // console.log(data)
        setPosts(data)
      }catch(error){
        showToast("Error",error,"error")
      }finally{
        setLoading(false)
      }
    }
    getFeedPosts()
  },[showToast])
  
  return (
    <>
      {!loading && posts.length === 0 && (
          <Flex justifyContent={"center"} alignItems={"center"} height={"80vh"}>
            <h1>Follow Other Users To See The Feed</h1>
          </Flex>
      )}
      {loading && (
        <Flex justifyContent={"center"} alignItems={"center"} height={"80vh"}>
          <Spinner size="xl" /> 
        </Flex>
      )}

      {posts.map(post =>(
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ))}

    </>
  )
}

export default HomePage

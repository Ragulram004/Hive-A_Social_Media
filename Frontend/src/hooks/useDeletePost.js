import postAtom from '@/atom/postAtom'
import userAtom from '@/atom/userAtom'
import { toaster } from '@/components/ui/toaster'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

const useDeletePost = () => {
  const navigate = useNavigate()
  const user = useRecoilValue(userAtom)
  const [posts,setPosts] = useRecoilState(postAtom)

  const handleDeletePost = async(id)=>{
      if(!window.confirm("Are you sure you want to delete this post?")) return
      const deletePost = async()=>{
        const res = await fetch("/api/posts/"+id,{
          method:"DELETE"
        })
        const data = await res.json()
        if(data.error){
          showToast("Error",data.error,"error")
          throw new Error(data.error)
        }
        return data;
      }
      toaster.promise(deletePost(),{
        loading:{
          title:"Deleting Post...",
          description:"Please wait while we delete the post"
        },
        success:{
          title:"Success",
          description:"Post deleted successfully"
        },
        error:{
          title:"Error",
          description:"An error occurred while deleting the post"
        }
      })    
      setPosts(posts.filter(post => post._id !== id))
      navigate(`/${user.username}`)
  }
  return {handleDeletePost}
}

export default useDeletePost

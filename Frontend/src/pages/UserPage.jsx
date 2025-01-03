import React,{useEffect, useState} from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '@/components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '@/hooks/useShowToast'

const UserPage = () => {

  const [user,setUser] = useState(null)
  const {username} = useParams()
  const showToast = useShowToast()

  useEffect(()=>{
    const getUser = async()=>{
      try{
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json()
        if(data.error){
          showToast("Error",data.error,"error")
          return
        }
        setUser(data)
      }catch(error){
        showToast("Error",error,"error")
      }
    }
    getUser();
  },[username,showToast])

  if(!user) return null
  return (
    <div>
      <UserHeader user={user}/>
      <UserPost likes={1200} replies={485} postImg="/post1.png" postTitle="Lets talk about threads."/>
      <UserPost likes={548} replies={522} postImg="/post2.png" postTitle="What the hell."/>
      <UserPost likes={4986} replies={852} postImg="/post3.png" postTitle="Click bait"/>
      <UserPost likes={5465} replies={756} postTitle="First Hive"/>
    </div>
  )
}

export default UserPage

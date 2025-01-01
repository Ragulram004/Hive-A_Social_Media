import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '@/components/UserPost'

const UserPage = () => {
  return (
    <div>
      <UserHeader/>
      <UserPost likes={1200} replies={485} postImg="/post1.png" postTitle="Lets talk about threads."/>
      <UserPost likes={548} replies={522} postImg="/post2.png" postTitle="What the hell."/>
      <UserPost likes={4986} replies={852} postImg="/post3.png" postTitle="Click bait"/>
      <UserPost likes={5465} replies={756} postTitle="First Hive"/>
    </div>
  )
}

export default UserPage

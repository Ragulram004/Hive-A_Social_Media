import { Flex, Box, Text, Spinner } from '@chakra-ui/react'
import React from 'react'
import { Avatar } from './ui/avatar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import useFollowUnfollow from '@/hooks/useFollowUnfollow'

const SuggestedUser = ({user}) => {

  const {handleFollowUnfollow, updating, following} = useFollowUnfollow(user)

  return (
    <Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
			<Flex gap={2} as={Link} to={`${user.username}`}>
				<Avatar src = {user.profilePic} />
				<Box>
					<Text fontSize={"sm"} fontWeight={"bold"}>
						{user.username}
					</Text>
					<Text color={"gray.light"} fontSize={"sm"}>
						{user.name} 
					</Text>
				</Box>
			</Flex>
			<Button
				size={"xs"}
				color={following ? "black" : "white"}
				bg={following ? "white" : "blue.400"}
				onClick={handleFollowUnfollow}
				_hover={{
					color: following ? "black" : "white",
					opacity: ".8",
				}}
			>
				{updating ? <Spinner size={"xs"} /> : following ? "Following" : "Follow"}
			</Button>
		</Flex>
  )
}

export default SuggestedUser

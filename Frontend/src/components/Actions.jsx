import { useRef, useState } from "react";
import {
	Box,
	Button,
	Flex,
	Input,
	Text,
	Textarea,
	Spinner,	
} from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "@/atom/userAtom";
import useShowToast from "@/hooks/useShowToast";
import {
	PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
	PopoverCloseTrigger,
} from "@/components/ui/popover"
import postAtom from "@/atom/postAtom";

	

const Actions = ({ post }) => {
	const user = useRecoilValue(userAtom)
	const showToast = useShowToast()
	const [liked, setLiked] = useState(post.likes.includes(user?._id));
	const [posts,setPosts] = useRecoilState(postAtom)
	const [isLinking, setIsLinking] = useState(false)
	const [reply,setReply] = useState("")	
	const [isReplying,setIsReplying] = useState(false)
	const commentRef = useRef(null)
	
	const handleLikeAndUnlike = async() => {
		if(!user){
			return showToast("Error","You need to be logged in to like a post","error")
		}
		if(isLinking) return
		setIsLinking(true)
		try{
			const res = await fetch(`/api/posts/like/`+post._id,{
				method:"PUT",
				headers:{
					"Content-Type":"application/json"
				}
			})
			const data = await res.json()
			// console.log(data)
			if(data.error) return showToast("Error",data.error,"error")
			if(!liked){
				//add the id of the current user to the post.likes array
				const updatedPosts = posts.map((p) =>{
					if(p._id === post._id){
						return {...p,likes:[...p.likes,user._id]}
					}
					return p
				})
				setPosts(updatedPosts)
			}else{
				//remove the id of the current user from the post.likes
				const updatedPosts = posts.map((p)=>{
					if(p._id === post._id){
						return {...p,likes:p.likes.filter((id)=>id !== user._id)}
					}
					return p;
				})
				setPosts(updatedPosts)
			}
			setLiked(!liked)
		}catch(error){
			showToast("Error",error,"error")
		}finally{
			setIsLinking(false)
		}
	}

	const handleReply = async () => {
		if (!user) return showToast("Error", "You need to be logged in to reply to a post", "error");
		if (isReplying) return;
		setIsReplying(true);
		try {
			const res = await fetch("/api/posts/reply/" + post._id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: reply }),
			});
	
			const data = await res.json();
			if (data.error) return showToast("Error", data.error, "error");
	
			const updatedPosts = posts.map((p) => {
				if (p._id === post._id) {
					return { ...p, replies: [...p.replies, data] };
				}
				return p;
			});
	
			setPosts(updatedPosts);
			showToast("Success", "Reply added successfully", "success");
			setReply("");
		} catch (error) {
			showToast("Error", error.message || "An unknown error occurred", "error");
		} finally {
			setIsReplying(false);
		}
	};
	

	return (
		<>
			<Flex flexDirection='column'>
				<Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
					<svg
						aria-label='Like'
						color={liked ? "rgb(237, 73, 86)" : ""}
						fill={liked ? "rgb(237, 73, 86)" : "transparent"}
						height='19'
						role='img'
						viewBox='0 0 24 22'
						width='20'
						onClick={handleLikeAndUnlike}
					>
						<path
							d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
							stroke='currentColor'
							strokeWidth='2'
						></path>
					</svg>

					<svg
						aria-label='Comment'
						color=''
						fill=''
						height='20'
						role='img'
						viewBox='0 0 24 24'
						width='20'
						onClick={(e) => {e.preventDefault(); commentRef.current.click()}}
					>
						<title>Comment</title>
						<path
							d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
							fill='none'
							stroke='currentColor'
							strokeLinejoin='round'
							strokeWidth='2'
						></path>
					</svg>

					<RepostSVG />
					<ShareSVG />
				</Flex>
				<Flex gap={2} alignItems={"center"}>
						<Text color={"gray.light"} fontSize={"sm"}>{post.replies.length} replies</Text>
						<Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
						<Text color={"gray.light"} fontSize={"sm"}>
							{post.likes.length} likes
						</Text>
				</Flex>
			</Flex>
			<PopoverRoot >
				<PopoverTrigger>
					<Box as="button" ref={commentRef} style={{ display: "none" }} />
				</PopoverTrigger>
				<PopoverContent w={"300px"}>
					<PopoverArrow />
					<PopoverBody border={"1px solid"} borderColor={"gray.light"} p={4} borderRadius={"7px"}>
						{/* Content of the popover */}
						<FormControl display={"flex"} flexDirection={"column"} gap={4}>
							<PopoverTitle>
								<Text fontWeight={"bold"}>Leave a reply:</Text>
							</PopoverTitle>
							<Textarea value={reply} onChange={(e) => setReply(e.target.value)} minH={"50px"} maxH={"100px"} placeholder="Write here..." />
							<Button variant={"surface"} fontSize={"sm"} mt={2} size="sm" onClick={handleReply}>
								{isReplying ? <Spinner/> : "Reply"}
							</Button>
						</FormControl>
					</PopoverBody>
					<PopoverCloseTrigger/>
				</PopoverContent>
			</PopoverRoot>
		</>

	);
};

export default Actions;

const RepostSVG = () => {
	return (
		<svg
			aria-label='Repost'
			color='currentColor'
			fill='currentColor'
			height='20'
			role='img'
			viewBox='0 0 24 24'
			width='20'
		>
			<title>Repost</title>
			<path
				fill=''
				d='M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z'
			></path>
		</svg>
	);
};

const ShareSVG = () => {
	return (
		<svg
			aria-label='Share'
			color=''
			fill='rgb(243, 245, 247)'
			height='20'
			role='img'
			viewBox='0 0 24 24'
			width='20'
		>
			<title>Share</title>
			<line
				fill='none'
				stroke='currentColor'
				strokeLinejoin='round'
				strokeWidth='2'
				x1='22'
				x2='9.218'
				y1='3'
				y2='10.083'
			></line>
			<polygon
				fill='none'
				points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
				stroke='currentColor'
				strokeLinejoin='round'
				strokeWidth='2'
			></polygon>
		</svg>
	);
};
import React,{useRef, useState} from 'react'
import { Input, Stack, Textarea,Text,Flex,Image,Spinner } from "@chakra-ui/react"
import { Button } from './ui/button'
import { IoMdAdd } from "react-icons/io";
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
  PopoverFooter,
} from "./ui/popover"
import { LuImageUp } from "react-icons/lu";
import usePreviewImg from '@/hooks/usePreviewImg';
import { CloseButton } from './ui/close-button';
import { useRecoilValue } from 'recoil';
import userAtom from '@/atom/userAtom';
import useShowToast from '@/hooks/useShowToast';


const MAX_CHAR = 500

const CreatePost = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [postText, setPostText] = useState("")
  const {handleImageChange , imgUrl , setImgUrl} = usePreviewImg()
  const imageRef = useRef(null)
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR)
  const user = useRecoilValue(userAtom)
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)

  const handleTextChange = (e) => {
    const inputText = e.target.value
    if(inputText.length > MAX_CHAR){
      const truncatedText = inputText.slice(0,MAX_CHAR)
      setPostText(truncatedText)
      setRemainingChar(0)
    }else{
      setPostText(inputText)
      setRemainingChar(MAX_CHAR - inputText.length)
    }
  }

  const handleCreatePost = async() => {
    setLoading(true)
    try{
      const res = await fetch("/api/posts/create",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imgUrl
        })
      })
      const data = await res.json()
      console.log(data)
      if(data.error){
        showToast("Error",data.error,"error")
        return
      }
      showToast("Success","Post created successfully","success")
      setPostText("")
      setImgUrl("")
      setPopoverOpen(false);
    }catch(error){
      showToast("Error",error,"error")
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
     <PopoverRoot open={isPopoverOpen} >
      <PopoverTrigger asChild>
        <Button
          colorPalette = {"blue"}
          variant = {"surface" }
          position = {"fixed"}
          bottom = {10}
          right = {10}
          size = {"md"}
          onClick={() => setPopoverOpen(!isPopoverOpen)}
          titile = {"Create Post"}
        >
          <IoMdAdd  /> Post
        </Button>
      </PopoverTrigger>
      <PopoverContent w={{
        md: "300px",
        lg: "400px"
      }}>
        <PopoverArrow />
        <PopoverBody pb={4}>
          <PopoverTitle pb={2}
            fontWeight="bold"
            fontSize="lg"
          >Create Post</PopoverTitle>
          <Stack gap="4">
            <Textarea placeholder="Post content here..."
              onChange={handleTextChange}
              value={postText}
              maxBlockSize={"200px"}
            />
            <Text
              fontSize="xs"
              color="gray.400"
              textAlign="right"
              fontWeight="bold"
              m={1}
            >{remainingChar}/{MAX_CHAR}</Text>
            <Input hidden type='file' ref={imageRef} onChange={handleImageChange}/>
            <Flex justifyContent={"flex-end"}>
              <LuImageUp
                style={{
                  cursor: "pointer",
                  marginLeft:"5px",
                }}
                size={20}
                onClick={()=>imageRef.current.click()}
              />      
            </Flex>       
          </Stack>
          {imgUrl && (
            <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
              <Image borderRadius={3} src={imgUrl} alt='Seleted img' w={"50%"} />
              <CloseButton
                onClick={()=>{setImgUrl("")}}
                bg={"gray.dark"}
                position={"absolute"}
                top={2}
                right={2}
                size="xs"
              />
            </Flex>
          )}
          <PopoverFooter>
            <Button variant="surface" size="xs" mt={4} w={"full"} fontSize="sm"
              onClick={handleCreatePost}
            >
              {loading ? <Spinner size="sm" /> : "Post"}
            </Button>
          </PopoverFooter>
        </PopoverBody>
        <PopoverCloseTrigger onClick={() => setPopoverOpen(false)} />
      </PopoverContent>
    </PopoverRoot>
    </>
  )
}

export default CreatePost

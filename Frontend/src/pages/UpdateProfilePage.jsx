import React,{useRef, useState} from "react";
import { Card, Stack,  Text, Input, Button, FileUploadTrigger } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Field } from "@/components/ui/field";
import { useRecoilState } from "recoil";
import userAtom from "@/atom/userAtom";
import usePreviewImg from "@/hooks/usePreviewImg";
import useShowToast from "@/hooks/useShowToast";
import { toaster } from "@/components/ui/toaster";

const UpdateProfilePage = () => {
  const [user,setUser] = useRecoilState(userAtom)
  const [inputs,setinputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password:""
  })
  const {handleImageChange , imgUrl} = usePreviewImg()
  const fileRef = useRef(null)
  const showToast = useShowToast()

  const handleSubmit = async (e) => {
    e.preventDefault()    
    const updateProfile = async () => {
      const res = await fetch(`/api/users/update/${user._id}`,{
        method: "PUT",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({...inputs,profilePic:imgUrl})
      })
      const data = await res.json()
      if(data.error){
        showToast("Error",data.error,'error')
        return
      }
      // console.log(data)
      setUser(data)
      localStorage.setItem("user-hives",JSON.stringify(data))
    }
    toaster.promise(updateProfile(), {
      loading:{
        title:"Updating Profile",
        description:"Please wait while we update your profile"
      },
      success:{
        title:"Profile Updated",
        description:"Your profile has been updated successfully"
      },
      error:{
        title:"Update Failed",
        description:"Something went wrong while updating your profile."
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack align="center" spacing={6} my={10}>
        <Card.Root width="450px" borderWidth="1px" borderRadius="lg" p={4}>
          <Card.Title textAlign="center" fontSize={"2xl"} fontWeight={"bold"}>Update Profile</Card.Title>
          <Card.Body>
            {/* Avatar Section */}
            <Stack align="center"mb={3}>
              <Avatar
                height="100px"
                width="100px"
                boxShadow="lg "
                src={imgUrl || user.profilePic}
                name={inputs.name}
              />
              <Button size="sm" variant="outline" colorScheme="blue"
                onClick={()=> fileRef.current.click()}
              >
                Change Avatar
              </Button>
              <Input type="file" hidden  ref={fileRef} onChange={handleImageChange} />
            </Stack>

            {/* User Info Section */}
            <Stack spacing={4}>
              <Field label="Full Name">
                <Input placeholder="FullName" type="text"
                  value={inputs.name}
                  onChange={(e) => setinputs({...inputs,name:e.target.value})}
                />
              </Field>
              <Field label="Username">
                <Input placeholder="UserName" type="text"
                  value={inputs.username}
                  onChange={(e) => setinputs({...inputs,username:e.target.value})}
                />
              </Field>
              <Field label="Email">
                <Input placeholder="your-email@example.com" type="email" 
                  value={inputs.email}
                  onChange={(e) => setinputs({...inputs,email:e.target.value})}
                />
              </Field>
              <Field label="Bio">
                <Input placeholder="your bio " type="text"
                  value = {inputs.bio}
                  onChange={(e) => setinputs({...inputs,bio:e.target.value})}
                />
              </Field>
              <Field label = "Password">
                <Input placeholder="Enter your password" type="password"
                  value = {inputs.password}
                  onChange={(e) => setinputs({...inputs,password:e.target.value})}
                />
              </Field>
            </Stack>
          </Card.Body>

          {/* Action Buttons */}
          <Card.Footer mt={6} display="flex" justifyContent="space-between">
            <Button variant="outline" colorScheme="red">
              Cancel
            </Button>
            <Button variant="solid" colorScheme="blue" type="submit">
              Submit
            </Button>
          </Card.Footer>
        </Card.Root>
      </Stack>
    </form>
  );
};

export default UpdateProfilePage;

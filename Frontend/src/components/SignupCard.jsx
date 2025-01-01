import { useState } from "react"
import { Button, Card, Input, Stack, Flex, Text, Link } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { PasswordInput } from "./ui/password-input"
import { useSetRecoilState } from "recoil"
import authScreenAtom from "@/atom/authAtom"
import useShowToast from "@/hooks/useShowToast"
import userAtom from "@/atom/userAtom"


const SignupCard = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const [inputs, setInputs] = useState({
    name:"",
    username:"",
    email:"",
    password:""
  })
  const showToast = useShowToast()
  const setUser = useSetRecoilState(userAtom)

  const handleSignup = async() =>{
    try{
      const res = await fetch("/api/users/signup",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      })
      const data = await res.json()
      if(data.error){
        showToast(null,data.error,"error")
        return
      }

      localStorage.setItem("user-hives",JSON.stringify(data))
      setUser(data)
    }catch(error){
      showToast(null,error,"error")
    }
  }

  return (
    <>
     <Flex justifyContent="center" alignItems={"center"}>
      <Card.Root maxW={{base:"full" ,sm:"500px"}} borderWidth="1px" borderRadius="lg" p={2} pb={6}>
          <Card.Header>
            <Flex direction="column" align="center">
              <Card.Title fontSize="2xl" fontWeight="bold">Sign up</Card.Title>
            </Flex>
            <Flex direction="column" align="center">
              <Card.Description color="gray.500" fontSize="sm">
                Fill in the form below to create an account
              </Card.Description>
            </Flex>
          </Card.Header>
          <Card.Body>
            <Stack direction={['column','row']} gap={4} mb={4}>
              <Field label="Full name" required >
                <Input placeholder="Your fullname" 
                  onChange={(e) => setInputs({...inputs, name:e.target.value})}
                  value={inputs.name}
                />
              </Field>
              <Field label="Username" required>
                <Input placeholder="Your username"
                  onChange={(e) => setInputs({...inputs, username:e.target.value})}
                  value={inputs.username}
                />
              </Field>
            </Stack>
            <Stack gap="4" w="full">
              <Field label="Email" required>
                <Input placeholder="Your email address" type="email"
                  onChange={(e)=>setInputs({...inputs, email:e.target.value})}
                  value={inputs.email}
                />
              </Field>
              <Field label="Password" required >
                <PasswordInput placeholder="Your password" type="password"
                  onChange={(e) => setInputs({...inputs, password:e.target.value})}
                  value = {inputs.password}
                />
              </Field>
            </Stack>
          </Card.Body>
          <Card.Footer  gap={2}>
            <Button w={"full"} 
              size={"sm"} 
              variant="solid" 
              colorScheme="blue"
              onClick={handleSignup}
            >
              Sign up
            </Button>
          </Card.Footer>
          <Flex direction="column" align="center">
            <Text align="center" fontSize="sm" mt={2}>
              Already a user?{" "}
              <Link color="blue.400"
                onClick={()=> setAuthScreen('login')}
              >
                Login
              </Link>
            </Text>
          </Flex>
        </Card.Root>
     </Flex>
    </>
  )
}

export default SignupCard

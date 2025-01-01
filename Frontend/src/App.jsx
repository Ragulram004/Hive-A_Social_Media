import { Container} from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import { Toaster } from './components/ui/toaster'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { useRecoilValue } from 'recoil'
import userAtom from './atom/userAtom'
import LogoutButton from './components/LogoutButton'


function App() {
  const user = useRecoilValue(userAtom)

  return (
    <Container maxW="620px">
    <Toaster/>
    <Header/>
     <Routes>
      <Route path="/" element={user ? <HomePage/> : <Navigate to="/auth"/>} />
      <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to= '/' />} />
      <Route path="/:username" element={<UserPage/>} />
      <Route path="/:username/post/:pid" element={<PostPage/>} />
     </Routes>
     {user && <LogoutButton/>}
    </Container>
  )
}

export default App

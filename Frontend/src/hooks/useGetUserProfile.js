import {useEffect,useState} from 'react'
import useShowToast from './useShowToast'
import { use } from 'react'
import { useParams } from 'react-router-dom'

const useGetUserProfile = () => {
  const [user,setUser] = useState(null)
  const showToast = useShowToast()
  const [loading, setLoading] = useState(true)  
  const {username} = useParams()

  useEffect(() => {
      setLoading(true)
      const getUser = async()=>{
        try{
          const res = await fetch(`/api/users/profile/${username}`)
          const data = await res.json()
          if(data.error){
            showToast("Error",data.error,"error")
            return
          }
          if(data.isDisabled){
            setUser(null)
            return
          }
          setUser(data)
        }catch(error){
          showToast("Error",error.message,"error")
        }finally{
          setLoading(false)
        }
      }
      getUser()
    },[username])
    return {loading,user}
}

export default useGetUserProfile

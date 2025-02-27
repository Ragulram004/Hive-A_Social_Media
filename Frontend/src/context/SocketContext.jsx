import userAtom from "@/atom/userAtom";
import { useEffect, createContext, useState, useContext } from "react";
import { useRecoilValue } from "recoil";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = ()=>{
  return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) =>{
  const [socket,setSocket] = useState(null);
  const [onlineUsers,setOnlineUsers] = useState([])
  const user = useRecoilValue(userAtom)
  
  useEffect(()=>{
    const socket = io("https://hive-mt2l.onrender.com",{
      query:{
        userId: user?._id
      }
    })
    setSocket(socket)

    socket.on("getOnlineUsers",(users) => {
      setOnlineUsers(users)
    })
    return ()=> socket && socket.close()
  },[user?._id])
  
  // console.log(onlineUsers)
  return(
    <SocketContext.Provider value={{socket, onlineUsers}}>
      {children}
    </SocketContext.Provider>
  )
}
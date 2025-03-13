import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Header =()=>{
    const {currentUser,logout} = useAuth();
    const [greetings,setGreetings] = useState("");

    const today = new Date();
    const ctime = today.getHours();

    
}
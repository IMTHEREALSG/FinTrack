import { useState,useEffect } from 'react';
import {collection,getDoc,doc,getDocs} from 'firebase/firestore';
import {HashRouter,Routes,Route} from 'react-router-dom';
import { AuthProvider,useAuth } from './context/AuthContext';
import { firestore } from './firebase';
import Login from './pages/Login';
import Signup from './pages/SignUp';

import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth(); 
  const usersCollectionRef = collection(firestore, 'users');

  useEffect(() => {
    if (!currentUser) return; 
    
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    
  }, [currentUser]);


  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </HashRouter>
  )
}

export default App

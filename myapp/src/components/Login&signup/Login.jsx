import React from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [username, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate=useNavigate()
    const handleSubmit = async (e) => {

        e.preventDefault();
        
        
            const response = await axios.post('http://localhost:3000/api/v1/user/login', {
             withCredentials: true,
            username, email, password 
        })
            // if (response.data?.exists) alert("user already exists")
            const newToken = response.data.token
            setToken(newToken);
            console.log(response);
            localStorage.setItem('token', newToken);
            
            if(response.data.success===true){

                // const cookie = response.headers['set-cookie'];
                // console.log(cookie);
                alert(response.data.message)
                
                navigate('/user')
            }

        
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl id="username" isRequired mb={4}>
                <FormLabel>Username</FormLabel>
                <Input type="text" placeholder="Enter your username" onChange={(e) => setName(e.target.value)} />
            </FormControl>
             <FormControl id="email" isRequired mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired mb={6}>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
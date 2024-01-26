import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

const SignupForm = () => {
   
    const [username,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
       const response = await axios.post('http://localhost:3000/api/v1/user/register',{username,email,password})
       if(response.data?.exists) alert("user already exists")
      
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl id="name" isRequired mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>
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
                Signup
            </Button>
        </form>
    );
};

export default SignupForm;
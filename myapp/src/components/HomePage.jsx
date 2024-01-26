import React, { useState, useRef } from 'react'
import { Box, FormControl, FormLabel, Input, Button, Text, Flex, InputGroup, InputLeftElement, Textarea, VStack } from "@chakra-ui/react"
// import {SearchIcon} from "@chakra-ui/icon"
import { useJwt } from "react-jwt";
import axios from "axios"
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom"

const HomePage=()=>{
    const token = localStorage.getItem('token');
    const { decodedToken, isExpired } = useJwt(token);
    console.log(decodedToken);
    console.log(token);
    console.log("doc"+document.cookie);
    // let user=null;
    // if (token) {
    //    user=decodedToken

    // }
    const navigate=useNavigate()
    const logoutHandler =()=>{
        axios.get('http://localhost:3000/api/v1/user/logout').then(res=>{
            
            console.log(res)
            localStorage.removeItem('token');
            navigate('/')
        }).catch(err=>{
            console.log(err);
        })

    }
    const [name,setName]=useState();
    const [location,setLocation]=useState();
    const [price,setPrice]=useState();
    const [description,setDescription]=useState();
    // const fileInputRef = useRef(null);
    const [file,setFile]=useState(null)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        // formData.append('file', fileInputRef?.current?.files[0]);
        // console.log(fileInputRef.current);
        formData.append('name', name);
        formData.append('location', location);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('file',file)
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/submit', {
                withCredentials: true,
                method: 'POST',
                body: formData,
            });

            // Handle the response as needed
            console.log('Response:', response);
        } catch (error) {
            console.log("error",error)

        }
    }
    
    return (
        <>
       
            <Box bg="#3498db" p={4} color="white">
                <Flex justify="space-between" align="center" maxWidth="1200px" mx="auto">
                    
                    <Text fontSize="xl" fontWeight="bold">
                        DreamHomeReality
                    </Text>

                    
                    <Flex align="center">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                               
                            </InputLeftElement>
                            <Input type="search" placeholder="Search..." />
                        </InputGroup>
                        <Button ml={2} colorScheme="teal">
                            Search
                        </Button>
                    </Flex>
                </Flex>
            </Box>
            <Box h={"8rem"} w={"15rem"} bgColor={'#3498db'} mt={'2rem'} borderRadius={"2rem"} boxShadow="lg" p="8" rounded="lg" >
                <Flex justifyContent={"center"} alignItems={"center"}>
                   
                <VStack>
                <Text children={decodedToken?.name} color={"wheat"}/>
                
                <Text children={decodedToken?.email} color={'wheat'}/>
                    </VStack>
                    <Button ml={"2rem"} onClick={logoutHandler}>
                    <TbLogout2/>

                    </Button>
                </Flex>
            </Box>
            <Box p={4} maxW="500" mx="auto" border={"1px"} boxShadow={"lg"} borderColor="gray.300" borderRadius="md" mt="50px">


                <form onSubmit={handleSubmit}>
                    <Text fontSize={"x-large"} fontWeight={"bold"} color={"blue"}>Add a new property</Text>
                    <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                    </FormControl>

                    <FormControl id="file" mt={4} isRequired>
                        <FormLabel>Picture</FormLabel>
                        <Input type="file" onChange={(e)=>setFile(e.target.files[0])} />
                        <Text fontSize="sm" mt={2} color="gray.600">
                            Please choose a file to upload.
                        </Text>
                    </FormControl>
                    <FormControl id="text" mt={4} isRequired>
                        <FormLabel>Location</FormLabel>
                        <Input type="text" placeholder="Enter your location" onChange={(e) => setLocation(e.target.value)} />
                    </FormControl>
                    <FormControl id="text" mt={4} isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input type="text" placeholder="Add price" onChange={(e) => setPrice(e.target.value)} />
                    </FormControl>
                    <FormControl id="text" mt={4} isRequired>
                        <FormLabel>Description</FormLabel>
                        {/* <Input type="textarea" placeholder="Description" /> */}
                        <Textarea placeholder="Describe something about this property" size="md" onChange={(e) => setDescription(e.target.value)} />

                    </FormControl>
                    <Button type="submit" colorScheme="blue" mt={8} width={"md"}>
                        Add property
                    </Button>
                </form>
            </Box>

        </>
    )
}

export  default HomePage;
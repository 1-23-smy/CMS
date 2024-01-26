import React, { useState } from 'react'
import Card from './Card.jsx'
import { HStack, VStack,Box,Flex,InputGroup,Input,Button,Text} from "@chakra-ui/react"
import { useEffect } from 'react'
import axios from 'axios';
const Home = () => {
    const [data,setData]=useState([])
    useEffect(() => {
        // Make an API request using Axios
        axios.get('http://localhost:3000/api/v1/user/allPropertyDetails')
            .then(response => {
                // Set the received data in state
                setData(response.data.propertyDetails);
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

  return (
   <>
          <Box bg="#3498db" p={4} color="white" width={""}>
              <Flex justify="space-between" align="center" maxWidth="300rem" mx="auto">
                  {/* Text on the left side */}
                  <Text fontSize="xl" fontWeight="bold">
                      DreamHomeReality
                  </Text>

                  {/* Search field and button on the right side */}
                  <Flex align="center">
                      <InputGroup>
                          
                          <Input type="search" placeholder="Search..." />
                      </InputGroup>
                      <Button ml={2} colorScheme="teal">
                          Search
                      </Button>
                  </Flex>
              </Flex>
          </Box>     
   <Box>
    <VStack >
    {data.map((item)=>(
        <Card key={item._id} image={item.picture.url} name={item.name} description={item.description} location={item.location} price={item.price} id={item._id}/>    
    ))}
    
              </VStack>

   </Box>
   </>
  )
}

export default Home
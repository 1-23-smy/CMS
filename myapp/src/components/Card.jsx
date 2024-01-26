import React, { useState,useEffect } from 'react';
import { Box, Image, Text, Flex, Button, VStack, Grid, useColorModeValue } from '@chakra-ui/react';
import axios  from 'axios';
const Card = ({image,name,location,description,price,id}) => {
    let boxBg = useColorModeValue("white !important", "#111c44 !important");
    let mainText = useColorModeValue("gray.800", "white");
    let secondaryText = useColorModeValue("gray.400", "gray.400");
    const [Id,setId]=useState(id);
    const i=id.toString();
    // console.log(i);
    
    const btnHandler=()=>{

        setId(i)
        // console.log(Id);
        axios.get(`http://localhost:3000/api/v1/user/propertyDetails/${Id}`)
            .then(response => {
                // Set the received data in state
                
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        

    }
    // console.log(Id);
    // const param = "65b12b040a1dab60560947b5"

        

      return (
        
          
        
            <>
            
           
                <Flex
                    borderRadius='20px'
                    bg={boxBg}
                    p='20px'
                    h='345px'
                    w={{ base: "315px", md: "345px" }}
                    alignItems='center'
                    direction='column'>
                    <Image
                        src={image}
                        maxW='100%'
                        borderRadius='20px'
                    />
                    <Flex flexDirection='column' mb='30px'>
                        <Image
                            src={image}
                            border='5px solid red'
                            mx='auto'
                            borderColor={boxBg}
                            width='68px'
                            height='68px'
                            mt='-38px'
                            borderRadius='50%'
                        />
                        <Text
                            fontWeight='600'
                            color={mainText}
                            textAlign='center'
                            fontSize='xl'>
                            {name}
                        </Text>
                        <Text
                            color={secondaryText}
                            textAlign='center'
                            fontSize='sm'
                            fontWeight='500'>
                          <Text children="Description" fontWeight={"bold"} color={"black"}/>  {description}
                        </Text>
                    </Flex>
                    <Flex justify='space-between' w='100%' px='36px'>
                        <Flex flexDirection='column'>
                            <Text
                                fontWeight='600'
                                color={mainText}
                                fontSize='xl'
                                textAlign='center'>
        
                            </Text>
                            <Text color={secondaryText} fontWeight='500'>
                               <Text children="Location" color={'black'}>
                                  {`Location:${location}`}
                               </Text> 
                            </Text>
                        </Flex>
                        <Flex flexDirection='row'>
                            <VStack>
                            <Text
                                fontWeight='300'
                                color={mainText}
                                fontSize='xl'
                                textAlign='center' ml={"2rem"}>
                                 {`price:${price}`} 
                            </Text>
                          </VStack>
                            
                        </Flex>
                        <Flex flexDirection='column'>
                            
                            <Text color={secondaryText} fontWeight='500'>
                              
                            </Text>
                            
                        </Flex>
                    </Flex>
                <VStack>
                <Box>
                    <Button onClick={btnHandler}>
                        View Details
                    </Button>
                </Box>
            
              </VStack>
                </Flex>
            </>
            
     
                     
       ) 
    

                  }

export default Card;
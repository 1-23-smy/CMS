import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import LoginForm from '../components/Login&signup/Login.jsx';
import SignupForm from '../components/Login&signup/Signup.jsx';

const LoginSignup = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (index) => {
        setTabIndex(index);
    };

    return (
        <ChakraProvider>
            <Box p={8} maxW="400px" mx="auto" mt="50px" boxShadow="lg" border="1px" borderColor="gray.300" borderRadius="md">
                <Heading mb={4} textAlign="center" color="teal.500">
                    Login/Signup Page
                </Heading>
                <Tabs isFitted variant="enclosed" index={tabIndex} onChange={handleTabChange}>
                    <TabList mb={4}>
                        <Tab>Login</Tab>
                        <Tab>Signup</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <LoginForm />
                        </TabPanel>
                        <TabPanel>
                            <SignupForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </ChakraProvider>
    );
};

export default LoginSignup;
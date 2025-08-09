import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { useHistory } from "react-router";
import { useEffect } from "react";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container
      maxW="xl"
      centerContent
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={10}
    >
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="rgba(2, 6, 23, 0.5)"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="whiteAlpha.300"
        backdropFilter="saturate(160%) blur(20px)"
        boxShadow="0 8px 32px rgba(2, 6, 23, 0.65)"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          VibeSync
        </Text>
      </Box>
      <Box
        bg="rgba(2, 6, 23, 0.5)"
        w="100%"
        p={6}
        borderRadius="lg"
        borderWidth="1px"
        borderColor="whiteAlpha.300"
        backdropFilter="saturate(160%) blur(22px)"
        boxShadow="0 8px 32px rgba(2, 6, 23, 0.65)"
      >
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;

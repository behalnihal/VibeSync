import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import { AttachmentIcon, LockIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
// Removed Lottie typing animation; using a static hero image instead

const LandingPage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      history.replace("/chats");
    }
  }, [history]);

  // No animation config needed for static image

  return (
    <Box w="100%" minH="100vh" overflowX="hidden">
      {/* Top bar */}
      <Container maxW="7xl" px={{ base: 6, md: 10 }}>
        <Flex as="header" align="center" justify="space-between" py={6}>
          <HStack spacing={3}>
            <Image
              src="/icon.png"
              alt="VibeSync logo"
              boxSize={9}
              borderRadius="md"
              filter="brightness(0) invert(1)"
            />
            <Text fontSize="xl" fontWeight="700">
              VibeSync
            </Text>
          </HStack>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={() => history.push("/auth")}>
              Log in
            </Button>
            <Button variant="gradient" onClick={() => history.push("/auth")}>
              Get Started
            </Button>
          </HStack>
        </Flex>
      </Container>

      {/* Hero */}
      <Box position="relative" overflow="hidden">
        <Container maxW="7xl" px={{ base: 6, md: 10 }}>
          <Flex
            w="100%"
            direction={{ base: "column", md: "row" }}
            align="center"
            pt={{ base: 8, md: 16 }}
            pb={{ base: 10, md: 20 }}
            gap={8}
          >
            <Stack spacing={6} flex="1">
              <Heading as="h1" size="2xl" lineHeight={1.2}>
                Chat. Share. Vibe.
              </Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.300">
                A sleek, real-time chat platform with group chats,
                notifications, and more — built for speed and simplicity.
              </Text>
              <HStack spacing={4}>
                <Button
                  size="lg"
                  variant="gradient"
                  onClick={() => history.push("/auth")}
                >
                  Start messaging
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => history.push("/auth")}
                >
                  Create an account
                </Button>
              </HStack>
            </Stack>
            <Box
              flex="1"
              w="100%"
              maxW={{ base: "100%", md: "520px" }}
              alignSelf={{ base: "stretch", md: "auto" }}
              sx={{ perspective: "1000px" }}
            >
              <Box
                bg="rgba(17, 24, 39, 0.7)"
                border="1px solid"
                borderColor="gray.700"
                borderRadius="2xl"
                boxShadow="0 20px 50px rgba(0,0,0,0.5)"
                p={6}
                w="100%"
                transition="transform 350ms ease, box-shadow 350ms ease, border-color 350ms ease"
                transform="translateZ(0)"
                sx={{ transformStyle: "preserve-3d" }}
                _hover={{
                  transform: "rotateX(6deg) rotateY(-6deg) scale(1.02)",
                  boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
                  borderColor: "teal.400",
                }}
              >
                <AspectRatio ratio={16 / 9} w="100%">
                  <Image
                    src="https://github.com/user-attachments/assets/e1f9b2cd-8eed-46d1-b56c-fae4615b9da7"
                    alt="VibeSync chat preview"
                    objectFit="cover"
                    borderRadius="lg"
                  />
                </AspectRatio>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features */}
      <Container maxW="7xl" px={{ base: 6, md: 10 }} pb={{ base: 16, md: 24 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Feature
            icon={RepeatClockIcon}
            title="Real-time messaging"
            desc="Instant delivery powered by websockets for a smooth, live experience."
          />
          <Feature
            icon={AttachmentIcon}
            title="Group chats"
            desc="Create, update, and collaborate in dynamic group conversations."
          />
          <Feature
            icon={LockIcon}
            title="Secure by default"
            desc="Auth, protected routes, and sensible defaults to keep your data safe."
          />
        </SimpleGrid>
        <Flex justify="center" mt={12}>
          <Button
            size="lg"
            variant="gradient"
            onClick={() => history.push("/auth")}
          >
            Try VibeSync free
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

const Feature = ({ icon, title, desc }) => (
  <Stack
    spacing={4}
    p={6}
    bg="rgba(17, 24, 39, 0.7)"
    border="1px solid"
    borderColor="gray.700"
    borderRadius="xl"
    boxShadow="md"
  >
    <Icon as={icon} w={6} h={6} color="teal.300" />
    <Stack spacing={1}>
      <Text fontWeight="700">{title}</Text>
      <Text color="gray.400">{desc}</Text>
    </Stack>
  </Stack>
);

export default LandingPage;

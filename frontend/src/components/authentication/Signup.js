import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  useToast,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ChatState } from "../../Context/ChatProvider";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setConfirmShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setPicLoading] = useState();
  const toast = useToast();
  const history = useHistory();
  const { setUser } = ChatState();

  const handleClick = () => setShow(!show);
  const confirmHandleClick = () => setConfirmShow(!showConfirm);
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dhcsk9xce");
      fetch("https://api.cloudinary.com/v1_1/dhcsk9xce/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  return (
    <VStack spacing="5px" color="gray.100">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          variant="filled"
          bg="gray.700"
          color="gray.100"
          _placeholder={{ color: "gray.400" }}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          variant="filled"
          bg="gray.700"
          color="gray.100"
          _placeholder={{ color: "gray.400" }}
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            variant="filled"
            bg="gray.700"
            color="gray.100"
            _placeholder={{ color: "gray.400" }}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button
              h="1.75rem"
              size="sm"
              variant="ghost"
              color="gray.200"
              _hover={{ bg: "gray.700" }}
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirm ? "text" : "password"}
            variant="filled"
            bg="gray.700"
            color="gray.100"
            _placeholder={{ color: "gray.400" }}
            placeholder="Enter Your Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement>
            <Button
              h="1.75rem"
              size="sm"
              variant="ghost"
              color="gray.200"
              _hover={{ bg: "gray.700" }}
              onClick={confirmHandleClick}
            >
              {showConfirm ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          className="file-input"
          variant="outline"
          borderColor="gray.600"
          color="gray.200"
          _hover={{ borderColor: "gray.500" }}
          _focus={{ borderColor: "gray.500" }}
          _placeholder={{ color: "gray.400" }}
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        width="100%"
        mt={4}
        bgGradient="linear(to-r, purple.500, blue.500)"
        color="white"
        _hover={{ bgGradient: "linear(to-r, purple.600, blue.600)" }}
        _active={{ transform: "scale(0.98)" }}
        borderRadius="md"
        onClick={submitHandler}
        isLoading={loading}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;

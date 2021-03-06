import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { axios } from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const baseUrl = "http://localhost:5000";
  const handleClick = () => setShow(!show);
  //image submit function

  //   const postDetails = (pics) => {
  //     setLoading(true);
  //     if (pics === undefined) {
  //       toast({
  //         title: "Please Select an Image !",
  //         status: "warning",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "bottom",
  //       });
  //       return;
  //     }

  //     if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //       const data = new FormData();
  //       data.append("file", pics);
  //       data.append("upload_preset", "chat-app");
  //       data.append("cloud_name", "nashra");
  //       fetch("https://api.cloudinary.com/v1_1/nashra/image/upload", {
  //         method: "post",
  //         body: data,
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setPic(data.url.toString());
  //           // console.log(data.url.toString());
  //           setLoading(false);
  //         })

  //         .catch((err) => {
  //           console.log(err);
  //           setLoading(false);
  //         });
  //     } else {
  //       toast({
  //         title: "Please Select an Image !",
  //         status: "warning",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "bottom",
  //       });
  //       setLoading(false);
  //       return;
  //     }
  //   };

  const submitHandler = async () => {
    setLoading(true);

    // first check whether user have entered everything or not
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields !",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // check if the pw and cnfrm pw is same or not

    if (password !== confirmpassword) {
      toast({
        title: "Password doen not match!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // now sending the data through the api to the backend

    let dataSend = {
      name: name,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
    };

    const res = await fetch(`${baseUrl}/user/signup`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // HANDLING ERRORS
      .then((res) => {
        console.log(res);
        if (res.status > 199 && res.status < 300) {
          toast({
            title: "Registration Successful !",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        } else if (res.status > 399 && res.status < 500) {
          toast({
            title: "User already exist !",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
      });
  };

  return (
    <VStack spacing="5px">
      {/* Name */}
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      {/* Email */}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* Password */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Confirm Password */}
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Pic */}

      {/* <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl> */}

      {/* Sign up  */}
      <Button
        colorScheme="blue"
        width="100%"
        color="white"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;

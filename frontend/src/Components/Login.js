import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";


const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const baseUrl = "http://localhost:5000";


  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    // first check whether user have entered everything or not
    if (!email || !password) {
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

    // now sending the data through the api to the backend

    let dataSend = {
      email: email,
      password: password,
    };

    const res = await fetch(`${baseUrl}/user/login`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

      // HANDLING ERRORS
      .then((res) => {
        // console.log(res);
        if (res.status > 199 && res.status < 300) {
          toast({
            title: "Login Successful !",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        } else if (res.status > 399 && res.status < 500) {
          toast({
            title: "Invalid email or password !",
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

      {/* Sign up  */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;

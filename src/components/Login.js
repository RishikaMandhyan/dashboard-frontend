import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import axiosPrivateInstance from "../axios";

const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;

  justify-content: center;
  height: 100vh;
  margin: auto;
  background-color: #fafafa;
`;

const SubContainer = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  height: fit-content;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const MasterLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #1e2640;
`;

const Title2 = styled.h1`
  font-size: 20px;
  margin-bottom: 20px;
  color: #1e2640;
`;
const Input = styled.input`
  width: 100%;
  height: 45px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #1e2640;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #454e6c;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const CreateAccountLink = styled(Link)`
  color: #1e2640;
  font-weight: bold;
  display: block;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginImage = styled.img`
  max-width: 650px;
  border-radius: 40px;
  height: 500px;
`;

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef(null);
  const errRef = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect(() => {
  //   setError("");
  // }, [username, password, email]);

  const handleSubmit = async () => {
    //first check here if username/email and password are of required formats or not
    try {
      const res = await axiosPrivateInstance.post(
        "/login",
        {
          username: username,
          password: password,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json", //this tells the sserver tht the body of our request is in JSON
          },
          withCredentials: true, //this ensures tht cookies are also sent in this cross-origin request
          //which is by default false
        }
      );
      //console.log(res);
      dispatch(
        addUser({
          username: username,
          email: email,
          accessToken: res?.data?.accessToken,
        })
      );
      navigate("/dashboard");
    } catch (err) {
      if (!err?.response) {
        setError("No response from server");
      } else if (err?.response?.data) {
        setError(err?.response?.data);
      } else {
        setError("Login failed");
      }
    }

    //errRef.current.focus(); //for accessibility for screen readers
  };

  return (
    <Container>
      <SubContainer>
        <LoginImage src="/assets/Login.jpg" />
        <MasterLogin>
          <ErrorMessage ref={errRef}>{error}</ErrorMessage>
          <Title>Welcome to your Dashboard!</Title>
          <Title2>User Login</Title2>
          <Input
            ref={userRef}
            id="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>

          <Input
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>

          <Input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <SubmitButton onClick={handleSubmit}>Login</SubmitButton>
          <CreateAccountLink to="/signup">Create an account!</CreateAccountLink>
        </MasterLogin>
      </SubContainer>
    </Container>
  );
};

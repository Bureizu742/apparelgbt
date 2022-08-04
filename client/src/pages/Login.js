import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { LOGIN_USER } from '../utils/mutations';
import styled from 'styled-components'
import { mobile } from "../responsive";
import Auth from '../utils/auth';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #f4f0ec;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #778899;
  ${mobile({ width: "75%" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: white;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;


function Login () {
  const [formState, setFormState] = useState({ username: '', password: ''});
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { username: formState.username, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  return (
    <Container>
      <Wrapper>
        <Title> WE'VE MISSED YOU. </Title>
        <Form onSubmit={handleFormSubmit}>
          <Input 
          placeholder="username" 
          name='username'
          type='username'
          id='username'
          onChange={handleChange}
          />
          <Input 
          placeholder="password" 
          name='password'
          type='password'
          id='password'
          onChange={handleChange}
          />
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
          <Button type='submit'> LOGIN</Button>
          <Button> FORGOT PASSWORD? </Button>
          <Button> CREATE A NEW ACCOUNT</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login;
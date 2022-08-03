import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { mobile } from "../responsive";
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #f3f5f4;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #cfcfc4;
  ${mobile({ width: "75%" })}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 10px 0px 0px;
  padding: 10px
`;

const Conditions = styled.span`
  font-size: 15px;
  margin: 20px 20px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: white;
  cursor: pointer;
`;

function Signup(props) {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        username: formState.username
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
        <Title> JOIN THE CLUB. </Title>
        <Form onSubmit={handleFormSubmit}>
          <Input
            placeholder="first name"
            name='firstName'
            type='firstName'
            id='firstName'
            onChange={handleChange}
          />
          <Input
            placeholder="last name"
            name='lastName'
            type='lastName'
            id='lastName'
            onChange={handleChange}
          />
          <Input
            placeholder="username"
            name='username'
            type='username'
            id='username'
            onChange={handleChange}
          />
          <Input
            placeholder="youremail@test.com"
            name='email'
            type='email'
            id='email'
            onChange={handleChange}
          />
          <Input
            placeholder="password"
            name='password'
            type='password'
            id='pwd'
            onChange={handleChange}
          />
          <Conditions>
            By creating an account, I state that I have read and understood the <b>terms and conditions</b>.
          </Conditions>
          <Button type='submit'> CREATE ACCOUNT</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Signup
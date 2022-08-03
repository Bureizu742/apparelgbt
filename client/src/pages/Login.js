import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import styled from 'styled-components'
import { mobile } from "../responsive";
import Auth from '../utils/auth';

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
  width: 25%;
  padding: 20px;
  background-color: #cfcfc4;
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
  padding: 10px
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: white;
  cursor: pointer;
  margin-bottom: 10px
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   text-decoration: underline;
//   cursor: pointer;
//   font-size: 14px;
// `;

function Login(props) {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

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
          <Link> FORGOT PASSWORD? </Link>
          <Link> CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
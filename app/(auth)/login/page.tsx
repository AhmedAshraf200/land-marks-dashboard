'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from '@nextui-org/react';
import { loginUser } from '@/app/(auth)/(utils)/api/login';
import { User, UserResponse } from '@/app/(auth)/(utils)/types/user.type'
import { isLoggedIn, saveUserInfo } from '@/app/(auth)/(utils)/helpers/auth.helper'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    if(isLoggedIn()){
      window.location.href = '/'
    }
  }, [])

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value);
  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const user:User = { email, password };
    try {
      const userResponse:UserResponse|null = await loginUser(user);
      if (userResponse) {
        saveUserInfo(userResponse);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs fullWidth size="md" aria-label="Tabs form">
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  onChange={handleEmailChange}
                  type="email"
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                  type="password"
                />
                <p className="text-center text-small">
                  Need to create an account?{' '}
                  <Link size="sm" href={'/sign-up'}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit"> {/* Added type="submit" */}
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

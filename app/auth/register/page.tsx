"use client";

import { SyntheticEvent, useState } from "react";
import { signup } from "../actions";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signup({ email, password });
      if (res.error) {
        alert(res.error.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Sign up to open an account</CardTitle>
        <CardDescription>
          Enter your details below to sign up an account
        </CardDescription>
        <CardAction>
          <Button variant='link'>
            <a href='/auth/login'>Login</a>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>First Name</Label>
              <Input
                id='name'
                type='name'
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* <div className='flex items-center'> */}
              <Label htmlFor='password'>Password</Label>
              {/* <a
                  href='#'
                  className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                  Forgot your password?
                </a> */}
              {/* </div> */}
              <Input
                id='password'
                type='password'
                placeholder='****'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type='submit' disabled={loading} className='w-full mt-5'>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      {/* <CardFooter className='flex-col gap-2'>
          <Button variant='outline' className='w-full'>
            Login with Google
          </Button>
        </CardFooter> */}
    </Card>
  );
}

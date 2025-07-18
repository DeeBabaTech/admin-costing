"use client";

import { SyntheticEvent, useState } from "react";
import { login } from "../actions";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await login({ email, password });
      console.log(res);
      if (res.data.user) {
        toast.success("Login Success");
      } else {
        toast.error(res.error.message);
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
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant='link'>
            <a href='/auth/register'>Sign Up</a>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <a
                  href='#'
                  className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                  Forgot your password?
                </a>
              </div>
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
            {loading ? "Logging in..." : "Login"}
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

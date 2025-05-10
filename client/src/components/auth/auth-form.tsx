import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RegisterUser, LoginData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  displayName: z.string().min(2, { message: "Display name is required" }),
  email: z.string().email().refine(
    (email) => email.endsWith('.edu') || email.includes('university') || email.includes('edu.'), 
    { message: "Must use a valid university email address" }
  ),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  passwordConfirm: z.string(),
  university: z.string().optional(),
  discipline: z.string().optional(),
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { loginMutation, registerMutation } = useAuth();
  const { toast } = useToast();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      university: "",
      discipline: "",
    },
  });

  const handleLogin = (data: LoginFormValues) => {
    loginMutation.mutate(data as LoginData, {
      onError: (error) => {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  const handleRegister = (data: RegisterFormValues) => {
    const { passwordConfirm, ...userData } = data;
    registerMutation.mutate(userData as RegisterUser, {
      onError: (error) => {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login to CareerHop</CardTitle>
          </CardHeader>
          <form onSubmit={loginForm.handleSubmit(handleLogin)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  {...loginForm.register("username")} 
                  placeholder="Enter your username"
                  error={loginForm.formState.errors.username?.message}
                />
                {loginForm.formState.errors.username && (
                  <p className="text-sm text-destructive">{loginForm.formState.errors.username.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  {...loginForm.register("password")} 
                  placeholder="Enter your password"
                  error={loginForm.formState.errors.password?.message}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create a CareerHop Account</CardTitle>
          </CardHeader>
          <form onSubmit={registerForm.handleSubmit(handleRegister)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input 
                  id="register-username" 
                  {...registerForm.register("username")} 
                  placeholder="Choose a username"
                  error={registerForm.formState.errors.username?.message}
                />
                {registerForm.formState.errors.username && (
                  <p className="text-sm text-destructive">{registerForm.formState.errors.username.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input 
                  id="display-name" 
                  {...registerForm.register("displayName")} 
                  placeholder="Your name as shown to others"
                  error={registerForm.formState.errors.displayName?.message}
                />
                {registerForm.formState.errors.displayName && (
                  <p className="text-sm text-destructive">{registerForm.formState.errors.displayName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">University Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  {...registerForm.register("email")} 
                  placeholder="youremail@university.edu"
                  error={registerForm.formState.errors.email?.message}
                />
                {registerForm.formState.errors.email && (
                  <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="university">University (Optional)</Label>
                <Input 
                  id="university" 
                  {...registerForm.register("university")} 
                  placeholder="Your university"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discipline">Engineering Discipline (Optional)</Label>
                <Input 
                  id="discipline" 
                  {...registerForm.register("discipline")} 
                  placeholder="e.g. Computer Engineering, Mechanical, etc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  {...registerForm.register("password")} 
                  placeholder="Create a password"
                  error={registerForm.formState.errors.password?.message}
                />
                {registerForm.formState.errors.password && (
                  <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-confirm">Confirm Password</Label>
                <Input 
                  id="password-confirm" 
                  type="password" 
                  {...registerForm.register("passwordConfirm")} 
                  placeholder="Confirm your password"
                  error={registerForm.formState.errors.passwordConfirm?.message}
                />
                {registerForm.formState.errors.passwordConfirm && (
                  <p className="text-sm text-destructive">{registerForm.formState.errors.passwordConfirm.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Creating account..." : "Register"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

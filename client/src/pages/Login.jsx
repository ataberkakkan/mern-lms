import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginMutation, useRegisterMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [
    register,
    {
      data: registerData,
      error: registerError,
      isLoading: isLoadingRegister,
      isSuccess: isSuccessRegister,
    },
  ] = useRegisterMutation();

  const [
    login,
    {
      data: loginData,
      error: loginError,
      isLoading: isLoadingLogin,
      isSuccess: isSuccessLogin,
    },
  ] = useLoginMutation();

  const handleChange = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignUpForm({ ...signUpForm, [name]: value });
    } else {
      setLoginForm({ ...loginForm, [name]: value });
    }
  };

  const handleSubmit = async (type) => {
    const inputData = type === "signup" ? signUpForm : loginForm;
    const action = type === "signup" ? register : login;

    await action(inputData);
  };

  useEffect(() => {
    if (isSuccessRegister && registerData) {
      toast.success(registerData.message || "Signed Up Successfully");
    }

    if (registerError) {
      toast.error(registerError?.data?.message || "Something went wrong");
    }

    if (isSuccessLogin && loginData) {
      toast.success(loginData.message || "Logged In Successfully");
    }

    if (loginError) {
      toast.error(loginError?.data?.message || "Something went wrong");
    }
  }, [
    isLoadingLogin,
    isLoadingRegister,
    loginData,
    registerData,
    loginError,
    registerError,
    isSuccessRegister,
    isSuccessLogin,
  ]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new account and click Sign Up when you&apos;re done.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signUpForm.name}
                  onChange={(e) => handleChange(e, "signup")}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signUpForm.email}
                  onChange={(e) => handleChange(e, "signup")}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signUpForm.password}
                  onChange={(e) => handleChange(e, "signup")}
                  placeholder="Password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={isLoadingRegister}
                onClick={() => handleSubmit("signup")}
              >
                {isLoadingRegister ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" /> Please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>Login to your account.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={(e) => handleChange(e, "login")}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>New password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={(e) => handleChange(e, "login")}
                  placeholder="Password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={isLoadingLogin}
                onClick={() => handleSubmit("login")}
              >
                {isLoadingLogin ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" /> Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;

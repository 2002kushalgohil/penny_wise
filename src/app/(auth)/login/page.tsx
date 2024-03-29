"use client"
// Import necessary dependencies
import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import ForgotPasswordDialog from "@/components/utils/ForgotPasswordDialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define form schema using Zod
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

// LoginPage component
function LoginPage() {
  // State for managing the forgot password dialog
  const [isForgotPasswordDialog, setIsForgotPasswordDialog] = useState<boolean>(false);

  // State for managing loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form hook for handling form state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submit handler
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setIsLoading(true);
    try {
      let response = await axios.post("/api/user/login", values);

      if (response?.data?.success) {
        // Display success toast upon successful login
        toast.success("Login Successful", {
          description: response?.data?.message,
        });
        // Redirect or perform other actions upon successful login
      } else {
        // Display error toast if login fails
        toast.error("Login Failed", {
          description: response?.data?.error,
        });
      }
    } catch (error) {
      // Handle errors from server or network failures
      if (error.response && error.response.data) {
        const { data } = error.response;
        toast.error("Login Failed", {
          description: data.error || "An error occurred.",
        });
      } else {
        console.error("Error:", error.message);
        toast.error("Login Failed", {
          description: "An error occurred.",
        });
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="w-full !z-20">
      <h3 className="gradientText text-2xl md:text-4xl mb-5">Login</h3>
      {/* Login form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input id="email" placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input id="password" type="password" placeholder="Enter Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Forgot password link */}
          <div className="mt-5 text-right underline">
            <p
              className="!text-white cursor-pointer"
              onClick={() => {
                setIsForgotPasswordDialog(true);
              }}
            >
              Forgot Password
            </p>
          </div>
          {/* Login button */}
          <Button loading={isLoading} type="submit" size="lg">
            LOGIN
          </Button>
        </form>
      </Form>
      {/* Link to registration page */}
      <div className="mt-5 text-right underline">
        <Link href="/register">Don&apos;t have an account? Register</Link>
      </div>
      {/* Forgot password dialog */}
      <ForgotPasswordDialog
        setIsForgotPasswordDialog={setIsForgotPasswordDialog}
        isForgotPasswordDialog={isForgotPasswordDialog}
      />
    </div>
  );
}

export default LoginPage;

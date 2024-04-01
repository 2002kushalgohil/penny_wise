"use client";
import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from 'next/navigation'

// Define form schema using Zod
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

// Page component
function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Form submit handler
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setIsLoading(true);
    try {
      // Send form data to server
      let response = await axios.post("/api/user/register", values);

      // Handle response
      if (response?.data?.success) {
        toast.success("Registration Successful", {
          description: response?.data?.message,
        });

        const { accessToken, refreshToken } = response?.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        router.push("/dashboard")

      } else {
        toast.error("Registration Failed", {
          description: response?.data?.error,
        });
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.data) {
        const { data } = error.response;
        toast.error("Registration Failed", {
          description: data.error || "An error occurred.",
        });
      } else {
        console.error("Error:", error.message);
        toast.error("Registration Failed", {
          description: "An error occurred.",
        });
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="w-full !z-20">
      <h3 className="gradientText text-2xl md:text-4xl mb-5">Register</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Username field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl>
                  <Input
                    id="username"
                    placeholder="Enter Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit button */}
          <Button loading={isLoading} type="submit" size="lg">
            REGISTER
          </Button>
        </form>
      </Form>
      {/* Link to login page */}
      <div className="mt-5 text-right underline">
        <Link href="/login">Already have an account</Link>
      </div>
    </div>
  );
}

export default Page;

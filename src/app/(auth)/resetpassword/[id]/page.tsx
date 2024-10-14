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
import { useRouter } from "next/navigation";

// Define form schema using Zod
const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // set path of error
  });

// ResetPassword component
function ResetPassword({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Form submit handler
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setIsLoading(true);
    try {
      // Send reset password request to the server
      const response = await axios.post(
        `/api/user/resetPassword?token=${params.id}`,
        { ...values }
      );

      // Handle response
      if (response?.data?.success) {
        toast.success("Password Reset Successful", {
          description: response?.data?.message,
        });

        const { accessToken, refreshToken } = response?.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        router.push("/dashboard");
      } else {
        toast.error("Password Reset Failed", {
          description: response?.data?.error,
        });
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error); // Log the entire error object
      if (error.response && error.response.data) {
        const { data } = error.response;
        toast.error("Password Reset Failed", {
          description: data.error || "An error occurred.",
        });
      } else {
        toast.error("Password Reset Failed", {
          description: "An error occurred.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full !z-20">
      <h3 className="gradientText text-2xl md:text-4xl mb-5">Reset Password</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          {/* Confirm Password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit button */}
          <Button loading={isLoading} type="submit" size="lg">
            RESET PASSWORD
          </Button>
        </form>
      </Form>
      {/* Link to login page */}
      <div className="mt-5 text-right underline">
        <Link href="/login">Remember your password?</Link>
      </div>
    </div>
  );
}

export default ResetPassword;

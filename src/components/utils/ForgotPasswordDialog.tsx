// Import necessary dependencies
import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the form schema
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

// Define props interface for the EmailDialog component
interface EmailDialogProps {
  setIsForgotPasswordDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isForgotPasswordDialog: boolean;
}

// ForgotPasswordDialog component
function ForgotPasswordDialog({
  setIsForgotPasswordDialog,
  isForgotPasswordDialog,
}: EmailDialogProps) {
  // State for loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form submit handler
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setIsLoading(true);
    try {
      let response = await axios.post("/api/user/forgotPassword", values);

      if (response?.data?.success) {
        toast.success("Forgot Password", {
          description: response?.data?.message,
        });
        // Redirect or do something else upon successful login
      } else {
        toast.error("Forgot Password", {
          description: response?.data?.error,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { data } = error.response;
        toast.error("Forgot Password", {
          description: data.error || "An error occurred.",
        });
      } else {
        console.error("Error:", error.message);
        toast.error("Forgot Password", {
          description: "An error occurred.",
        });
      }
    }
    setIsLoading(false);
    setIsForgotPasswordDialog(false);
  }

  return (
    <Dialog
      open={isForgotPasswordDialog}
      onOpenChange={(e) => setIsForgotPasswordDialog(e)}
    >
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-left">Forgot Password</DialogTitle>
          <DialogDescription>
            Enter your email address below to receive a password reset link.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex items-center justify-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full !z-20">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="!z-20" loading={isLoading}>
              Send Reset Link
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPasswordDialog;

// Import necessary dependencies
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

// Define the form schema
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

// Define props interface for the EmailSignupForm component
interface EmailSignupFormProps {
  setIsEmailSignupDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallerVersion: boolean;
}

// EmailSignupForm component
function EmailSignupForm({ setIsEmailSignupDialog, isSmallerVersion }: EmailSignupFormProps) {
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
      const response = await axios.post("/api/emailsignup", values);
  
      if (response?.data?.success) {
        toast.success("Email Signup", {
          description: response?.data?.message,
        });
      } else {
        toast.error("Email Signup", {
          description: response?.data?.error,
        });
      }
    } catch (error) {
      console.error("Error subscribing email:", error);
    }
    setIsLoading(false);
    setIsEmailSignupDialog(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${
          isSmallerVersion
            ? "flex items-start justify-start gap-5"
            : "space-y-5"
        }`}
      >
        <div className="flex items-center justify-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full !z-20">
                {!isSmallerVersion && <FormLabel>Email</FormLabel>}
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="!z-20" loading={isLoading}>
          Subscribe
        </Button>
      </form>
    </Form>
  );
}

export default EmailSignupForm;

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

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

interface EmailSignupFormProps {
  setIsEmailSignupDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallerVersion: boolean;
}

function EmailSignupForm({
  setIsEmailSignupDialog,
  isSmallerVersion,
}: EmailSignupFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/emailsignup", values);

      if (response?.data?.success) {
        toast.success("Email Signup", {
          description: response.data.message,
        });
      } else {
        toast.error("Email Signup", {
          description: response.data.error,
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

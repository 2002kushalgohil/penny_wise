import { Button } from "@/components/ui/button";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/contact", values);

      if (response?.data?.success) {
        toast.success("Contact Us", {
          description: response?.data?.message,
        });
      } else {
        toast.error("Contact Us", {
          description: response?.data?.error,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Contact Us", {
        description: "An error occurred while submitting the form.",
      });
    }
    setIsLoading(false);
  }

  
  return (
    <div id="Contact-Us" className="globalPadding">
      <h2 className="gradientText text-2xl md:text-4xl font-semibold">
        Get in touch
      </h2>
  
      <div className="w-full flex flex-col-reverse lg:flex-row gap-10 mt-10">
        <div className="w-full md:w-5/6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-8">
              <div className="flex items-center justify-center gap-5 md:gap-10">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel htmlFor="name">NAME</FormLabel>
                      <FormControl>
                        <Input
                          className="p-7"
                          id="name"
                          placeholder="Full Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel htmlFor="email">EMAIL</FormLabel>
                      <FormControl>
                        <Input
                          className="p-7"
                          id="email"
                          placeholder="email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-center gap-5 md:gap-10">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel htmlFor="company">COMPANY</FormLabel>
                      <FormControl>
                        <Input
                          className="p-7"
                          id="company"
                          placeholder="Company Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel htmlFor="subject">SUBJECT</FormLabel>
                      <FormControl>
                        <Input
                          className="p-7"
                          id="subject"
                          placeholder="How can we help?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="message">MESSAGE</FormLabel>
                    <FormControl>
                      <Textarea
                        className="p-7"
                        id="message"
                        rows={5}
                        placeholder="Your Message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button loading={isLoading} type="submit" size="lg">
                SEND MESSAGE
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex flex-col items-start justify-start gap-5">
          <h3>Want to reach us directly?</h3>
          <p>
            Feel free to contact our support team for any inquiries, feedback,
            or assistance you may need. We&apos;re here to help!
          </p>
          <div className="flex items-center justify-start gap-5">
            <img src="assets/landing_page/contact/mail.svg" alt="Mail Icon" />
            <a href="mailto:2002kushalgohil@gmail.com">
              <span>2002kushalgohil@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Contact;

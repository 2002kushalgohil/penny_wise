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
import { useState } from "react";
import { incomeTypes } from "../../../../../constants/transactions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";

const incomeFormSchema = z
  .object({
    type: z.string().min(2, { message: "Type must be at least 2 characters." }),
    source: z
      .string()
      .min(2, { message: "Source must be at least 2 characters." }),
    amount: z
      .string()
      .min(1, { message: "Amount is required." })
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0, {
        message: "Amount must be a positive integer.",
      }),
    date: z.date(),
    note: z.string().optional(),
    invoiceUrl: z.string().url().optional(),
    tags: z.string().optional(),
  })
  .refine((data) => data.date !== undefined, {
    message: "Date is required.",
    path: ["date"],
  });

function IncomeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof incomeFormSchema>>({
    resolver: zodResolver(incomeFormSchema),
    defaultValues: {
      type: "",
      source: "",
      amount: 0,
      date: new Date(),
      note: "",
      invoiceUrl: "",
      tags: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof incomeFormSchema>
  ): Promise<void> {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/income", {
        ...values,
        tags: values.tags?.split(","), // converting tags to array
      });

      toast.success("Income created successfully!");

      form.reset();
    } catch (error) {
      console.error("Error:", error);

      toast.error("Failed to create income 😬");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid space-y-3 md:space-y-5"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="type">Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a income type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {incomeTypes.map((income, key) => {
                      return (
                        <SelectItem key={key} value={income.value}>
                          <div className="flex gap-5">
                            {income.icon} {income.value}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="source">Source</FormLabel>
              <FormControl>
                <Input id="source" placeholder="Eg: Restaurant A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <FormControl>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Income Amount"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="date">Date</FormLabel>
                <FormControl>
                  <Calendar
                    {...field}
                    selected={field.value}
                    onDayClick={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="invoiceUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="invoiceUrl">Invoice URL</FormLabel>
              <FormControl>
                <Input
                  id="invoiceUrl"
                  type="url"
                  placeholder="Invoice URL"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="tags">Tags</FormLabel>
              <FormControl>
                <Input
                  id="tags"
                  placeholder="Tags (comma-separated)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="note">Note</FormLabel>
              <FormControl>
                <Textarea id="note" placeholder="Optional Note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={isLoading} type="submit">
          Add Income
        </Button>
      </form>
    </Form>
  );
}

export default IncomeForm;

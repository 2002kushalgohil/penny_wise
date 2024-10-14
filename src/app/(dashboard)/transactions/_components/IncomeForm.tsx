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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";

const incomeFormSchema = z
  .object({
    type: z.string().min(2, { message: "Type must be at least 2 characters." }),
    source: z
      .string()
      .min(2, { message: "Source must be at least 2 characters." }),
    amount: z
      .number()
      .positive({ message: "Amount must be a positive number." }),
    date: z.date(),
    note: z.string().optional(),
    invoiceUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
  })
  .refine((data) => data.date !== undefined, {
    message: "Date is required.",
    path: ["date"],
  });

function IncomeForm() {
  const [date, setDate] = useState(new Date(2023, 0, 20));
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
      tags: [],
    },
  });

  async function onSubmit(
    values: z.infer<typeof incomeFormSchema>
  ): Promise<void> {
    setIsLoading(true);
    try {
      // Perform submission logic here, e.g., axios post request
      console.log("Form values:", values);
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 space-y-3 md:space-y-5"
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
            console.log(field);
            
            return (
              <FormItem>
                <FormLabel htmlFor="date">Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="lg"
                        id="date"
                        variant={"outline"}
                        className="justify-start w-full bg-secondary hover:bg-secondary/80 pl-5"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Pick a date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar {...field} />
                    </PopoverContent>
                  </Popover>
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
                <Input id="note" placeholder="Optional Note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={isLoading} type="submit" size="lg">
          Add Income
        </Button>
      </form>
    </Form>
  );
}

export default IncomeForm;

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HeadLine from "./HeadLine";

// Interface for FAQ item
interface FAQItem {
  question: string;
  answer: string;
}

function FAQ() {
  // FAQ data
  const faqs: FAQItem[] = [
    {
      question: "Can I access Penny Wise on multiple devices?",
      answer:
        "Yes, Penny Wise is accessible on multiple devices through any modern web browser. You can sign in to your Penny Wise account from any device with an internet connection.",
    },
    {
      question: "How do I sign up for Penny Wise?",
      answer:
        "To sign up for Penny Wise, visit the Penny Wise website and click on the 'Sign Up' button. Fill out the registration form with your username, email, password, and other required details to create your account.",
    },
    {
      question: "Can I customize my budget categories in Penny Wise?",
      answer:
        "Yes, Penny Wise allows you to customize your budget categories according to your preferences. You can create, edit, and delete budget categories to better suit your financial goals and spending habits.",
    },
    {
      question: "Does Penny Wise support multiple currencies?",
      answer:
        "Yes, Penny Wise supports multiple currencies. You can set your preferred currency in the settings section of the app, allowing you to manage your finances in the currency of your choice.",
    },
    {
      question: "Can I set up recurring transactions in Penny Wise?",
      answer:
        "Yes, Penny Wise enables you to set up recurring transactions for regular expenses or income. You can schedule transactions to occur daily, weekly, monthly, or at custom intervals, helping you stay organized with your finances.",
    },
    {
      question:
        "Is there a limit to the number of accounts I can connect to Penny Wise?",
      answer:
        "No, Penny Wise does not impose a limit on the number of accounts you can connect. You can link all your bank accounts, credit cards, and other financial accounts to Penny Wise to get a comprehensive view of your finances in one place.",
    },
  ];

  return (
    <div id="FAQs" className="dots relative">
      {/* Background circles */}
      <div className="h-80 w-80 rounded-full bg-secondary blur-[200px] absolute -top-40 -left-40 z-10" />
      <div className="h-80 w-80 rounded-full bg-primary blur-[250px] absolute top-[30%] right-40 z-10" />
      
      <div className="globalPadding flex items-center justify-center flex-col gap-10">
        {/* FAQ headline */}
        <HeadLine title="FAQs" />

        <h3 className="gradientText text-2xl md:text-4xl font-semibold text-center !z-20">
          We&apos;ve got the answers
        </h3>

        <div className="w-full lg:w-9/12 !z-20">
          {/* FAQ accordion */}
          <Accordion type="single" collapsible className="w-full !z-20">
            {faqs.map((data, index) => (
              <AccordionItem
                key={index}
                value={data.question}
                className="customCard !p-5 md:!p-6 mb-5 !z-20"
              >
                <AccordionTrigger className=" !text-start !z-20">
                  <h4 className="text-lg">{data.question}</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <h4 className="text-md md:text-lg">{data.answer}</h4>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default FAQ;

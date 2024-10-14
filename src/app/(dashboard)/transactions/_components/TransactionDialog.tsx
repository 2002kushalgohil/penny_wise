// Import necessary dependencies
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeForm from "./IncomeForm";

// Define props interface for the TransactionDialog component
interface TransactionDialogProps {
  setIsCreateTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  isCreateTransaction: boolean;
}

// TransactionDialog component
function TransactionDialog({
  setIsCreateTransaction,
  isCreateTransaction,
}: TransactionDialogProps) {
  return (
    <Dialog
      open={isCreateTransaction}
      onOpenChange={(e) => setIsCreateTransaction(e)}
    >
      <DialogContent className="max-w-5xl lg:max-w-screen-lg overflow-y-scroll max-h-screen customScroll">
        <DialogHeader>
          <DialogTitle className="text-left">Add a transaction</DialogTitle>
          <DialogDescription>
            Enter the details of your transaction below.
          </DialogDescription>
        </DialogHeader>
        <Tabs className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="income" className="w-1/2">
              Income
            </TabsTrigger>
            <TabsTrigger value="expense" className="w-1/2">
              Expense
            </TabsTrigger>
          </TabsList>
          <TabsContent value="income">
            <IncomeForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionDialog;

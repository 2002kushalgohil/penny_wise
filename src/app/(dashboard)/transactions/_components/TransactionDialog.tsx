import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
    <Sheet
      onOpenChange={(e) => setIsCreateTransaction(e)}
      open={isCreateTransaction}
    >
      <SheetContent>
        <Tabs defaultValue="income" className="mt-5">
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
      </SheetContent>
    </Sheet>
  );
}

export default TransactionDialog;

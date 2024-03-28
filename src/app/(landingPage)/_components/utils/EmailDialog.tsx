// Import necessary dependencies
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EmailSignupForm from "./EmailSignupForm";

// Define props interface for the EmailDialog component
interface EmailDialogProps {
  setIsEmailSignupDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isEmailSignupDialog: boolean;
}

// EmailDialog component
function EmailDialog({ setIsEmailSignupDialog, isEmailSignupDialog }: EmailDialogProps) {
  return (
    <Dialog
      open={isEmailSignupDialog}
      onOpenChange={(e) => setIsEmailSignupDialog(e)}
    >
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-left">
            Sign up for Newsletter
          </DialogTitle>
          <DialogDescription>
            Subscribe to our newsletter to receive the latest updates and news.
            Enter your email below and click &quot;Subscribe&quot;.
          </DialogDescription>
        </DialogHeader>
        <EmailSignupForm setIsEmailSignupDialog={setIsEmailSignupDialog} isSmallerVersion={false} />
      </DialogContent>
    </Dialog>
  );
}

export default EmailDialog;

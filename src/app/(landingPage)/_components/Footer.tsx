import { Link2Icon } from "@radix-ui/react-icons";
import EmailSignupForm from "./utils/EmailSignupForm";
import Logo from "@/components/utils/Logo";
import ThemeSwitcher from "@/components/utils/ThemeSwitcher";

interface FooterProps {
  setIsEmailSignupDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer: React.FC<FooterProps> = ({ setIsEmailSignupDialog }) => {
  return (
    <div className="bg-secondary backdrop-blur-lg backdrop-filter globalPadding !py-6 md:!py-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-10 space-y-10 ">
        <div className="h-80 w-80 rounded-full bg-primary blur-[250px] absolute bottom-0 right-40" />

        <div className="flex flex-col items-start gap-5">
          <Logo />
          <p>Take Control of Your Finances with Penny Wise</p>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg">Links</h3>
          <a href="#Home" className="link">
            Home
          </a>
          <a href="#About" className="link">
            About
          </a>
          <a href="#Features" className="link">
            Features
          </a>
          <a href="#Pricing" className="link">
            Pricing
          </a>
          <a href="#FAQs" className="link">
            FAQs
          </a>
          <a href="#Contact-Us" className="link">
            Contact-Us
          </a>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h3 className="text-lg">Get in touch</h3>
          <div className="flex gap-3 items-center justify-start"></div>
          <div className="flex items-center justify-start gap-5">
            <EmailSignupForm
              setIsEmailSignupDialog={setIsEmailSignupDialog}
              isSmallerVersion={true}
            />
          </div>
          <div>
            <ThemeSwitcher isCustomBg={true} />
          </div>
        </div>
      </div>

      <div className="border-t-[1px] w-full border-border pt-6 mt-8 p-0 text-center flex items-center flex-wrap justify-center gap-3">
        Designed and Developed By :
        <a
          className="hover:text-primary cursor-pointer hover:underline flex items-center justify-center gap-1"
          href="https://www.kushalgohil.com/"
          target="_blank"
        >
          Kushal Gohil <Link2Icon />
        </a>
      </div>
    </div>
  );
};

export default Footer;

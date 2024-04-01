"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  CreditCard,
  DollarSign,
  Home,
  PanelLeft,
  SearchIcon,
  Settings,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {b 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ThemeSwitcher from "@/components/utils/ThemeSwitcher";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ProtectedRoute from "@/components/utils/ProtectedRoute";

interface MenuItem {
  icon: JSX.Element;
  label: string;
  tooltip: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  const router = useRouter();

  // Define menu items with icons and tooltips
  const menuItems: MenuItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      tooltip: "Dashboard",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      label: "Transactions",
      tooltip: "Transactions",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Budgets",
      tooltip: "Budgets",
    },
    { icon: <Trophy className="h-5 w-5" />, label: "Goals", tooltip: "Goals" },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Reminders",
      tooltip: "Reminders",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Debts",
      tooltip: "Debts",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      tooltip: "Settings",
    },
  ];

  // Function to handle logout
  const handleLogout = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen w-full flex-col">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-16 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
            {/* Render main menu items */}
            {menuItems.map((item, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      {item.icon}
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.tooltip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>
          {/* Render additional menu item */}
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="settings"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        {/* Main content */}
        <div className="flex flex-col sm:pl-16">
          {/* Header */}
          <header className="sticky top-0 z-30 flex border-b items-center gap-4 bg-background sm:h-auto px-6 py-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium pt-10">
                  {/* Render menu items */}
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.label}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            {/* Theme switcher and search */}
            <div className="ml-auto flex-1 md:grow-0 flex items-center justify-center gap-4">
              <ThemeSwitcher isCustomBg={false} />
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background p-4 !pl-8 md:w-[200px] lg:w-[320px]"
                />
              </div>
            </div>
            {/* Dropdown menu for user account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>KG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          {/* Main content */}
          <div className="p-4 lg:p-6">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Layout;

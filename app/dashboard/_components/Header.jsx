"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  // BriefcaseBusiness,
  HelpCircle,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  // { href: "/dashboard/upgrade", label: "Upgrade", icon: BriefcaseBusiness },
  { href: "/dashboard/howit", label: "How it works", icon: HelpCircle },
];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const path = usePathname();

  const isActive = (href) =>
    href === "/dashboard" ? path === href : path?.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/mockify.png" width={48} height={48} alt="Mockify" priority />
        </Link>

        <nav className="hidden items-center rounded-md border border-border bg-card p-1 shadow-sm md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground",
                  isActive(item.href) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="flex size-10 items-center justify-center rounded-md border border-border bg-card">
            <UserButton />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="page-shell grid gap-2 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

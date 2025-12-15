// components/layout/sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Users,
  Building2,
  FileText,
  ClipboardList,
  PackageCheck,
  Repeat,
  Wrench,
  BarChart3,
  ChevronLeft,
  Menu,
  Settings,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Master Data",
    href: "/master",
    icon: FolderOpen,
    children: [
      { title: "Aset", href: "/master/aset", icon: Package },
      { title: "Kategori", href: "/master/kategori", icon: FolderOpen },
      {
        title: "Pengguna",
        href: "/master/pengguna",
        icon: Users,
        roles: ["admin"],
      },
      { title: "Vendor", href: "/master/vendor", icon: Building2 },
    ],
  },
  {
    title: "Permohonan Aset",
    href: "/permohonan-aset",
    icon: FileText,
  },
  {
    title: "Anggaran",
    href: "/anggaran",
    icon: ClipboardList,
    roles: ["admin", "bendahara"],
  },
  {
    title: "Penerimaan",
    href: "/penerimaan",
    icon: PackageCheck,
    roles: ["admin", "sarpras"],
  },
  {
    title: "Peminjaman",
    href: "/peminjaman",
    icon: Repeat,
  },
  {
    title: "Maintenance",
    href: "/maintenance",
    icon: Wrench,
    roles: ["admin", "sarpras"],
  },
  {
    title: "Laporan",
    href: "/laporan",
    icon: BarChart3,
  },
];

interface SidebarProps {
  className?: string;
}

function NavItemComponent({
  item,
  isCollapsed,
}: {
  item: NavItem;
  isCollapsed: boolean;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Check role access
  if (item.roles && user && !item.roles.includes(user.role)) {
    return null;
  }

  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");
  const Icon = item.icon;

  if (item.children) {
    const hasAccess = item.children.some(
      (child) => !child.roles || (user && child.roles.includes(user.role))
    );
    if (!hasAccess) return null;

    return (
      <div className="space-y-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3",
            isCollapsed && "justify-center px-2",
            isActive && "bg-accent"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  isOpen && "rotate-90"
                )}
              />
            </>
          )}
        </Button>
        {!isCollapsed && isOpen && (
          <div className="ml-4 space-y-1 border-l pl-4">
            {item.children.map((child) => (
              <NavItemComponent
                key={child.href}
                item={child}
                isCollapsed={false}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={item.href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3",
          isCollapsed && "justify-center px-2",
          isActive && "bg-accent text-accent-foreground"
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {!isCollapsed && <span>{item.title}</span>}
      </Button>
    </Link>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden h-screen border-r bg-card transition-all duration-300 lg:block",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Package className="h-6 w-6 text-primary" />
            <span>PKM Asset</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(isCollapsed && "mx-auto")}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)] px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItemComponent
              key={item.href}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
            onClick={() => setOpen(false)}
          >
            <Package className="h-6 w-6 text-primary" />
            <span>PKM Asset</span>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-3.5rem)] px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                onClick={() => !item.children && setOpen(false)}
              >
                <NavItemComponent item={item} isCollapsed={false} />
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

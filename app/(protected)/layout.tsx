import { AppSidebar } from "@/components/custom/app-sidebar";
import { HeaderUserMenu } from "@/components/custom/header-user-menu";
import { TokenExpiryCountdown } from "@/components/custom/token-expiry-countdown";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border bg-card px-4">
          <SidebarTrigger className="-ml-1" />
          <TokenExpiryCountdown />
          <div className="ml-auto flex items-center gap-2">
            <HeaderUserMenu />
          </div>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

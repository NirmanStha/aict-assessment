import { AppSidebar } from "@/components/custom/app-sidebar";
import { HeaderUserMenu } from "@/components/custom/header-user-menu";
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
          <p className="text-sm font-medium text-muted-foreground">
            Protected Workspace
          </p>
          <div className="ml-auto">
            <HeaderUserMenu />
          </div>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

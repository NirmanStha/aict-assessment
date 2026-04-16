import { Card, CardHeader } from "@/components/ui/card";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md p-6 mt-4">
        <CardHeader className="text-center text-lg">
          Login to your account
        </CardHeader>
      </Card>
    </div>
  );
}

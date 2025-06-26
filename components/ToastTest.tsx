"use client";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export function ToastTest() {
  useEffect(() => {
    toast({
      title: "Test Toast",
      description: "Ini test toast dari ToastTest"
    });
  }, []);
  return null;
} 
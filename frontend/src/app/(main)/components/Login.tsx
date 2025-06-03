"use client";
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";

type Props = {
  onClose: () => void;
};

export const Login = ({ onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="relative w-[416px] bg-white rounded-2xl shadow-lg p-6"
    >
      {/* Close button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-full hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Login Tabs */}
      <Tabs defaultValue="account" className="w-full">
        <TabsContent value="account">
          <div className="flex flex-col gap-6">
            <CardHeader>
              <CardTitle className="text-[24px] font-semibold">Log in</CardTitle>
              <CardDescription>
                Log in to plan your dream wedding.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <Input id="email" placeholder="Enter your email address" />
              <Input id="password" placeholder="Password" type="password" />
              
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full">Let's Go</Button>
              <div className="flex gap-2 justify-center text-sm">
                <span className="text-[#71717A]">Don't have an account?</span>
                <a className="text-[#2563EB] cursor-pointer">Sign up</a>
              </div>
            </CardFooter>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

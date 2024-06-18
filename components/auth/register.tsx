"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { RegisterForm } from "./register-form";

export function Register() {
  const [registrationType, setRegistrationType] = useState<
    "gharpeti" | "customer"
  >();
  return (
    <div className=" flex flex-col max-h-screen justify-center  items-center p-8 md:p-12">
      <div className="space-y-6 w-full">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Join Us
        </h2>
        {registrationType ? (
          <div className="max-w-md mx-auto">
            <RegisterForm type={registrationType} />
          </div>
        ) : (
          <div className="flex max-w-md mx-auto flex-col space-y-4 w-full">
            <h1>
              Are you looking to join us as a Gharpeti or a Customer? We will
              allow you to change it later.
            </h1>
            <Button onClick={() => setRegistrationType("gharpeti")}>
              Register as Gharpeti
            </Button>
            <Button
              onClick={() => setRegistrationType("customer")}
              variant="secondary"
            >
              Register as Customer
            </Button>

            <h4 className="text-sm">
              Already have an account?{" "}
              <Link className="text-[blue] underline" href="/login">
                Login
              </Link>
            </h4>

            <Link href="/" className="text-sm text-[blue] underline">
              Go to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

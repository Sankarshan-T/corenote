"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="max-w-4xl  space-y-4 ">
            <h1 className="text-3xl sm-text-5xl md:text-5xl font-bold">Where Ideas, Plans and Documents get united with <span className="text-primary">CoreNote</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">Make your work more productive with CoreNote</h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size={"lg"} />
                </div>
            )}
            {isAuthenticated && (
                <Button asChild>
                    <Link href={"/documents"}>
                        Go to Documents <ArrowRight className="h-2 w-2" />
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        Get started for free
                        <ArrowRight className="h-4 w-4"/>
                    </Button>
                </SignInButton>
            )}
        </div>
    );
};
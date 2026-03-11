"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
    return (
        <div className="max-w-4xl  space-y-4 ">
            <h1 className="text-3xl sm-text-5xl md:text-5xl font-bold">Where Ideas, Plans and Documents get united with <span className="text-primary">CoreNote</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">Make your work more productive with CoreNote</h3>
            <Button>
                Get Started <ArrowRight className="h-2 w-2"/>
            </Button>
        </div>
    );
};
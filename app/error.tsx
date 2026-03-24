"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center space-y-4">
            <Image
                src={"/error.svg"}
                alt="404"
                width={300}
                height={300}
            />
            <h2 className="text-xl font-medium">
                Something went wrong!
            </h2>
            <Button asChild>
                <Link href={"/documents"}>
                    Home
                </Link>
            </Button>
        </div>
    );
}

export default Error;
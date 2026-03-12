"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const DocumentsPage = () => {
    const { user } = useUser();

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src={"/documents.png"}
                alt="documents"
                height={400}
                width={400}
            />
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}'s Notes
            </h2>
            <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a Note
            </Button>
        </div>
    );
}

export default DocumentsPage;
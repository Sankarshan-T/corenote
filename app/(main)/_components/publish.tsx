"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PublishProps {
    initialData: Doc<"documents">;
}

export const Publish = ({
    initialData,
}: PublishProps) => {
    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSumbitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSumbitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: true,
        })
            .finally(() => setIsSumbitting(false));

        toast.promise(promise, {
            loading: "Publishing your note...",
            success: "Note published!",
            error: "Failed to publish note.",
        });
    };

    const onUnpublish = () => {
        setIsSumbitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: false,
        })
            .finally(() => setIsSumbitting(false));

        toast.promise(promise, {
            loading: "Unpublishing your note...",
            success: "Note unpublished!",
            error: "Failed to unpublish note.",
        });
    };

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size={"sm"} variant={"outline"}>
                    Publish
                    {initialData.isPublished && (
                        <Globe className="text-sky-500 w-8 h-8 ml-1" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="text-rose-500 flex items-center mt-2 gap-x-2">
                            <Globe className="animate-pulse h-5 w-5" />
                            <p className="text-md font-medium">
                                This note is Live on the web.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input
                                value={url}
                                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                disabled
                            />
                            <Button
                                onClick={onCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <Button
                            disabled={isSubmitting}
                            onClick={onUnpublish}
                            className="w-full text-sm"
                            size={"sm"}
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium mb-2">
                            Publish this note?
                        </p>
                        <span className="text-xs text-muted-foreground mb-4">
                            Share your work with others.
                        </span>
                        <Button
                            disabled={isSubmitting}
                            onClick={onPublish}
                            className="w-full text-sm"
                            size={"sm"}
                        >
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
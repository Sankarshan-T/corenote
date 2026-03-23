"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface CoverProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({
    url,
    preview
}: CoverProps) => {
    const { edgestore } = useEdgeStore();
    const params = useParams();
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);

    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url,
            });
        }
        removeCoverImage({
            id: params.documentId as Id<"documents">
        })
    }

    return (
        <div
            className={cn(
                "relative w-full group",
                url && "h-[35vh] bg-muted",
                !url && "h-[12vh] bg-transparent"
            )}
        >
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt="cover"
                    className="object-cover"
                />
            )}
            {url && !preview && (
                <div
                    className="opacity-0 group-hover:opacity-100 transition-all absolute bottom-5 right-5 flex items-center gap-x-2"
                >
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        className="text-muted-foreground text-sm"
                        variant={"outline"}
                        size={"sm"}
                    >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Change Cover
                    </Button>
                    <Button
                        onClick={onRemove}
                        className="text-muted-foreground text-sm"
                        variant={"outline"}
                        size={"sm"}
                    >
                        <X className="w-4 h-4 mr-2" />
                        Remove Cover
                    </Button>
                </div>
            )}
        </div>
    )
};

Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton className="w-full h-[35vh]" />
    );
};
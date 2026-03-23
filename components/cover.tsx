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
            className={"relative w-full group h-[34vh]"}
            style={{
                height: url ? "35vh" : "12vh",
                background: url ? "var(muted)" : "tansparent",
            }}
        >
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt="cover"
                    className="object-contain"
                />
            )}
            {url && !preview && (
                <div
                    className="opacity-0 group-hover:opacity-100 transition-all flex items-center gap-x-2"
                    style={{
                        position: "absolute",
                        bottom: "15px",
                        right: "15px",
                    }}
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
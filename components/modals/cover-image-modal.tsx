"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "@/components/upload/single-image";
import { UploaderProvider } from "../upload/uploader-provider";

export const CoverImageModal = () => {
    const update = useMutation(api.documents.update);
    const params = useParams();

    const [file, setFile] = useState<File>();
    const [isSubmitting, setisSubmitting] = useState(false);

    const { edgestore } = useEdgeStore();

    const coverImage = useCoverImage();

    const onClose = () => {
        setFile(undefined);
        setisSubmitting(false);
        coverImage.onClose();
    }

    const uploadFn = async ({
        file,
        signal,
        onProgressChange,
        options,
    }: {
        file: File;
        signal?: AbortSignal;
        onProgressChange?: (progress: number) => void | Promise<void>;
        options?: any;
    }) => {
        setisSubmitting(true);
        setFile(file);

        const res = await edgestore.publicFiles.upload({
            file,
            signal,
            options: {
                ...options,
                replaceTargetUrl: coverImage.url,
            },
            onProgressChange,
        });

        await update({
            id: params.documentId as Id<"documents">,
            coverImage: res?.url,
        });

        setisSubmitting(false);
        coverImage.onClose();

        return res;
    };



    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <UploaderProvider uploadFn={uploadFn} autoUpload={true}>
                    <SingleImageDropzone
                        className="w-full outline-none"
                        disabled={isSubmitting}
                        height={320}
                        width={320}
                    />
                </UploaderProvider>
            </DialogContent>
        </Dialog >
    )
}
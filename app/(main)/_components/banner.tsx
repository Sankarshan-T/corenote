"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
    documentId: Id<"documents">;
}

export const Banner = ({
    documentId,
}: BannerProps) => {
    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        router.push("/documents/")

        const promise = remove({ id: documentId })

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Deleted the note!",
            error: "Failed to delete note",
        });
    };

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            success: "Restores the note!",
            loading: "Restoring note...",
            error: "Failed to restore note",
        });
    };

    return (
        <div className="w-full bg-rose-500 text-center font-semibold text-md p-2 text-white flex items-center gap-x-2 justify-center">
            <p>⚠️ This page is currently in trash</p>
            <Button
                size={"lg"}
                onClick={onRestore}
                variant={"outline"}
                className="bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
            >
                Restore page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size={"lg"}
                    variant={"outline"}
                    className="bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                >
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    )
}
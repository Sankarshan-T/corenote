"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemProps {
    onClick?: () => void;
    onExpand?: () => void;
    label: string;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    id?: Id<"documents">;
    icon: LucideIcon;
};

export const Item = ({
    onClick,
    label,
    icon: Icon,
    onExpand,
    active,
    isSearch,
    level = 0,
    id,
    documentIcon,
    expanded,
}: ItemProps) => {
    const { user } = useUser();
    const router = useRouter();
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        onExpand?.();
    }

    const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        if (!id) return;

        const promise = create({ title: "Untitled", parentDocument: id })
            .then((documentId) => {
                if (!expanded) onExpand?.();
                router.push(`/documents/${documentId}`);
            });
        toast.promise(promise, {
            loading: "Creating a note...",
            success: "New note created!",
            error: "Failed to create a new note.",
        });
    };

    const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        if (!id) return;

        const promise = archive({ id })
            .then(() => router.push("/documents/"));

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note.",
        });
    };

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            className={cn(
                "group min-h-6.75 text-sm py-3 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium cursor-pointer",
                active && "bg-primary/5 text-primary"
            )}
        >
            {!!id && (
                <div role="button" className="h-full rounded-sm hover:bg-muted mr-1" onClick={handleExpand}>
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </div>
            )}

            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (
                <Icon className="shrink-0 h-4.5 mr-2 text-muted-foreground" />
            )}


            <span className="truncate">
                {label}
            </span>

            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-muted-foreground opacity-100">
                    <span className="text-xs">Ctrl+</span>K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                role="button"
                                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-primary-foreground"
                            >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground p-2">
                                Last edited by: {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-primary-foreground"
                        role="button"
                        onClick={onCreate}
                    >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            )}
        </div>
    )
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-x-2 py-0.75"
        >
            <Skeleton className="h-4 w-4 " />
            <Skeleton className="h-4 w-[30%] " />
        </div>
    );
};
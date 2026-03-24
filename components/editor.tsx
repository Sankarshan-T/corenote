"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
// Try these specific names
import { BlockNoteView, lightDefaultTheme, darkDefaultTheme } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
    const { theme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });
        return response.url;
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
        uploadFile: handleUpload
    });

    const corenoteDark = {
        ...darkDefaultTheme,
        colors: {
            ...darkDefaultTheme.colors,
            borderRadius: 12,
            editor: {
                text: "var(--foreground)",
                background: "var(--background)",
            },
            sideMenu: "var(--foreground)",
        },
    };

    const corenoteLight = {
        ...lightDefaultTheme,
        borderRadius: 12,
        colors: {
            ...lightDefaultTheme.colors,
            editor: {
                text: "var(--foreground)",
                background: "var(--background)",
            },
            sideMenu: "var(--foreground)",
        },
    };

    return (
        <div className="w-full">
            <BlockNoteView
                editor={editor}
                editable={editable}
                theme={theme === "dark" ? corenoteDark : corenoteLight}
                onChange={() => {
                    onChange(JSON.stringify(editor.document, null, 2));
                }}
            />
        </div>
    );
};

export default Editor;
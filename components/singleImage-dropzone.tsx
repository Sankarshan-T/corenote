'use client';

import { cn } from '@/lib/utils';
import {
    AlertCircleIcon,
    Trash2Icon,
    UploadCloudIcon,
    XIcon,
} from 'lucide-react';
import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { ProgressCircle } from '@/components/upload/progress-circle';
import { formatFileSize, useUploader } from '@/components/upload/uploader-provider';

const DROPZONE_VARIANTS = {
    base: 'relative rounded-md p-4 flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border-2 border-dashed border-gray-400 dark:border-gray-600 transition-colors duration-200 ease-in-out',
    image:
        'border-0 p-0 min-h-0 min-w-0 relative bg-gray-100 dark:bg-gray-800 shadow-md',
    active: 'border-blue-500 dark:border-blue-400',
    disabled:
        'bg-gray-100/50 dark:bg-gray-800/50 border-gray-400/50 dark:border-gray-600/50 cursor-default pointer-events-none',
    accept:
        'border-blue-500 dark:border-blue-400 bg-blue-100 dark:bg-blue-900/30',
    reject: 'border-red-500 dark:border-red-400 bg-red-100 dark:bg-red-900/30',
};

/**
 * Props for the SingleImageDropzone component.
 *
 * @interface SingleImageDropzoneProps
 * @extends {React.HTMLAttributes<HTMLInputElement>}
 */
export interface SingleImageDropzoneProps
    extends React.HTMLAttributes<HTMLInputElement> {
    width?: number;

    height?: number;

    disabled?: boolean;

    dropzoneOptions?: Omit<
        DropzoneOptions,
        'disabled' | 'onDrop' | 'maxFiles' | 'multiple'
    >;
}


const SingleImageDropzone = React.forwardRef<
    HTMLInputElement,
    SingleImageDropzoneProps
>(({ dropzoneOptions, width, height, className, disabled, ...props }, ref) => {
    const { fileStates, addFiles, removeFile, cancelUpload } = useUploader();
    const [error, setError] = React.useState<string>();

    const fileState = React.useMemo(() => fileStates[0], [fileStates]);
    const maxSize = dropzoneOptions?.maxSize;

    const tempUrl = React.useMemo(() => {
        if (fileState?.file) {
            return URL.createObjectURL(fileState.file);
        }
        return null;
    }, [fileState]);

    React.useEffect(() => {
        return () => {
            if (tempUrl) {
                URL.revokeObjectURL(tempUrl);
            }
        };
    }, [tempUrl]);

    const displayUrl = tempUrl ?? fileState?.url;
    const isDisabled =
        !!disabled ||
        fileState?.status === 'UPLOADING' ||
        fileState?.status === 'COMPLETE';

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
        useDropzone({
            accept: { 'image/*': [] },
            multiple: false,
            disabled: isDisabled,
            onDrop: (acceptedFiles, rejectedFiles) => {
                setError(undefined);

                if (rejectedFiles.length > 0) {
                    if (rejectedFiles[0]?.errors[0]) {
                        const error = rejectedFiles[0].errors[0];
                        const code = error.code;

                        const messages: Record<string, string> = {
                            'file-too-large': `The file is too large. Max size is ${formatFileSize(
                                maxSize ?? 0,
                            )}.`,
                            'file-invalid-type': 'Invalid file type.',
                            'too-many-files': 'You can only upload one file.',
                            default: 'The file is not supported.',
                        };

                        setError(messages[code] ?? messages.default);
                    }
                    return;
                }

                if (acceptedFiles.length > 0) {
                    if (fileStates[0]) {
                        removeFile(fileStates[0].key);
                    }
                    addFiles(acceptedFiles);
                }
            },
            ...dropzoneOptions,
        });

    const dropZoneClassName = React.useMemo(
        () =>
            cn(
                DROPZONE_VARIANTS.base,
                isFocused && DROPZONE_VARIANTS.active,
                isDisabled && DROPZONE_VARIANTS.disabled,
                displayUrl && DROPZONE_VARIANTS.image,
                isDragReject && DROPZONE_VARIANTS.reject,
                isDragAccept && DROPZONE_VARIANTS.accept,
                className,
            ),
        [isFocused, isDisabled, displayUrl, isDragAccept, isDragReject, className],
    );

    const errorMessage = error ?? fileState?.error;

    return (
        <div className="flex flex-col items-center">
            <div
                {...getRootProps({
                    className: dropZoneClassName,
                    style: {
                        width,
                        height,
                    },
                })}
            >
                <input ref={ref} {...getInputProps()} {...props} />

                {displayUrl ? (
                    <img
                        className="h-full w-full rounded-md object-cover"
                        src={displayUrl}
                        alt={fileState?.file.name ?? 'uploaded image'}
                    />
                ) : (
                    <div
                        className={cn(
                            'flex flex-col items-center justify-center gap-2 text-center text-xs text-gray-500 dark:text-gray-400',
                            isDisabled && 'opacity-50',
                        )}
                    >
                        <UploadCloudIcon className="mb-1 h-7 w-7" />
                        <div className="font-medium">
                            drag & drop an image or click to select
                        </div>
                        {maxSize && (
                            <div className="text-xs">Max size: {formatFileSize(maxSize)}</div>
                        )}
                    </div>
                )}

                {displayUrl && fileState?.status === 'UPLOADING' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-black/70">
                        <ProgressCircle progress={fileState.progress} />
                    </div>
                )}

                {displayUrl &&
                    !disabled &&
                    fileState &&
                    fileState.status !== 'COMPLETE' && (
                        <button
                            type="button"
                            className="group pointer-events-auto absolute right-1 top-1 z-10 transform rounded-full border border-gray-400 bg-white p-1 shadow-md transition-all hover:scale-110 dark:border-gray-600 dark:bg-gray-800"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (fileState.status === 'UPLOADING') {
                                    cancelUpload(fileState.key);
                                } else {
                                    removeFile(fileState.key);
                                    setError(undefined);
                                }
                            }}
                        >
                            {fileState.status === 'UPLOADING' ? (
                                <XIcon className="block h-4 w-4 text-gray-500 dark:text-gray-400" />
                            ) : (
                                <Trash2Icon className="block h-4 w-4 text-gray-500 dark:text-gray-400" />
                            )}
                        </button>
                    )}
            </div>

            {errorMessage && (
                <div className="mt-2 flex items-center text-xs text-red-500 dark:text-red-400">
                    <AlertCircleIcon className="mr-1 h-4 w-4" />
                    <span>{errorMessage}</span>
                </div>
            )}
        </div>
    );
});
SingleImageDropzone.displayName = 'SingleImageDropzone';

export { SingleImageDropzone };
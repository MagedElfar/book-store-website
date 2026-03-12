"use client";

import { Pause, X, RotateCcw, UploadCloud, FileText } from "lucide-react";
import Image from "next/image";
import { useDropzone, type Accept } from "react-dropzone";

import { Button } from "@/shared/components/shadcn/button";
import { Card } from "@/shared/components/shadcn/card";
import { Progress } from "@/shared/components/shadcn/progress";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";

import { useFileUpload } from "../../hooks/useFileUpload";

interface DropzoneFieldProps {
    name: string;
    multiple?: boolean;
    accept?: Accept;
    label?: string;
    maxSize?: number;
}

export function DropzoneField({ multiple = false, accept, label, name, maxSize }: DropzoneFieldProps) {
    const { t } = useAppTranslation("common");
    const { files, handleDrop, handleCancelUpload, handleRemoveFile, handleRetry } =
        useFileUpload({ name, multiple, maxSize });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop, multiple, accept });

    return (
        <div className="w-full space-y-4">
            {/* Dropzone Area */}
            <div
                {...getRootProps()}
                className={cn(
                    "relative flex flex-col items-center justify-center min-h-[140px] md:min-h-[160px] p-4 md:p-6 text-center transition-all duration-200 cursor-pointer border-2 border-dashed rounded-xl group",
                    isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2">
                    <div className="p-2 md:p-3 rounded-full bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                        <UploadCloud className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-semibold">{label}</p>
                        <p className="text-xs text-muted-foreground px-2">
                            {isDragActive ? t("dropzone.activeMessage") : t("dropzone.defaultMessage")}
                        </p>
                    </div>
                </div>
            </div>

            {/* Files List */}
            {files.length > 0 && (
                <div className="grid grid-cols-1 gap-2 md:gap-3">
                    {files.map((fileObj, index) => {
                        const { file, preview, progress, status, url } = fileObj;
                        const isImage = file
                            ? file.type.startsWith("image/")
                            : (url?.toLowerCase().endsWith('.webp') || url?.match(/\.(jpeg|jpg|gif|png)$/i));

                        return (
                            <Card key={index} className="relative p-3 bg-background/50 border-muted-foreground/10 overflow-hidden">
                                <div className="flex items-center gap-3">
                                    {/* Thumbnail */}
                                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                        {isImage && preview ? (
                                            <Image src={preview} alt="preview" fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                <FileText className="w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                        )}
                                    </div>

                                    {/* File Info & Progress */}
                                    <div className="flex-1 min-w-0 pr-8 md:pr-0">
                                        <p className="text-xs font-medium truncate mb-1">
                                            {file?.name || t("dropzone.uploadedFile")}
                                        </p>

                                        {status === "uploading" && (
                                            <div className="flex items-center gap-2">
                                                <Progress value={progress} className="h-1.5 flex-1" />
                                                <span className="text-[10px] font-mono tabular-nums">{progress}%</span>
                                            </div>
                                        )}

                                        {status === "error" && (
                                            <p className="text-[10px] text-destructive font-semibold">
                                                {t("dropzone.uploadFailed")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Action Buttons - Absolute on mobile for better space */}
                                    <div className="flex items-center gap-1">
                                        {status === "uploading" && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 text-orange-500"
                                                onClick={(e) => { e.stopPropagation(); handleCancelUpload(index); }}
                                            >
                                                <Pause className="w-3.5 h-3.5" />
                                            </Button>
                                        )}

                                        {status === "error" && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 text-blue-500"
                                                onClick={(e) => { e.stopPropagation(); handleRetry(index); }}
                                            >
                                                <RotateCcw className="w-3.5 h-3.5" />
                                            </Button>
                                        )}

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                            onClick={(e) => { e.stopPropagation(); handleRemoveFile(index); }}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
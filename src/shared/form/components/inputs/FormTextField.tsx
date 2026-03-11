"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Input } from "@/shared/components/shadcn/input";
import { Label } from "@/shared/components/shadcn/label";

export interface FormTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    containerClassName?: string;
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
    name,
    label,
    className,
    containerClassName,
    type = "text",
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
                    {label && (
                        <Label
                            htmlFor={name}
                            className="ml-1 text-zinc-700 dark:text-zinc-300 mb-1"
                        >
                            {label}
                        </Label>
                    )}

                    <Input
                        {...field}
                        {...props}
                        id={name}
                        type={type}
                        value={field.value ?? ""}
                        className={cn(
                            "h-12 rounded-xl transition-all focus-visible:ring-2",
                            error
                                ? "border-red-500 focus-visible:ring-red-500/20"
                                : "focus-visible:border-blue-500 focus-visible:ring-blue-500/20",
                            className
                        )}
                    />

                    {error && (
                        <p className="text-xs font-medium text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
                            {error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
};
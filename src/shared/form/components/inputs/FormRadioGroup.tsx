"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Label } from "@/shared/components/shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/shadcn/radio-group";
import { cn } from "@/shared/lib/utils";

export type RadioOption = {
    label: string;
    value: string; // Radix RadioItem بيفضل الـ string
};

export interface FormRadioGroupProps {
    name: string;
    label?: string;
    options: RadioOption[];
    className?: string;
    row?: boolean;
}

export function FormRadioGroup({
    name,
    label,
    options,
    className,
    row = false,
}: FormRadioGroupProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className={cn("flex flex-col gap-3", className)}>
                    {label && (
                        <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                            {label}
                        </Label>
                    )}

                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        className={cn(
                            "flex gap-4",
                            row ? "flex-row items-center" : "flex-col"
                        )}
                    >
                        {options.map((option) => (
                            <div key={option.value} className="flex items-center gap-2">
                                <RadioGroupItem
                                    value={option.value}
                                    id={`${name}-${option.value}`}
                                    className="border-zinc-300 dark:border-zinc-700 text-blue-600 focus-visible:ring-blue-500"
                                />
                                <Label
                                    htmlFor={`${name}-${option.value}`}
                                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer select-none"
                                >
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>

                    {error && (
                        <p className="text-xs font-medium text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
                            {error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
}
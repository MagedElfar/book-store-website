"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Label } from "@/shared/components/shadcn/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/shared/components/shadcn/select";
import { COUNTRIES } from "@/shared/config/constants";
import { useAppTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";
export interface FormCountrySelectProps {
    name: string;
    label?: string;
    placeholder?: string;
    containerClassName?: string;
}

export const FormCountrySelect: React.FC<FormCountrySelectProps> = ({
    name,
    label,
    placeholder,
    containerClassName
}) => {
    const { control } = useFormContext();
    const { t } = useAppTranslation("common");

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
                            {label || t("labels.country")}
                        </Label>
                    )}

                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <SelectTrigger
                            id={name}
                            className={cn(
                                "w-full h-12 rounded-xl transition-all focus:ring-2",
                                error
                                    ? "border-red-500 focus:ring-red-500/20"
                                    : "border-zinc-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-zinc-800"
                            )}
                        >
                            <SelectValue placeholder={placeholder || t("placeHolders.select_country")} />
                        </SelectTrigger>

                        <SelectContent className="rounded-xl max-h-[300px]">
                            {COUNTRIES.map((country) => (
                                <SelectItem
                                    key={country.value}
                                    value={country.value}
                                    className="cursor-pointer"
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">{getFlagEmoji(country.value)}</span>
                                        <span>{t(country.label)}</span>
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

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

// دالة تحويل كود الدولة إلى Emoji (كما هي)
const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};
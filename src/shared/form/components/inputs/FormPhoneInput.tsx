"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PhoneInput } from "react-international-phone";

import "react-international-phone/style.css";
import { Label } from "@/shared/components/shadcn/label";
import { cn } from "@/shared/lib/utils";
import { storeSupportedCountries } from "@/shared/utils/country-utils";

export interface FormPhoneInputProps {
    name: string;
    label?: string;
    containerClassName?: string;
}

export const FormPhoneInput: React.FC<FormPhoneInputProps> = ({
    name,
    label,
    containerClassName,
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

                    <div dir="ltr" className={cn(
                        "phone-input-wrapper w-full",
                        "[&_.react-international-phone-input-container]:w-full",
                        "[&_.react-international-phone-country-selector-dropdown]:dark:bg-zinc-950",
                        "[&_.react-international-phone-country-selector-dropdown]:dark:border-zinc-800",
                        "[&_.react-international-phone-country-selector-list-item]:dark:text-zinc-200",
                        "[&_.react-international-phone-country-selector-list-item--focused]:dark:bg-zinc-800",
                        "[&_.react-international-phone-country-selector-list-item__country-name]:dark:text-zinc-300"
                    )}>
                        <PhoneInput
                            defaultCountry="eg"
                            countries={storeSupportedCountries}
                            value={field.value}
                            onChange={(phone) => field.onChange(phone.replace(/\s+/g, ""))}
                            inputClassName={cn(
                                "!flex !h-12 !w-full !rounded-r-xl !border !bg-white !px-4 !py-2 !text-sm !transition-all focus:!outline-none focus:!ring-2",
                                // Dark Mode Colors
                                "dark:!bg-zinc-950 dark:!text-zinc-100 dark:!placeholder:text-zinc-500",
                                error
                                    ? "!border-red-500 focus:!ring-red-500/20"
                                    : "!border-zinc-200 focus:!border-blue-500 focus:!ring-blue-500/20 dark:!border-zinc-800"
                            )}
                            countrySelectorStyleProps={{
                                buttonClassName: cn(
                                    "!h-12 !px-3 !rounded-l-xl !border-y !border-l !transition-colors",
                                    "!bg-zinc-50 !border-zinc-200",
                                    "dark:!bg-zinc-900 dark:!border-zinc-800 dark:hover:!bg-zinc-800",
                                    error && "!border-red-500"
                                ),
                                dropdownArrowClassName: "dark:!border-t-zinc-400",
                            }}
                        />
                    </div>

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
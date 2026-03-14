import { Star } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";

import { cn } from "@/shared/lib/utils"; // Assuming you have this shadcn utility

interface StarRatingFieldProps {
    name: string;
}

export function StarRatingField({ name }: StarRatingFieldProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const currentRating = field.value || 0;

                return (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button" // Important: to prevent form submission
                                    className="focus:outline-none transition-transform hover:scale-110"
                                    onClick={() => field.onChange(star)}
                                    onMouseEnter={() => {
                                        /* Optional: Add hover preview logic if needed */
                                    }}
                                >
                                    <Star
                                        size={28}
                                        className={cn(
                                            "transition-colors",
                                            star <= currentRating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-slate-300 dark:text-zinc-700"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Validation Message */}
                        {error && (
                            <span className="text-sm text-destructive font-medium">
                                {error.message}
                            </span>
                        )}
                    </div>
                );
            }}
        />
    );
}
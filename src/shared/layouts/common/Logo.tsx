import Image from "next/image";

import { Link } from "@/i18n/routing";

interface LogoProps {
    width?: number;
    height?: number;
    className?: string;
}

export const Logo = ({ width = 40, height = 40, className = "" }: LogoProps) => {
    return (
        <Link href="/" className={`inline-block ${className}`}>
            <div className="relative flex justify-center">
                <Image
                    src="/images/logo.png"
                    alt="Bookstore Logo"
                    width={width}
                    height={height}
                    priority
                    className="object-contain dark:brightness-110"
                />
            </div>
        </Link>
    );
};
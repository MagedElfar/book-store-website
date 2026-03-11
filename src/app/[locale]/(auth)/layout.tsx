
import AuthLayout from "@/shared/layouts/auth/AuthLayout";

export default function Layout({ children }: { children: React.ReactNode }) {


    return <AuthLayout >{children}</AuthLayout>;
}
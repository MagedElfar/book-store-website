"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Link, useRouter } from '@/i18n/routing';
import { Button } from "@/shared/components/shadcn/button";
import {
    AppFormProvider,
    FormCheckbox,
    FormContainer,
    FormPasswordField,
    FormTextField
} from '@/shared/form';
import { useAppTranslation } from '@/shared/hooks';
import { Logo } from '@/shared/layouts';
import { errorMapper } from '@/shared/utils';

import { AuthHeader } from '../components';
import { useAuthActions } from '../hooks/useAuthActions';
import { LoginSchema, type LoginSchemaType } from '../schema';

export function LoginForm() {
    const { login } = useAuthActions();
    const { t } = useAppTranslation("auth");
    const router = useRouter();

    const methods = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema(t)),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },
    });

    const onsubmit = async (data: LoginSchemaType) => {

        const { email, password } = data
        try {

            console.log("data = ", data)

            await login(email, password)
            router.replace("/")

        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }


    return (
        <AppFormProvider<LoginSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                submitText={t("signinBtn")}
                contentClassName='items-center'
                buttonClassName='sm:w-full'
            >

                <div className="flex justify-center">
                    <Logo />
                </div>

                <AuthHeader
                    title={t("signin")}
                    description={t("no_account_yet")}
                    linkText={t("create_account")}
                    linkHref="/auth/register"
                />

                <div className="space-y-4 w-full">
                    <FormTextField
                        name="email"
                        label={t("label.email")}
                        placeholder={t("placeHolder.email")}
                    />

                    <FormPasswordField
                        name="password"
                        label={t("label.password")}
                        placeholder={t("placeHolder.password")}
                    />

                    <div className="flex items-center justify-between w-full pt-2">
                        <FormCheckbox
                            name="rememberMe"
                            label={t("label.rememberMe")}
                        />

                        <Button
                            variant="link"
                            size="sm"
                            asChild
                            className="px-0 font-medium text-xs text-blue-600 hover:text-blue-500 underline-offset-4"
                        >
                            <Link href="/auth/forget-password">
                                {t("forgetPassword")}
                            </Link>
                        </Button>
                    </div>
                </div>
            </FormContainer>
        </AppFormProvider>
    );
}
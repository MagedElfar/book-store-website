"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Link, useRouter } from '@/i18n/routing';
import { Button } from "@/shared/components/shadcn/button";
import { paths } from '@/shared/config/paths';
import { FormCheckbox } from '@/shared/form/components/inputs/FormCheckbox';
import { FormPasswordField } from '@/shared/form/components/inputs/FormPasswordField';
import { FormTextField } from '@/shared/form/components/inputs/FormTextField';
import { FormContainer } from '@/shared/form/components/layout/FormContainer';
import { AppFormProvider } from '@/shared/form/providers/AppFormProvider';
import { useAppTranslation } from '@/shared/hooks/use-translation';
import { Logo } from '@/shared/layouts/common/Logo';
import { errorMapper } from '@/shared/utils/error';

import { AuthHeader } from '../components/AuthHeader';
import { useAuthActions } from '../hooks/useAuthActions';
import { LoginSchemaType, LoginSchema } from '../schema/LoginSchema';

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
                    linkHref={paths.auth.register}
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
                            type="submit"
                            variant="link"
                            size="sm"
                            asChild
                            className="px-0 font-medium text-xs text-blue-600 hover:text-blue-500 underline-offset-4"
                        >
                            <Link href={paths.auth.forgetPassword}>
                                {t("forgetPassword")}
                            </Link>
                        </Button>
                    </div>
                </div>
            </FormContainer>
        </AppFormProvider>
    );
}
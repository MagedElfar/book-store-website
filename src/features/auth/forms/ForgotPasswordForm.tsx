"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Link } from '@/i18n/routing';
import { Button } from "@/shared/components/shadcn/button";
import { paths } from '@/shared/config/paths';
import { FormTextField } from '@/shared/form/components/inputs/FormTextField';
import { FormContainer } from '@/shared/form/components/layout/FormContainer';
import { AppFormProvider } from '@/shared/form/providers/AppFormProvider';
import { useAppTranslation } from '@/shared/hooks/use-translation';
import { Logo } from '@/shared/layouts/common/Logo';
import { errorMapper } from '@/shared/utils/error';

import { forgotPassword } from '../api/actions';
import { AuthHeader } from '../components/AuthHeader';
import { ForgotPasswordSchemaType, ForgotPasswordSchema } from '../schema/ForgotPasswordSchema';

export function ForgotPasswordForm() {
    const { t } = useAppTranslation("auth")

    const defaultValues: ForgotPasswordSchemaType = {
        email: "",
    }


    const methods = useForm<ForgotPasswordSchemaType>({
        resolver: zodResolver(ForgotPasswordSchema(t)),
        defaultValues,
    });

    const { reset } = methods
    const onsubmit = async (data: ForgotPasswordSchemaType) => {

        const { email } = data
        try {

            await forgotPassword(email)

            toast.success(t("feedback.successForgetPassword"))
            reset()
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }


    return (
        <AppFormProvider<ForgotPasswordSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                submitText={t("forgetPasswordBtn")}
                contentClassName='items-center'
                buttonClassName='sm:w-full'
            >

                <div className="flex justify-center">
                    <Logo />
                </div>

                <AuthHeader
                    title={t("forgetPassword")}
                />

                <div className="space-y-4 w-full">

                    <FormTextField
                        name="email"
                        label={t("label.email")}
                        placeholder={t("placeHolder.email")}
                        required
                    />

                    <div className="flex items-center justify-end w-full pt-2">
                        <Button
                            type="submit"
                            variant="link"
                            size="sm"
                            asChild
                            className="px-0 font-medium text-xs text-blue-600 hover:text-blue-500 underline-offset-4"
                        >
                            <Link href={paths.auth.login}>
                                {t("backToLogin")}
                            </Link>
                        </Button>
                    </div>
                </div>
            </FormContainer>
        </AppFormProvider>
    );
}
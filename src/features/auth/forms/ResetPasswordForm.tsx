"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Link, useRouter } from '@/i18n/routing';
import { Button } from "@/shared/components/shadcn/button";
import { paths } from '@/shared/config/paths';
import { FormPasswordField } from '@/shared/form/components/inputs/FormPasswordField';
import { FormContainer } from '@/shared/form/components/layout/FormContainer';
import { AppFormProvider } from '@/shared/form/providers/AppFormProvider';
import { useAppTranslation } from '@/shared/hooks/use-translation';
import { Logo } from '@/shared/layouts/common/Logo';
import { errorMapper } from '@/shared/utils/error';

import { resetPassword } from '../api/actions';
import { AuthHeader } from '../components/AuthHeader';
import { ResetPasswordSchemaType, ResetPasswordSchema } from '../schema/ResetPasswordSchema';

export function ResetPasswordForm() {
    const { t } = useAppTranslation("auth")

    const router = useRouter()

    const defaultValues: ResetPasswordSchemaType = {
        password: "",
        confirmPassword: ""
    }


    const methods = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(ResetPasswordSchema(t)),
        defaultValues,
    });

    const onsubmit = async (data: ResetPasswordSchemaType) => {

        const { password } = data
        try {

            await resetPassword(password)
            toast.success(t("feedback.successRestPassword"))
            router.push(paths.auth.login)

        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }
    return (
        <AppFormProvider<ResetPasswordSchemaType> methods={methods} onSubmit={onsubmit}>
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

                    <FormPasswordField
                        name="password"
                        label={t("label.password")}
                        placeholder={t("placeHolder.password")}
                        required
                    />

                    <FormPasswordField
                        name="confirmPassword"
                        label={t("label.confirmPassword")}
                        placeholder={t("placeHolder.confirmPassword")}
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
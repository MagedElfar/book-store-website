"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Link, useRouter } from '@/i18n/routing';
import { Button } from "@/shared/components/shadcn/button";
import { paths } from '@/shared/config';
import {
    AppFormProvider,
    FormCheckbox,
    FormContainer,
    FormPasswordField,
    FormPhoneInput,
    FormTextField
} from '@/shared/form';
import { useAppTranslation } from '@/shared/hooks';
import { Logo } from '@/shared/layouts';
import { errorMapper } from '@/shared/utils';

import { AuthHeader } from '../components';
import { useAuthActions } from '../hooks/useAuthActions';
import { SignupSchema, type SignupSchemaType } from '../schema';
import { SignupApiRequest } from '../types';

export function SignupForm() {
    const { signup } = useAuthActions();
    const { t } = useAppTranslation("auth");
    const router = useRouter();

    const methods = useForm<SignupSchemaType>({
        resolver: zodResolver(SignupSchema(t)),
        defaultValues: {
            email: "",
            password: "",
            full_name: "",
            phone: "",
            rememberMe: false
        },
    });

    const onsubmit = async (data: SignupSchemaType) => {

        const { rememberMe: _, ...rest } = data
        try {

            await signup(rest as SignupApiRequest)
            router.replace("/")

        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }


    return (
        <AppFormProvider<SignupSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                submitText={t("signupBtn")}
                contentClassName='items-center'
                buttonClassName='sm:w-full'
            >

                <div className="flex justify-center">
                    <Logo />
                </div>

                <AuthHeader
                    title={t("signup")}
                    description={t("already_have_account")}
                    linkText={t("signin")}
                    linkHref={paths.auth.login}
                />

                <div className="space-y-4 w-full">
                    <FormTextField
                        name="full_name"
                        label={t("label.fullName")}
                        placeholder={t("placeHolder.fullName")}
                    />

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

                    <FormPhoneInput
                        name="phone"
                        label={t("label.phone")}
                    />


                    <div className="flex items-center justify-between w-full pt-2">
                        <FormCheckbox
                            name="rememberMe"
                            label={t("label.rememberMe")}
                        />
                    </div>
                </div>
            </FormContainer>
        </AppFormProvider>
    );
}
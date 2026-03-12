"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useRouter } from '@/i18n/routing';
import { paths } from '@/shared/config/paths';
import { FormCheckbox } from '@/shared/form/components/inputs/FormCheckbox';
import { FormPasswordField } from '@/shared/form/components/inputs/FormPasswordField';
import { FormPhoneInput } from '@/shared/form/components/inputs/FormPhoneInput';
import { FormTextField } from '@/shared/form/components/inputs/FormTextField';
import { FormContainer } from '@/shared/form/components/layout/FormContainer';
import { AppFormProvider } from '@/shared/form/providers/AppFormProvider';
import { useAppTranslation } from '@/shared/hooks/use-translation';
import { Logo } from '@/shared/layouts/common/Logo';
import { errorMapper } from '@/shared/utils/error';

import { AuthHeader } from '../components/AuthHeader';
import { useAuthActions } from '../hooks/useAuthActions';
import { SignupSchemaType, SignupSchema } from '../schema/SignupSchema';
import { SignupApiRequest } from '../types/request';

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
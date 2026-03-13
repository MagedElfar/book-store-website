"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { FormPasswordField } from '@/shared/form/components/inputs/FormPasswordField';
import { FormContainer } from '@/shared/form/components/layout/FormContainer';
import { AppFormProvider } from '@/shared/form/providers/AppFormProvider';
import { useAppTranslation } from '@/shared/hooks/use-translation';
import { errorMapper } from '@/shared/utils/error';

import { changePasswordApi } from '../api/post';
import { ChangePasswordSchemaType, ChangePasswordSchema } from '../schema/ChangePasswordSchema';


export function ChangePasswordForm() {

    const { user } = useAuthState()
    const { t } = useAppTranslation("account")

    const defaultValues: ChangePasswordSchemaType = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    }


    const methods = useForm<ChangePasswordSchemaType>({
        resolver: zodResolver(ChangePasswordSchema(t)),
        defaultValues,
    });

    const { reset } = methods

    const onsubmit = async (data: ChangePasswordSchemaType) => {
        const { oldPassword, newPassword } = data
        try {

            await changePasswordApi(oldPassword, newPassword, user!.email)

            toast.success(t("feedBack.successPasswordUpdate"))

            reset()
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }

    return (
        <AppFormProvider<ChangePasswordSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                contentClassName='items-center'
                buttonClassName='sm:w-full'
                className='space-y-4'
            >

                <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {t("password")}
                </h3>


                <FormPasswordField
                    name="oldPassword"
                    label={t("label.oldPassword")}
                    placeholder={t("placeHolder.oldPassword")}
                    required
                />

                <FormPasswordField
                    name="newPassword"
                    label={t("label.newPassword")}
                    placeholder={t("placeHolder.newPassword")}
                    required
                />

                <FormPasswordField
                    name="confirmPassword"
                    label={t("label.confirmPassword")}
                    placeholder={t("placeHolder.confirmPassword")}
                    required
                />
            </FormContainer>
        </AppFormProvider>
    )
}

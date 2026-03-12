"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { FormTextField } from '@/shared/form/components/inputs/FormTextField';
import { FormContainer } from '@/shared/form/components/layout/FormContainer';
import { AppFormProvider } from '@/shared/form/providers/AppFormProvider';
import { useAppTranslation } from '@/shared/hooks/use-translation';
import { errorMapper } from '@/shared/utils/error';

import { changeEmailApi } from '../api/post';
import { EmailSchemaType, EmailSchema } from '../schema/EmailSchema';

export function EmailForm() {

    const { user } = useAuthState()
    const { t } = useAppTranslation("account")

    const defaultValues: EmailSchemaType = {
        email: user!.email,
    }


    const methods = useForm<EmailSchemaType>({
        resolver: zodResolver(EmailSchema(t)),
        defaultValues,
    });

    const onsubmit = async (data: EmailSchemaType) => {
        try {

            await changeEmailApi(data.email)

            toast.success(t("feedBack.successEmailUpdate"))
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }

    return (
        <AppFormProvider<EmailSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                contentClassName='items-center'
                buttonClassName='sm:w-full'
            >

                <FormTextField
                    name="email"
                    label={t("label.email")}
                    placeholder={t("placeHolder.email")}
                    required
                />
            </FormContainer>
        </AppFormProvider>
    )
}

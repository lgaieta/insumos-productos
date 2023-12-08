type FormErrors = {
    [errorKey: string]: string;
};

type InputErrors = {
    validationState: 'invalid' | 'valid';
    errorMessage: string | null;
};

export const getInputErrorProps = (errors: FormErrors, key: keyof FormErrors): InputErrors => {
    return {
        validationState: errors[key] ? 'invalid' : 'valid',
        errorMessage: errors[key] || null,
    };
};

import { MaterialDetailsFormErrors } from '@insumos/(lib)/ui/components/material-details/MaterialDetails';
import { SafeParseError } from 'zod';

export const accumulateFormErrors = <Structure extends Object>(
    parsedResult: SafeParseError<Structure>,
) => {
    const errors: Partial<MaterialDetailsFormErrors> = parsedResult.error.issues.reduce(
        (errorsAccumulator, issue) => ({
            ...errorsAccumulator,
            [issue.path[0]]: issue.message,
        }),
        {},
    );

    console.log(errors);

    return { errors };
};

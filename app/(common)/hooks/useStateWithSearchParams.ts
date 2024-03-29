import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Options<StateValue> = {
    // String that matches with the URL query param name
    paramName: string;
    // Fallback value if query param is not found
    fallbackValue: StateValue;
    paramToState: (param: string) => StateValue;
    stateToParam: (state: StateValue) => string;
};

export const useStateWithSearchParams = <StateValue = string>(options: Options<StateValue>) => {
    const { paramName, fallbackValue, paramToState, stateToParam } = options;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageParam = searchParams.get(paramName);

    const [value, setValue] = useState<StateValue>(
        pageParam ? paramToState(pageParam) : fallbackValue,
    );

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set(paramName, stateToParam(value));
        router.replace(`${pathname}?${params.toString()}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return [value, setValue] as const;
};

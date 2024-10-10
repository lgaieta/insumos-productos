import { useStateWithSearchParams } from '@common/ui/hooks/useStateWithSearchParams';

const PAGE_PARAM_NAME = 'pagina';

export const usePageNumber = () =>
    useStateWithSearchParams({
        paramName: PAGE_PARAM_NAME,
        fallbackValue: 1,
        stateToParam: state => String(state),
        paramToState: param => parseInt(param),
    });

import { Input } from '@nextui-org/input';

function SearchInput(props: { value: string; onValueChange: (value: string) => void }) {
    return (
        <Input
            size='sm'
            radius='md'
            type='text'
            variant='bordered'
            isClearable
            label='Buscar por nombre'
            classNames={{ base: 'w-full sm:w-auto sm:max-w-[300px]' }}
            value={props.value}
            onValueChange={props.onValueChange}
        />
    );
}

export default SearchInput;

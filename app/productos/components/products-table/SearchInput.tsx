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
            classNames={{
                base: 'w-full max-w-[276px] min-[700px]:w-auto min-[700px]:max-w-[300px]',
            }}
            value={props.value}
            onValueChange={props.onValueChange}
        />
    );
}

export default SearchInput;

import { Input, InputProps } from '@nextui-org/input';

type MaterialDetailsInputProps = InputProps & {
    isEditable: boolean;
};

function MaterialDetailsInput(props: MaterialDetailsInputProps) {
    const { isEditable, ...restProps } = props;

    return (
        <Input
            classNames={{
                base: 'opacity-100',
                label: '!text-base !font-bold text-foreground',
                inputWrapper: !isEditable ? 'bg-content1 shadow-none' : '',
            }}
            size='lg'
            isDisabled
            {...restProps}
        />
    );
}

export default MaterialDetailsInput;

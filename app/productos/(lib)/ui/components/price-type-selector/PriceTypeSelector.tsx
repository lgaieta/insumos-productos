import { Switch } from '@nextui-org/switch';

type PriceTypeSelectorProps = {
    isDynamic: boolean;
    onToggle: (value: boolean) => void;
};

function PriceTypeSelector(props: PriceTypeSelectorProps) {
    return (
        <div className='flex gap-3 items-center'>
            <p className={`font-bold  ${!props.isDynamic ? 'text-primary' : 'text-default-400'}`}>
                Precio fijo
            </p>
            <Switch
                classNames={{ wrapper: 'mx-0' }}
                checked={props.isDynamic}
                onValueChange={props.onToggle}
            />
            <p className={`font-bold ${props.isDynamic ? 'text-primary' : 'text-default-400'}`}>
                Precio variable
            </p>
        </div>
    );
}

export default PriceTypeSelector;

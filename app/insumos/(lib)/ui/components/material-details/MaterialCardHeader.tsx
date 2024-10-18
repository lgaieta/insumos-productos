import MaterialImageAvatar from '@insumos/(lib)/ui/components/material-details/MaterialImageAvatar';
import { CardHeader } from '@nextui-org/card';

type MaterialCardHeaderProps = {
    isEditable: boolean;
    imageSrc: string | null;
    title: string;
    classNames?: { imageContainer: string };
};

function MaterialCardHeader(props: MaterialCardHeaderProps) {
    return (
        <CardHeader className='p-5 flex-wrap gap-4'>
            <MaterialImageAvatar
                isEditable={props.isEditable}
                imageSrc={props.imageSrc}
                classNames={props.classNames}
            />
            <h1 className='text-2xl font-bold'>{props.title}</h1>
        </CardHeader>
    );
}

export default MaterialCardHeader;

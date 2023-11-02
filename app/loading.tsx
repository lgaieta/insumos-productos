import { Spinner } from '@nextui-org/spinner';

function Loading() {
    return (
        <div className='flex flex-col mt-10 gap-4 w-full items-center jusitfy-center'>
            <Spinner size='lg' />
            <p className='font-bold text-center'>Cargando página...</p>
        </div>
    );
}

export default Loading;

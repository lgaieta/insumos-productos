import MaterialModalOverlay from './components/MaterialModalOverlay';
import MaterialModalSkeleton from './components/MaterialModalSkeleton';

function Loading() {
    return (
        <MaterialModalOverlay>
            <MaterialModalSkeleton />
        </MaterialModalOverlay>
    );
}

export default Loading;

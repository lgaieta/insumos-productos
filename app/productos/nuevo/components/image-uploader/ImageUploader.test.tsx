import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageUploader from '@productos/nuevo/components/image-uploader/ImageUploader';

describe('ImageUploader', () => {
    test('renders', () => {
        const component = render(
            <ImageUploader
                isError={false}
                errorMessage={null}
            />,
        );

        expect(component.getByTestId('ImageUploaderContainer')).toBeInTheDocument();
    });
});

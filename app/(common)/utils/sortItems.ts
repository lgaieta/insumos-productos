import { SortDescriptor, Key } from 'react-stately';

export const sortItems = <Element extends { [key: Key]: unknown } = { [key: string]: unknown }>(
    itemA: Element,
    itemB: Element,
    sortDescriptor: SortDescriptor,
) => {
    if (!sortDescriptor.column || !sortDescriptor.direction) return 1;

    const first = itemA[sortDescriptor.column];
    const second = itemB[sortDescriptor.column];
    const firstIsString = typeof first === 'string';
    const firstIsNumber = typeof first === 'number';
    const secondIsString = typeof second === 'string';
    const secondIsNumber = typeof second === 'number';

    if (!firstIsString && !firstIsNumber) return 1;
    if (!secondIsString && !secondIsNumber) return 1;

    let cmp = 1;

    if (firstIsString && secondIsString) cmp = first.localeCompare(second);
    else cmp = first < second ? -1 : 1;

    if (sortDescriptor.direction === 'descending') {
        cmp *= -1;
    }

    return cmp;
};

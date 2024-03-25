type Params = {
    /** Number of rows that are gotten from store */
    rowLimit: number;
    /** Current cursor */
    cursor: number;
    /** Number of total rows in store */
    total: number;
};

export const getNextPageCursor = ({ rowLimit, cursor, total }: Params) => {
    const nextCursor = +cursor + +rowLimit;
    return nextCursor < total ? nextCursor : total;
};

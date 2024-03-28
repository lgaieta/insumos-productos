export const bytesToBase64 = (bytes: number[]) => {
    const binString = Array.from(bytes, byte => String.fromCodePoint(byte)).join('');
    return btoa(binString);
};

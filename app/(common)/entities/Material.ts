export type MaterialId = number;

type Material = {
    id: MaterialId;
    name: string;
    image: string | null;
    price: number;
    link: string | null;
};

export default Material;

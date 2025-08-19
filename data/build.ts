export enum Network {
    ETH = "Ethereum",
    BASE = "Base",
    POLYGON = "Polygon",
    KATANA = "Katana"
}

type AddressMap = {
    [key in Network]?: string;
};

export interface Contract {
    name: string;
    address: AddressMap;
}

export const contracts: Contract[] = [
    {
        name: "Token Contract",
        address: {
            [Network.ETH]: "0x123",
            [Network.BASE]: "0x123",
            [Network.POLYGON]: "0x123",
            [Network.KATANA]: "0x123"
        }
    },
];
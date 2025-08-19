export interface Explorer {
    chainName: string;
}

export const explorerUrl: (explorer: Explorer) => string = (explorer) => {
    switch (explorer.chainName) {
        case "mainnet":
            return "https://etherscan.io";
        case "base":
            return "https://basescan.org";
        case "polygon":
            return "https://polygonscan.com";
        case "katana":
            return "https://katanascan.com";
        default:
            return "https://etherscan.io";
    }
}

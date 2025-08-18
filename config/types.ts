import { Network } from "./enum";

interface ContractsTableProps {
  contracts: Contract[];
}

interface GridItem {
  type: 'club' | 'design' | 'vibes' | 'products';
  title: string
  description: string
  icon: React.ReactNode
  status?: string
  tags?: string[]
  meta?: string
  cta?: string
  ctaText?: string
  hasPersistentHover?: boolean
  external?: boolean
  bgColor?: string
  color?: string
}

interface GridProps {
  items: GridItem[]
}

type Contract = {
  name: string;
  network: Network;
  address: string;
};
  
type NavDocument = {
  name: string;
  url: string;
  icon: React.ReactNode
};

type NavMainItem = {
  title: string;
  url: string;
  icon: React.ReactNode
};

type NavSecondaryItem = {
  title: string;
  url: string;
  icon: React.ReactNode
};

interface Dapp {
  slug: string;
  title: string;
  url: string;
  description?: string; 
}

export type { Contract, GridItem, GridProps, ContractsTableProps, NavDocument, NavMainItem, NavSecondaryItem, Dapp };
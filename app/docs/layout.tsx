import { source } from '@/lib/source';
import type { ReactNode } from 'react';
import { DocsLayout } from '@/components/layouts/docs';
import { baseOptions } from './layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout 
      tree={source.pageTree}
      links={baseOptions.links}
      nav={baseOptions.nav} 
    >
      {children}
    </DocsLayout>
  );
}
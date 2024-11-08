// src/components/LayoutWrapper.tsx

'use client';

import { usePathname } from 'next/navigation';
import { Container } from 'react-bootstrap';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <Container className={`layout-container ${isHomePage ? 'home-page-container' : ''}`}>
      {children}
    </Container>
  );
}

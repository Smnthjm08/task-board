'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { Accordion } from '../ui/accordion';
import { useContext, useState } from 'react';

interface SidebarProps {
  storageKey?: string;
}

export default function OrganizationSidebar({
  storageKey = 'org-sidebar-state',
}: SidebarProps) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
//   const {organization} = useContext(organizationContext)

  return (
    <div>
      <div>hello</div>
    </div>
  );
}

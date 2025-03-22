'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Accordion } from '../ui/accordion';
import { useContext } from 'react';
import OrganizationContext from '@/context/org-context';
import { NavItems } from './nav-items';

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

  const { organization, isOwner } = useContext(OrganizationContext);

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!organization) {
    return (
      <>
        <div className='mb-2 flex items-center justify-between'>
          <Skeleton className='h-10 w-[50%]' />
          <Skeleton className='h-10 w-10' />
        </div>
        <div className='space-y-2'>
          <NavItems.Skeleton />
          <NavItems.Skeleton />
          <NavItems.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className='mb-1 flex items-center text-xs font-medium'>
        <span className='pl-4'>Workspaces</span>
        <Button
          asChild
          type='button'
          size='icon'
          variant='ghost'
          className='ml-auto'
        >
          <Link href='/setup-organization'>
            <Plus className='h-4 w-4' />
          </Link>
        </Button>
      </div>
      <Accordion
        type='multiple'
        defaultValue={defaultAccordionValue}
        className='space-y-2'
      >
        {organization && (
          <NavItems
            isActive={true}
            isExpanded={expanded[organization.id]}
            organization={organization}
            onExpand={onExpand}
          />
        )}
      </Accordion>
    </>
  );
}

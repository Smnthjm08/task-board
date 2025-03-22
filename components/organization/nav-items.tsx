'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Activity, CreditCard, Layout, Settings, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface NavItemsProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: any;
  onExpand: (id: string) => void;
}

export const NavItems = (props: NavItemsProps) => {
  const { isActive, isExpanded, organization, onExpand } = props;
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: 'Boards',
      icon: <Layout className='mr-2 h-4 w-4' />,
      href: `/organization/${organization.id}`,
    },
    {
      label: 'Activity',
      icon: <Activity className='mr-2 h-4 w-4' />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: 'My team',
      icon: <Users className='mr-2 h-4 w-4' />,
      href: `/organization/${organization.id}/members`,
    },
    {
      label: 'Settings',
      icon: <Settings className='mr-2 h-4 w-4' />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: 'Billing',
      icon: <CreditCard className='mr-2 h-4 w-4' />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onButtonClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization?.id} className='border-none'>
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline hover:bg-neutral-500/10 hover:underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
        )}
      >
        <div className='flex items-center gap-x-2'>
          <div className='relative h-7 w-7'>
            <Image
              fill
              src={organization?.logo ?? 'https://github.com/shadcn.png'}
              alt='Organization'
              className='rounded-sm object-cover'
            />
          </div>
          <span className='text-sm font-medium'>{organization?.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-1 text-neutral-400'>
        {routes.map((route) => (
          <Button
            key={route.label}
            size={'sm'}
            onClick={() => onButtonClick(route.href)}
            className={cn(
              'mb-1 w-full justify-start pl-10 font-normal',
              pathname === route.href && 'bg-sky-500/10 text-sky-700'
            )}
            variant={'ghost'}
          >
            {route.icon}
            {route?.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItems.Skeleton = function SkeletonNavItem() {
  return (
    <div className='flex items-center gap-x-2'>
      <div className='relative h-10 w-10 shrink-0'>
        <Skeleton className='absolute h-full w-full' />
      </div>
      <Skeleton className='h-10 w-full' />
    </div>
  );
};

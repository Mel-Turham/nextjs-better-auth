import React from 'react';

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '../ui/sidebar';
import { authClient } from '@/lib/auth-client';

interface Props {
  handlerLogout: () => void;
  isMobile: boolean;
}

const UserInfo = ({ handlerLogout, isMobile }: Props) => {
  const { data: session, error } = authClient.useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <Avatar className='h-8 w-8 rounded-lg grayscale'>
            <AvatarImage src={session?.user?.image || ''} />
            <AvatarFallback className='rounded-lg'>
              {session?.user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>{session?.user?.name}</span>
            <span className='text-muted-foreground truncate text-xs'>
              {session?.user?.email}
            </span>
          </div>
          <IconDotsVertical className='ml-auto size-4' />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
        align='end'
        sideOffset={4}
        side={isMobile ? 'bottom' : 'right'}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarImage src={session?.user?.image || ''} />
              <AvatarFallback className='rounded-lg'>
                {session?.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-medium'>
                {session?.user?.name}
              </span>
              <span className='text-muted-foreground truncate text-xs'>
                {session?.user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconUserCircle />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconCreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconNotification />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handlerLogout}>
          <IconLogout />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfo;

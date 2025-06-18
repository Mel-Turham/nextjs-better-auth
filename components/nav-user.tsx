'use client';
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import UserInfo from './user/user-info';

export function NavUser({}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const handlerLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Vous avez été deconnecté avec succès.');
            router.push('/sign-in');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message, {
              duration: 4000,
            });
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue lors de la deconnexion.');
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserInfo handlerLogout={handlerLogout} isMobile={isMobile} />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

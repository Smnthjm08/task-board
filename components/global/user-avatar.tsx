import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Avatar } from '../ui/avatar';

export default function UserAvatar() {
  return (
    <main>
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </main>
  );
}

import { useSuspense } from '@data-client/react';
import { UserResource } from '@/resources/User';
import UserList from '@/components/UserList';

export default function Index() {
  const users = useSuspense(UserResource.getList);
  return (
    <UserList users={users} />
  );
}

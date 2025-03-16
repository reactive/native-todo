import { useSuspense } from "@data-client/react";

import UserList from "@/components/UserList";
import { UserResource } from "@/resources/User";

export default function Index() {
  const users = useSuspense(UserResource.getList);
  return <UserList users={users} />;
}

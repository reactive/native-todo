import { AsyncBoundary, useQuery, useSuspense } from '@data-client/react';
import TodoList from '@/components/TodoList';
import { Stack, useLocalSearchParams } from 'expo-router';
import { User } from '@/resources/User';
import { TodoResource } from '@/resources/Todo';

export default function TodoScreen() {
  const { userId } = useLocalSearchParams();
  if (Array.isArray(userId)) return null;
  const user = useQuery(User, { id: userId });
  return (
    <>
      <Stack.Screen
        options={{
          title: user?.name,
        }}
     /> 
      <AsyncBoundary>
        <TodoSync userId={userId} />
      </AsyncBoundary>
    </>
  );
}

// We don't want suspense to reach our Stack so animations are smooth
function TodoSync({userId}: {userId: string}) {
  const todos = useSuspense(TodoResource.getList, userId ? {userId} : {});
  return <TodoList todos={todos} />
}



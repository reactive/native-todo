import { AsyncBoundary, useQuery, useSuspense } from "@data-client/react";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

import TodoList from "@/components/TodoList";
import { TodoResource } from "@/resources/Todo";
import { User } from "@/resources/User";

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
      <AsyncBoundary fallback={<ActivityIndicator />}>
        <TodoSync userId={userId} />
      </AsyncBoundary>
    </>
  );
}

// We don't want suspense to reach our Stack so animations are smooth
function TodoSync({ userId }: { userId: string }) {
  const todos = useSuspense(TodoResource.getList, userId ? { userId } : {});
  return <TodoList todos={todos} userId={userId} />;
}

import React, { memo, useCallback } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback , StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { useController, useLoading } from '@data-client/react';
import { TodoResource, Todo } from '@/resources/Todo';
import NewTodoInput from './NewTodo'

interface TodoListProps {
  todos: Todo[];
  userId: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, userId }) => {
  const ctrl = useController();
  const flatListRef = React.useRef<FlatList<Todo>>(null);

  const handleToggle = useCallback(async (todo: Todo, completed: boolean) => {
    await ctrl.fetch(TodoResource.partialUpdate, { id: todo.id }, { completed });
  }, [ctrl]);

  const handleDelete = useCallback((todo: Todo) => {
    ctrl.fetch(TodoResource.delete, { id: todo.id });
  }, [ctrl]);

  const todoLength = todos.length;

  const handleCreate = useCallback(async (title: string) => {
    ctrl.fetch(TodoResource.getList.push, {
      userId,
      title,
    });
    flatListRef.current?.scrollToIndex({ index: todoLength-1, animated: true });
  }, [ctrl, userId, todoLength]);

  const [handleRefresh, isLoading] = useLoading(async () => ctrl.fetch(TodoResource.getList, {userId}), [ctrl]);

  const renderItem = useCallback(({ item }: { item: Todo }) => (
    <TouchableWithoutFeedback onPress={() => handleToggle(item, !item.completed)}>
      <View style={styles.todoItem}>
      <Checkbox
        value={item.completed}
        onValueChange={(newValue) => handleToggle(item, newValue)}
        style={styles.checkbox}
      />
      <Text
        style={[styles.todoText, item.completed && styles.completed]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.title}
      </Text>
      <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteButton}>
        <Feather name="x" size={20} color="#ff5555" />
      </TouchableOpacity >
      </View>
    </TouchableWithoutFeedback >
  ), [handleToggle, handleDelete]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={todos}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        // onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <NewTodoInput onSubmit={handleCreate} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    flexShrink: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteButton: {
    paddingLeft: 10,
  },
});

export default memo(TodoList);

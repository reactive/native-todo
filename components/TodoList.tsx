import React, { memo, useCallback } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback , StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { useController } from '@data-client/react';
import { TodoResource, Todo } from '@/resources/Todo';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const ctrl = useController();

  const handleToggle = useCallback(async (todo: Todo, completed: boolean) => {
    await ctrl.fetch(TodoResource.partialUpdate, { id: todo.id }, { completed });
  }, [ctrl]);

  const handleDelete = useCallback((todo: Todo) => {
    ctrl.fetch(TodoResource.delete, { id: todo.id });
  }, [ctrl]);

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
    <FlatList
      data={todos}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
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

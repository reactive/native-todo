import { Feather } from "@expo/vector-icons";
import React, { memo, useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";

interface NewTodoInputProps {
  onSubmit: (title: string) => void;
}

const NewTodoInput: React.FC<NewTodoInputProps> = ({ onSubmit }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = useCallback(() => {
    if (newTodo.trim()) {
      onSubmit(newTodo);
      setNewTodo("");
    }
  }, [newTodo, onSubmit]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add a new todo"
        value={newTodo}
        onChangeText={setNewTodo}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    fontSize: 16,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});

export default memo(NewTodoInput);

import React, { memo } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { User } from '@/resources/User';

export const UserList = ({ users }: {users: User[]}) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.username}
      renderItem={renderUser}
    />
  );
};

function renderUser({ item: user }: {item: User}) {
  return (
    <Link href={`/${user.id}`} asChild>
      <TouchableOpacity style={styles.chatItem}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <View style={styles.chatInfo}>
          <View style={styles.nameTimeRow}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.time}>{user.username}</Text>
          </View>
          <Text style={styles.messagePreview}>{user.email}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 15,
  },
  nameTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  messagePreview: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
});

export default memo(UserList)

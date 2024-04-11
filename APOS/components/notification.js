import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons for icons

const NotificationPage = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'request', name: 'Uday Bhanu', profileImage: require('../assets/IMG_1616.jpg') },
    { id: '2', type: 'message', name: 'Sumit Kumar Panda', profileImage: require('../assets/86e8411b-9d19-4bc4-b420-5b57c8aa30be.jpg') },
    { id: '3', type: 'request', name: 'Debashis Sundaray', profileImage: require('../assets/IMG_1617.jpg') },
    { id: '4', type: 'message', name: 'Satyanarayan Mishraw', profileImage: require('../assets/IMG_1618.jpg') },
  ]);

  const handleAcceptRequest = (id) => {
    // Logic to handle accepting the request
    console.log(`Accepted request from user with id: ${id}`);
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  const handleDeleteRequest = (id) => {
    // Logic to handle deleting the request
    console.log(`Deleted request from user with id: ${id}`);
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  const handleNavigateToMessage = (item) => {
    // Navigate to private message screen passing the user's information
    navigation.navigate('Pvtmsg', { user: item });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.notificationItem}>
        <Image source={item.profileImage} style={styles.profilePic} />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationText}>
            {item.name} sent you a {item.type === 'request' ? 'connection request' : 'message'}
          </Text>
          <View style={styles.actionsContainer}>
            {item.type === 'request' ? (
              <>
                <TouchableOpacity onPress={() => handleAcceptRequest(item.id)}>
                  <MaterialCommunityIcons name="check" size={24} color="#00cc00" style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteRequest(item.id)}>
                  <MaterialCommunityIcons name="close" size={24} color="#ff0000" style={styles.actionIcon} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => handleNavigateToMessage(item)}>
                <MaterialCommunityIcons name="arrow-right" size={24} color="#0066ff" style={styles.actionIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
    flex: 1,
    fontSize: 16,
    color:'#ccc',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginLeft: 8,
  },
});

export default NotificationPage;

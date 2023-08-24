import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import messaging from '@react-native-firebase/messaging';
import Clipboard from '@react-native-clipboard/clipboard';

const App = () => {
  const [fcmToken, setFcmToken] = useState("")
  useEffect(() => {
    const getDeviceToken = async () => {
      let token = await messaging().getToken();
      setFcmToken(token)
    }
    getDeviceToken()
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived ForeGround Mode!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  const copyToClipboard = (str) => {
    Clipboard.setString(str);
    Alert.alert("Copied!")
  };
  return (
    <View>
      <Text style={styles.heading}>React Native Push Notifications</Text>
      <View style={{ marginBottom: 10 }}>
        <Text>Server Key: </Text>
        <TouchableOpacity style={styles.clipBoard} onPress={() => copyToClipboard("AAAANTn8xLo:APA91bF7cvRb3V8Z6JPtHdQtanZ7w6sf0nuZh87onT0IsSCuqL9IScZQ6g5POPWUHY0ogluPuLPaweP5kKshcGCEN7KRVpr30F386fDRkPAPO3tY8LQnxJLjzS1EuiqCIxbCAfVak5hI")}>
          <Text style={styles.text}>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 30 }}>
        <Text>FCM Token: </Text>
        <TouchableOpacity style={styles.clipBoard} onPress={() => copyToClipboard(fcmToken)}>
          <Text style={styles.text}>{fcmToken}</Text>
        </TouchableOpacity>
      </View>
      <Text>
        Note: Here is Server key and Fcm token.
        Copy Server key and Fcm token by simply press over the key.
        You can use "https://testfcm.com/" to send notifications for foreground and background state.
      </Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  clipBoard: {
    backgroundColor: 'black',
    padding: 5,
    color: 'grey'
  },
  text: { color: 'grey' }
})
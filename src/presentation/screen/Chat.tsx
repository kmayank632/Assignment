import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import SocketService from '../../services/SocketService';

const ChatScreen: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [lastMessage, setLastMessage] = useState<string>('');
    const [serverResponse, setServerResponse] = useState<string>('');

    useEffect(() => {
        // Establish connection to the server when the component mounts
        SocketService.connect();

        // Listen for messages from the server
        SocketService.onServerMessage((msg: string) => {
            setServerResponse(msg);
        });

        // Clean up the connection when the component unmounts
        return () => {
            SocketService.offServerMessage();
            SocketService.disconnect();
        };
    }, []);

    const sendMessage = () => {
        // Emit the message to the server
        setLastMessage('')
        SocketService.sendMessage(message);
        setMessage('');
        setLastMessage(message)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Send a message to the server:</Text>
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message here"
            />
            <Button title="Send" onPress={sendMessage} />
            {lastMessage ? (
                <Text style={styles.response}>Message: {lastMessage}</Text>
            ) : null}
            {serverResponse ? (
                <Text style={styles.response}>Response: {serverResponse}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
    response: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChatScreen;

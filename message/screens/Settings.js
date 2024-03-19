import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Gelişim Sürecinde(Yakında...)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', 
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red', 
    }
});

export default Settings;

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ title, variant, onPress,loading }) => {
    return (
        <TouchableOpacity 
            style={[
                styles.buttonContainer,
                {
                    backgroundColor: variant === "primary" ? "black" : "transparent",
                    paddingHorizontal: variant === "primary" ? 16 : 0
                }
            ]}
            onPress={onPress} 
            loading={loading}
            
        >
            <Text style={[styles.buttonLabel, { color: variant === "primary" ? "white" : "black" }]}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 12,
        borderRadius: 6,
    },
    buttonLabel: {
        fontSize: 18,
    },
});

export default Button;

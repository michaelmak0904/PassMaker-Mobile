import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        // Simulate API call with a 2-second delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log('Email:', email);
        console.log('Password:', password);

        // Assuming the login is successful, navigate to the home page
        navigation.navigate('Home');
    };


    return (
        <View className="flex flex-1 items-center justify-center bg-blue-200">
            <View className="bg-white p-4 rounded shadow-md w-80">
                <Text className="text-2xl font-bold text-center mb-4">Sign In</Text>
                <View className="mb-4">
                    <Text className="text-sm font-semibold">Email:</Text>
                    <TextInput
                        className="border border-gray-300 rounded px-2 py-1 mt-1"
                        placeholder="Enter your email"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View className="mb-4">
                    <Text className="text-sm font-semibold">Password:</Text>
                    <TextInput
                        className="border border-gray-300 rounded px-2 py-1 mt-1"
                        placeholder="Enter your password"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity
                    className="bg-blue-500 text-white rounded py-2 px-4"
                    onPress={handleSignIn}
                >
                    <Text className="text-center font-semibold">Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignInScreen;

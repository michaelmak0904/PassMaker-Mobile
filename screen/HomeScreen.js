import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import eventsData from "../data/EventData";

const HomeScreen = ({ navigation }) => {
    const handleSignIn = (item) => {
        navigation.navigate('Event', { item: item });
    };
    const renderItem = ({ item }) => (
        <TouchableOpacity className="border-b border-gray-500 p-4"
            onPress={() => handleSignIn(item)}
        >
            <View className="items-center">
                <Image source={{ uri: item.imageUrl }}
                    style={{ width: 200, height: 200 }} />
            </View>
            <Text className="text-xl font-semibold">{item.title}</Text>
            <Text className="text-sm font-semibold">{item.date}</Text>
            <Text className="text-sm font-semibold">{item.time}</Text>
        </TouchableOpacity>
    );

    return (
        <View className="flex flex-1 bg-blue-200">
            {/* Event Listing */}
            <FlatList
                data={eventsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}

            />
        </View>
    );
};

export default HomeScreen;

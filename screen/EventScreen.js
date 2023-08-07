import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { PlatformPayButton, isPlatformPaySupported } from '@stripe/stripe-react-native';
import { confirmPlatformPayPayment, PlatformPay } from '@stripe/stripe-react-native';

const EventScreen = ({ route, navigation }) => {
    const [isApplePaySupported, setIsApplePaySupported] = useState(false);
    const [eventItem, setEventItem] = useState(route.params.item)

    useEffect(() => {
        (async function () {
            setIsApplePaySupported(await isPlatformPaySupported());
        })();
    }, [isPlatformPaySupported]);

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`http://192.168.1.30:4242/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "currency": "HKD",
            }),
        });
        const { clientSecret } = await response.json();

        return clientSecret;
    };
    const pay = async () => {
        const clientSecret = await fetchPaymentIntentClientSecret()
        const { error } = await confirmPlatformPayPayment(
            clientSecret,
            {
                applePay: {
                    cartItems: [
                        {
                            label: eventItem.title,
                            amount: eventItem.price.toString(),
                            paymentType: PlatformPay.PaymentType.Immediate,
                        }
                    ],
                    merchantCountryCode: 'HK',
                    currencyCode: 'HKD',
                    requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
                },
            }
        );
        if (error) {
            // handle error
        } else {
            Alert.alert('Success', 'Check the logs for payment intent details.');
            //console.log(JSON.stringify(paymentIntent, null, 2));
            navigation.navigate("Success")
        }
    };

    return (
        <View className="px-5">
            <View className="items-center">
                <Image source={{ uri: eventItem.imageUrl }}
                    style={{ width: 200, height: 200 }} />
            </View>
            <Text className="text-xl font-black text-gray-700">{eventItem.title}</Text>
            <Text className="text-xl font-normal text-gray-500">{eventItem.location}</Text>
            <Text className="text-xl font-mono text-gray-500">{eventItem.date}</Text>
            <Text className="text-xl font-mono text-gray-500">{eventItem.time}</Text>
            <Text className="text-m font-mono text-gray-500">{eventItem.presenter}</Text>
            <Text className="text-s font-mono text-gray-500">{eventItem.description}</Text>
            {/* <TouchableOpacity onPress={handleBuyNow} className="bg-blue-500 py-3 px-6 rounded-lg items-center my-5 mx-5">
                <Text className="text-xl font-mono text-white">Buy Now</Text>
            </TouchableOpacity> */}
            {isApplePaySupported && (
                <PlatformPayButton
                    onPress={pay}
                    borderRadius={4}
                    style={{
                        width: '100%',
                        height: 50,
                    }}
                />
            )}

        </View>
    )
}

export default EventScreen
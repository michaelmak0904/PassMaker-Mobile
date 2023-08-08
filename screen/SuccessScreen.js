import { View, Text, Alert, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'
import axios from 'axios';
import PassKit, { AddPassButton } from 'react-native-wallet-pass'
import { Buffer } from "buffer";

const SuccessScreen = ({ route, navigation }) => {

    const createPassRequest = async () => {
        await axios.post("http://localhost:3000/pass", {
            "primary": {
                "label": "Event Name",
                "value": "Awesome Concert"
            },
            "secondary": [
                {
                    "label": "Location",
                    "value": "Music Hall"
                }
            ],
            "auxiliary": [
                {
                    "label": "Date",
                    "value": "2023-07-01"
                }
            ],
            "thumbnail": "https://static.wixstatic.com/media/27cb76_99ef2bcb9c7b438f85ee24e8c5676853~mv2.png/v1/crop/x_0,y_2,w_1500,h_1495/fill/w_316,h_315,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ACR350v2.png"
        }).then(async (passResponse) => {
            console.log("Success", passResponse)
            PassKit.canAddPasses()
                .then(async (result) => {
                    if (result) {
                        await axios.get("http://localhost:3000/download", { responseType: "arraybuffer" })
                            .then((donwloadPassResponse) => {
                                let passData = Buffer.from(donwloadPassResponse.data, 'binary').toString('base64')
                                PassKit.addPass(passData)
                            })

                    }
                })
            //Alert.alert("Success", passResponse)
        }).catch((error) => {
            console.log("Error", error)
            //Alert.alert("Error", error)
        })
    }

    return (
        <View className="px-5">
            <View className="items-center">
                <Text>
                    <Icon name="checkmark-circle-outline" size={200} color="#0F0" />
                </Text>
                <Text className="my-2 text-xl">Ticket Payment Sucessful</Text>
                <Text className="my-2 text-gray-500">Your payment has been processed!</Text>
                <Text className="my-2 text-gray-500">Details of transaction are included below</Text>
                <View className="border-t-2 border-gray-500 flex w-full items-center py-5">
                    <Text className="text-gray-500 text-sm">Transaction Number : 129843</Text>
                </View>
            </View>
            <Text>TOTAL AMOUNT PAID : $499</Text>
            <Text>TRANSACTION DATE : 12 Aug 2023</Text>

            <AddPassButton
                style={{ height: 60 }}
                addPassButtonStyle={PassKit.AddPassButtonStyle.black}
                onPress={() => { createPassRequest() }}
            />
        </View>
    )
}

export default SuccessScreen
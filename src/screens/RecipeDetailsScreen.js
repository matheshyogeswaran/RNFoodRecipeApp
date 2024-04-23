import { View, Text, Image,ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';

const RecipeDetailsScreen = (props) => {
    let item=props.route.params;
  return (
    <ScrollView
        className="bg-white flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
    >
      <StatusBar style={"light"}/>
      <View className="flex-row justify-center">
      <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width:wp(98),height:hp(50),borderRadius:53,borderBottomLeftRadius:40,borderBottomRightRadius:40 ,marginTop:4 }} 
                    className="bg-black/5"
                />

      </View>


      {/* back button */}
      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity className="p-2 rounded-full ml-5 bg-white ">
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24"/>

        </TouchableOpacity>
        <TouchableOpacity className="p-2 rounded-full mr-5 bg-white ">
            <HeartIcon size={hp(3.5)} strokeWidth={4.5} color="gray"/>

        </TouchableOpacity>

      </View>

    </ScrollView>
  )
}

export default RecipeDetailsScreen
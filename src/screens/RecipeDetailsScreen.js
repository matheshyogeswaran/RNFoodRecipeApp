import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UserIcon, UsersIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';

const RecipeDetailsScreen = (props) => {
    let item = props.route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMealData(item.idMeal);
    }, [])

    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
            console.log("got meal data", response.data);
            // console.log("rec",data);
            // if (data) {
            //     setCategories(data.categories);
            //     console.log(data.categories);
            // }


        } catch (e) {
            console.log(e);
        }

    }

    const getYoutubeVideoId = url => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if(match && match[1]){
            return match[1];
        }
        return null;
    }
    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 0; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                indexes.push(i);
            }

        }
        return indexes;
    }

    return (

        <ScrollView
            className="bg-white flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 30 }}
        >
            <StatusBar style={"dark"} />
            <View className="flex-row justify-center">
                <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 30 }}
                    className="bg-black/5"
                />

            </View>


            {/* back button */}
            <View className="w-full absolute flex-row justify-between items-center pt-14">
                <TouchableOpacity onPress={() => { navigation.goBack() }} className="p-2 rounded-full ml-5 bg-white ">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setIsFavorite(!isFavorite) }} className="p-2 rounded-full  bg-white ">
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavorite ? "red" : "gray"} />

                </TouchableOpacity>

            </View>


            {loading ? (
                <Loading size="large" className="mt-16" />
            ) : (
                meal && ( // Check if meal is defined
                    <View className="px-4 flex justify-between space-y-4 pt-8">
                        <View className="space-y-2">
                            <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text-neutral-700">{meal.strMeal} </Text>
                            <Text style={{ fontSize: hp(3) }} className="font-medium flex-1 text-neutral-500">{meal.strArea} </Text>
                        </View>

                        <View className="flex-row justify-around ">
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center">
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">

                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-netral-700">66</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-netral-700">Mins</Text>
                                </View>
                            </View>
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center">
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">

                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-netral-700">3</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-netral-700">Servings</Text>
                                </View>
                            </View>
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center">
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">

                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-netral-700">103</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-netral-700">Cal</Text>
                                </View>
                            </View>
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center">
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">

                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-netral-700"></Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-netral-700">Easy</Text>
                                </View>
                            </View>
                        </View>



                        {/* ingre */}
                        <View className="space-y-4">
                            <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                                Ingredients


                            </Text>
                            <View className="space-y-2 ml-3">
                                {ingredientsIndexes(meal).map(i => {
                                    return (
                                        <View key={i} className="flex-row space-x-4">
                                            <View style={{ height: hp(1.5), width: hp(1.5) }} className="bg-amber-300 rounded-full" />
                                            <View className="flex-row space-x-2">
                                                <Text style={{ fontSize: hp(1.9) }} className="font-extrabold text-neutral-700"> {meal['strMeasure' + i]}</Text>
                                                <Text style={{ fontSize: hp(1.9) }} className="font-medium text-neutral-600"> {meal['strIngredient' + i]}</Text>
                                            </View>
                                        </View>

                                    )
                                })}
                            </View>

                        </View>

                        {/* instruc */}
                        <View className="space-y-4">
                            <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                                Instructions
                            </Text>
                            <Text style={{ fontSize: hp(1.8) }} className=" text-neutral-700">
                                {meal?.strInstructions}
                            </Text>


                        </View>

                        {
                            meal.strYoutube && (
                                <View className="space-y-4">
                                    <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                                        Recipe Video
                                    </Text>
                                    <View>
                                        <YoutubeIframe 
                                        videoId={getYoutubeVideoId(meal.strYoutube)}
                                        // videoId="4aZr5hZXP_s"
                                        height = {hp(30)}
                                        webViewProps={{ allowsFullscreenVideo: true }} 
                                        />

                                    </View>
                                </View>

                            )
                        }
                    </View>
                )
            )}


        </ScrollView>
    )
}

export default RecipeDetailsScreen
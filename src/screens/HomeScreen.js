import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon, UserIcon } from "react-native-heroicons/solid";
import Categories from '../components/Categories';
import Recipes from '../components/Recipes.js';
import axios from 'axios';
const HomeScreen = () => {

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Beef");
    const [meals, setMeals] = useState([]);
const handleChangeCategory = category =>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
}
    useEffect(() => {
        getCategories();
        getRecipes();
    }, [])

    const getCategories = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            const data = await response.json();
            if (data) {
                setCategories(data.categories);
                // console.log(data.categories);
            }


        } catch (e) {
            console.log(e);
        }

    }
    
    const getRecipes = async (category=activeCategory) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            if (response && response.data){
                setMeals(response.data.meals);
            }
            console.log("meals",meals);
            // console.log("rec",data);
            // if (data) {
            //     setCategories(data.categories);
            //     console.log(data.categories);
            // }


        } catch (e) {
            console.log(e);
        }

    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar style='dark' />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className="space-y-6 pt-14">
                <View className="mx-4 flex-row justify-between items-center mb-2">
                    {/* image */}
                    <UserIcon size={hp(5)} color="black" />
                    <BellIcon size={hp(4)} color="black" />
                </View>


                <View className="mx-4 space-y-2 mb-2">
                    <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">Hello Mathesh</Text>
                    <View>
                        <Text style={{ fontSize: hp(3.8) }} className="text-semibold text-neutral-600">Make your own food,</Text>
                    </View>
                    <Text style={{ fontSize: hp(3.8) }} className="text-semibold text-neutral-600">
                        stay at <Text className="text-amber-400">home</Text>
                    </Text>
                </View>

                {/* searchbar */}
                <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                    <TextInput
                        placeholder="Search any recipe"
                        placeholderTextColor={'gray'}
                        style={{ fontSize: hp(1.7) }}
                        className="flex-1 text-base mb-1 pl-3 tracking-wider"
                    />
                    <View className="bg-white rounded-full p-3">
                        <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color="gray" />
                    </View>

                </View>

                {/* Categories */}
                <View>
                    {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}

                </View>

                {/* recipes */}
                <Recipes meals={meals} categories={categories}/>

            </ScrollView>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
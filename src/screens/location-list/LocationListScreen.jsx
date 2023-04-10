import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList, Pressable, Image } from 'react-native'
import { styles } from "./LocationListScreen.styles";
import { data } from '../../api/data'
import { SearchBar } from "../../components/search-bar/SearchBar";
import { getLocationList } from "../../api/location.service";



export const LocationListScreen = ({ navigation }) => {

    const [searchQuery, setSearchQuery] = useState('')
    const [locationList, setLocationList] = useState([])

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    // filtramos las locations: nos devuelve una lista filtrada segun searchQuery
    const filteredLocations = locationList.filter((location) => (location.title.toLowerCase().includes(searchQuery.toLowerCase())))


    useEffect(() =>{
        getLocationList()
        .then((data) => {
            setLocationList(data)
        })
        .catch((err) =>console.log(err))
    },[])

    const location = ({ item }) => {
        return (
            <Pressable onPress={() => navigation.navigate('LocationDetail', { item })}>
                <View style={styles.itemContainer}>
                    <Image source={{ uri: `https://drive.google.com/uc?id=${item.images[0]}` }} style={styles.itemImage}></Image>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar handleSearch={handleSearch} searchQuery={searchQuery}></SearchBar>
            <FlatList
                data={filteredLocations}
                renderItem={location}
                keyExtractor={item => item.id}
                style={styles.itemList}
            ></FlatList>
        </SafeAreaView>
    )
}
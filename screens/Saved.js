import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ScrollView, View, Text, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import NewsItem from '../components/NewsItem';

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@savedNews');
        if (value !== null) {
            return JSON.parse(value)
        }
    } catch (error) {
        alert("Something Wrong. Try Later...")
        return;
    }
};
const storeData = async (value) => {
    const savedData = await getData() || [];
    const filterdData = savedData.filter((news) => news.title !== value)
    try {
        const jsonValue = JSON.stringify(filterdData);
        await AsyncStorage.setItem('@savedNews', jsonValue)
        alert("Delete Successfully")
    } catch (error) {
        return alert("Something Went Wrong with Saving this")
    }
};

const Saved = (props) => {

    const [savedNews, setSavedNews] = useState([]);
    const focused = useIsFocused();

    const handleDelete = async (title) => {
        await storeData(title)
    };
    useEffect(() => {
        getData().then((data) => setSavedNews(data))
            .catch((err) => console.log("Problem Detected: ", err))
    }, [focused, handleDelete]);

    return (
        <ScrollView>
            <View style={styles.contianer}>
                <View style={styles.appBar}>
                    <Text style={styles.appBarTitle} > সেভ করা সংবাদ  </Text>
                </View>

                <FlatList
                    style={styles.flatList}
                    keyExtractor={(item) => item.title}
                    data={savedNews}
                    renderItem={({ item }) => (
                        <NewsItem
                            navigation={props.navigation}
                            title={item.title}
                            content={item.content}
                            subtitle={item.subtitle}
                            pubDate={item.pubDate}
                            coverUrl2={item.coverUrl}
                            live_url={item.live_url}
                            handleDelete={handleDelete}

                        />)}
                />
                {
                    !savedNews.length &&
                    <View style={styles.notFound}>
                        <Text>  আপনার সেভ করা সংবাদের পরিমান 0 </Text>
                    </View>
                }
            </View>
        </ScrollView>
    )
}
export default Saved;

const styles = StyleSheet.create({
    appBar: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: "#CAD5E2"
    },
    appBarTitle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#2d3436"
    },
    flatList: {
        display: "flex",
        flex: 1,
        height: 'auto',
    },
    contianer: {
        flex: 1,
    },
    notFound: {
        flex: 1,
        height: Dimensions.get('window').height * 0.852,
        backgroundColor: "#82ccdd",
        justifyContent: "center",
        alignItems: "center"
    }
});


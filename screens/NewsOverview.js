import React from 'react';
import DetailsNews from '../components/DetailsNews';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';

// GET and SAVE news to localstorage (AsyncStorage)
const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@savedNews');
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        alert("Something Wrong. Try Later...");
        return;
    }
};
const storeData = async (value) => {
    const savedData = await getData() || [];
    const existingIndex = savedData.findIndex((d) => d.title === value.title);

    if (existingIndex === -1) {
        savedData.push(value);
    } else {
        savedData[existingIndex] = value;
    }
    try {
        const jsonValue = JSON.stringify(savedData);
        await AsyncStorage.setItem('@savedNews', jsonValue);
        alert("Saved Successfully");
    } catch (error) {
        return alert("Something Went Wrong with Saving this");
    }
};

const NewsOverview = (props) => {
    const { title, subtitle, coverUrl, content, pubDate, live_url } = props?.route?.params;

    const newsData = {
        title,
        subtitle,
        content,
        coverUrl,
        pubDate,
        live_url,
    };
    props.navigation.setOptions({
        headerRight: () => <Button onPress={() => storeData(newsData)}>Save</Button>
    });
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    // Removing Unnessecary HTML tag from news
    const removeHtmlTags = (str) => {
        return str.replace(/<[^>]+>/g, '');
    };
    const contentWitinTags = removeHtmlTags(content);
    return (
        <DetailsNews
            title={title}
            coverUrl={coverUrl}
            content={contentWitinTags}
            pubDate={pubDate}
            live_url={live_url}
        >
        </DetailsNews >
    )
};
export default NewsOverview;


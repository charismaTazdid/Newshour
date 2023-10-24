import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import moment from "moment";

const NewsItem = ({ title, content, subtitle, navigation, pubDate, featured_media_id, coverUrl2, live_url, handleDelete }) => {

    const [coverUrl, setCoverUrl] = useState("");

    const removeHtmlTags = (str) => {
        return str.replace(/<[^>]+>/g, '');
    };
    const subtitleWitinTags = removeHtmlTags(subtitle);
    // getting the cover photo url from another API call
    const getImageUrl = async () => {
        const url = `https://yoursite.com/wp-json/wp/v2/media/${featured_media_id}?_fields=source_url`;
        try {
            await fetch(url)
                .then((res) => res.json())
                .then((data) => setCoverUrl(data.source_url))
        } catch (error) { console.log(error) }
    };
    useEffect(() => {
        getImageUrl();
    }, []);
    const handlePress = () => {
        navigation.navigate('NewsOverView', { title: title, subtitle: subtitle, content: content, coverUrl: coverUrl || coverUrl2, navigation: navigation, pubDate: pubDate, live_url: live_url })
    };

    return (
        <Pressable onPress={handlePress}>
            <Card style={styles.container}>

                <Card.Cover source={{ uri: coverUrl || coverUrl2 }} style={styles.cover} />




                <Card.Title title={title} subtitle={subtitleWitinTags} titleNumberOfLines={1} subtitleNumberOfLines={2} titleStyle={{ color: "#00b894", fontWeight: "700" }} subtitleStyle={{ color: "#000000", fontWeight: "200", fontSize: 13 }} />



                <View style={styles.actionContainer}>
                    <View>
                        <Text style={styles.pubDate}> {moment(pubDate).format("DD. MM. YYYY | h.mm A")}</Text>
                    </View>
                    {
                        handleDelete &&
                        <TouchableOpacity  >
                            <Text style={styles.deleteBtn} onPress={() => handleDelete(title)}>Delete</Text>
                        </TouchableOpacity>
                    }
                </View>
            </Card>
        </Pressable>
    )
};
export default NewsItem;

const styles = StyleSheet.create({

    container: {
        marginBottom: 15,
        paddingBottom: 15,
        backgroundColor: "#fafaff",
        borderRadius: 5,
        marginHorizontal: 4,
    },
    cover: {
        marginHorizontal: 12,
        marginTop: 5,
        borderRadius: 2,
    },
    text: {
        color: "blue",
        fontSize: 40
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 0.2,
        shadowOpacity: 0.2,
        shadowColor: "gray"
    },
    pubDate: {
        width: 180,
        marginLeft: 10,
        marginTop: 1
    },
    deleteBtn: {
        backgroundColor: "#ff7675",
        paddingHorizontal: 8,
        paddingVertical: 8,
        width: 160,
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        borderRadius: 6,
        textAlign: "center",
        marginTop: 10,
        marginRight: 10,
    },
});
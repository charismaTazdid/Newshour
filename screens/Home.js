import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Image, Dimensions } from 'react-native';
import { Appbar, MD3Colors, ProgressBar } from 'react-native-paper';
import NewsItem from '../components/NewsItem';
import logo from "../assets/logo.png";

const Home = (props) => {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1)
    const [isFetching, setIsFetching] = useState(false);

    // https://newshourbd.com/
    const loadNews = async () => {
        if (isFetching) return;
        const url = `https://newshourbd.com/wp-json/wp/v2/posts?per_page=25&_fields=id,content,title,date,excerpt,featured_media,guid&page=${pageNumber}`;

        try {
            setIsLoading(true);
            setIsFetching(true);
            await fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    const uniquePosts = data.filter((newPost) => !newsData.some((existingPost) => newPost.id === existingPost.id));
                    setNewsData((prev) => [...prev, ...uniquePosts]);
                    setIsLoading(false);
                })
                .finally(() => {
                    setIsFetching(false);
                });
        } catch (error) {
            console.log(error);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        loadNews()
    }, []);

    return (
        <View style={styles.container}>
            {/* <Appbar.Header> */}
            <View style={styles.logoContainer}>
                <Image source={logo} style={{ width: 290, height: 85, }} />
            </View>
            {/* </Appbar.Header> */}

            <ProgressBar indeterminate visible={isLoading} color={MD3Colors.error50} />

            <FlatList
                style={styles.flatList}
                onEndReached={() => {
                    if (!isFetching) {
                        setPageNumber((prevPageNumber) => prevPageNumber + 1);
                        loadNews();
                    }
                }}
                data={newsData}
                keyExtractor={(item) => item.guid.rendered}
                renderItem={({ item }) => (
                    <NewsItem
                        navigation={props.navigation}
                        content={item.content.rendered}
                        title={item.title.rendered}
                        subtitle={item.excerpt.rendered}
                        pubDate={item?.date}
                        featured_media_id={item?.featured_media}
                        live_url={item.guid.rendered}
                    />)}
            />
        </View>
    )
};
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 5,
    },
    logoContainer: {
        display: 'flex',
        justifyContent: "center",
        alignContent: 'center',
        marginLeft: (13.75 * Dimensions.get("window").width) / 100,
        marginTop: 13,
        paddingBottom: 6,
        // elevation: 4,
    },
    flatList: {
        flex: 1,
        height: 'auto',
    }
});
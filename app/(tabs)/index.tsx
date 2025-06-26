// app/(tabs)/index.tsx
import { FlatList, Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ToastAndroid, TextInput, Button } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from "expo-router";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "@/store/reducer/kursusSlice";
import { CourseCard } from "@/components/courseCard";

const Home = () => {
    const dispatch = useDispatch();
    const kursusList = useSelector(state => state.kursus.data)
    const  [searchQuery, setSearchQuery] = useState('');

    const onGoToDetail = (itemId:String) => {
        router.push(`/detail?id=${itemId}`);
    };

    const onStartCourse = () => {
        router.push('/course');
    };

    const onGetData = async () => {
        try {
            dispatch(setData([]))
            const params = {
                filter: searchQuery,
            }
            const response = await axios.get('https://elearning-api-two.vercel.app/api/kursus',
                { params }
            );
            dispatch(setData(response.data.data))
        } catch (error) {
            dispatch(setData([]));
            const message = error?.message || 'Gagal mengambil data';

            ToastAndroid.showWithGravity(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    useEffect (() => {
        onGetData();
    }, []);

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Cari Kursus..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <View style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        title="Submit"
                        onPress={()=>onGetData()}
                    />
                </View>
            </View>
            <FlatList
                onRefresh={() => onGetData()}
                refreshing={false}
                data={kursusList}
                renderItem={({item}) => 
                    <CourseCard 
                        onGoToDetail={()=>onGoToDetail(item._Id)}
                        onStartCourse={onStartCourse}
                        catergory={item.kategori}
                        title={item.title}
                        deskription={item.deskripsi}
                        image={item.img_url}
                        tanggal={item.tgl}
                     />
                }
                keyExtractor={item => item._id}
            />
            
            {/* <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Image
                        source={{ uri: 'https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-12-07-react-lazy/social-2.png' }}
                        style={styles.image}
                    />
                    <View style={styles.cardContent}>
                        <View style={styles.headerRow}>
                            <Text style={styles.title}>React Suspense and Lazy</Text>
                            <Text style={styles.category}>Category</Text>
                        </View>
                        <Text style={styles.description}>
                            When the text is rendered, the onLayout function gets called with the
                        </Text>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.previewButton} onPress={onGoToDetail}>
                                <Text style={styles.previewText}>Preview</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.startButton} onPress={onStartCourse}>
                                <Text style={styles.startText}>Start</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <Image
                        source={{ uri: 'https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-12-07-react-lazy/social-2.png' }}
                        style={styles.image}
                    />
                    <View style={styles.cardContent}>
                        <View style={styles.headerRow}>
                            <Text style={styles.title}>React Suspense and Lazy</Text>
                            <Text style={styles.category}>Category</Text>
                        </View>
                        <Text style={styles.description}>
                            When the text is rendered, the onLayout function gets called with the
                        </Text>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.previewButton}>
                                <Text style={styles.previewText}>Preview</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.startButton}> 
                                <Text style={styles.startText}>Start</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView> */}
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#f4f6f8'
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
});

export default Home;

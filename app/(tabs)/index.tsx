// app/(tabs)/index.tsx
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from "expo-router";

const Home = () => {
    const onGoToDetail = () => {
        router.push('/detail');
    };

    const onStartCourse = () => {
        router.push('/course');
    };

    return (
        <SafeAreaProvider>
            <ScrollView style={styles.container}>
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
            </ScrollView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#f4f6f8'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 2
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover'
    },
    cardContent: {
        padding: 15
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10
    },
    category: {
        fontSize: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#f0f2f5',
        borderRadius: 12,
        overflow: 'hidden'
    },
    description: {
        fontSize: 14,
        marginBottom: 15
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10
    },
    previewButton: {
        backgroundColor: '#dbeafe',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5
    },
    previewText: {
        color: '#1e3a8a',
        fontWeight: 'bold'
    },
    startButton: {
        backgroundColor: '#fce7f3',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5
    },
    startText: {
        color: '#9d174d',
        fontWeight: 'bold'
    }
});

export default Home;

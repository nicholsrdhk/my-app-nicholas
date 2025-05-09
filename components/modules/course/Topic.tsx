import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementMaterial } from '@/store/reducer/progressSlice';
import { RootState } from "@/store";

interface CourseTopicProps {
    onNextContent: () => void;
    topic: Array<{ id: number; description: string }>;
}

export default function CourseTopic(props: CourseTopicProps) {
    const [activeTopic, setActiveTopic] = useState(0);
    const dispatch = useDispatch();

    const current = useSelector((state: RootState) => state.progress.readMaterials.length);
    const total = 5; // Ganti sesuai total materi course

    const isShowNext = props.topic.length == activeTopic;

    const onContinue = () => {
        if (activeTopic < props.topic.length) {
            setActiveTopic(activeTopic + 1);
        }
    };

    const onNextTopic = () => {
        dispatch(incrementMaterial());
        setActiveTopic(0);
        props.onNextContent();
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
            <ScrollView>
                <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.headerImage} />

                {/* Progress Bar & Text */}
                <View style={styles.progressWrapper}>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: `${(current / total) * 100}%` }]} />
                    </View>
                    <Text style={styles.progressText}>Progress: {current}/{total}</Text>
                </View>

                {/* Materi */}
                <View style={styles.topicContainer}>
                    {props.topic.map((item, index) => (
                        <View key={index}>
                            {index <= activeTopic && (
                                <View style={styles.card}>
                                    <Text style={styles.courseItem}>{item.description}</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Button */}
            <View style={styles.footer}>
                {!isShowNext ? (
                    <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
                        <Text style={styles.btnText}>Tap to Continue</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.nextBtn} onPress={onNextTopic}>
                        <Text style={styles.btnText}>Next Topic</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        width: '100%',
        height: 200,
    },
    progressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 5,
    },
    progressContainer: {
        flex: 1,
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginRight: 10,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#6A1B9A',
    },
    progressText: {
        fontSize: 14,
        color: '#555',
        minWidth: 70,
        textAlign: 'right',
    },
    topicContainer: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    courseItem: {
        fontSize: 16,
        color: '#333',
    },
    footer: {
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    continueBtn: {
        backgroundColor: '#8E24AA',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    nextBtn: {
        backgroundColor: '#1565C0',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

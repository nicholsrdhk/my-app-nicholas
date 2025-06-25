// app/detail.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, ScrollView, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { Info, Materi } from "../components/modules/detail";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const Detail = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [description, setDescription] = useState('');
  const [itemTopic, setItemTopic] = useState([]);
  const { id } = useLocalSearchParams();

  const onGetData = async () => {
        try {
            const response = await axios.get(`https://elearning-api-two.vercel.app/api/kursus/${id}`);
            setDescription(response.data.data.deskripsi);

            if(response.data.data.content && response.data.data.content.length > 0) {
              const topic = response.data.data.content.map((item:any, index:Number) => {
                return {
                  id: indexedDB.toString(),
                  title: item.type,
                  describe: item.type
                }
              });
              setItemTopic(topic);
            }

        } catch (error) {
            const message = error?.message || 'Gagal mengambil data';

            ToastAndroid.showWithGravity(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    const UIActiveTabs = () => {
      if (activeTab == 'info') return <Info description={description} />
      if (activeTab == 'index') return <Materi />
      return <Info description={description} />
    }

    const onStartCourse = () => {
      router.push('/course');
    };

    useEffect (() => {
        onGetData();
    }, []);

  return (
    <View style={styles.container}>
      {/* Tab switch buttons */}
      <View style={styles.switchContainer}>
        <View style={styles.switchTab}>
          <TouchableOpacity
            style={[
              styles.switchButton,
              activeTab === "info" && styles.switchButtonActive,
            ]}
            onPress={() => setActiveTab("info")}
          >
            <Text
              style={[
                styles.switchButtonText,
                activeTab === "info" && styles.switchButtonTextActive,
              ]}
            >
              Description
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchButton,
              activeTab === "index" && styles.switchButtonActive,
            ]}
            onPress={() => setActiveTab("index")}
          >
            <Text
              style={[
                styles.switchButtonText,
                activeTab === "index" && styles.switchButtonTextActive,
              ]}
            >
              Index
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab content */}
      <View style={styles.content}>
        {activeTab === "index" ? (
          <Materi />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Info />
          </ScrollView>
        )}
      </View>

      {/* Fixed button */}
      <View style={styles.footer}>
        <Button
          title="LET'S GO"
          color="#14116B"
          onPress={onStartCourse}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  switchContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  switchTab: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    overflow: "hidden",
  },
  switchButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  switchButtonActive: {
    backgroundColor: "#14116B",
  },
  switchButtonText: {
    color: "#14116B",
    fontWeight: "600",
  },
  switchButtonTextActive: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },
});

export default Detail;

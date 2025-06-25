import { View, ScrollView, Text, StyleSheet } from "react-native"

interface InfoProps {
    description?: string;
}

export const Info = (props: InfoProps) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text>{props.description}</Text>
            {/* <Text style={styles.paragraph}>
                React.lazy adalah fitur dari React yang memungkinkan pemuatan komponen dilakukan secara lazy (tertunda),
                sehingga komponen hanya dimuat saat benar-benar dibutuhkan, membantu mengurangi beban awal aplikasi dan
                mempercepat waktu muat.
            </Text>

            <View style={styles.section}>
                <Text style={styles.title}>🎯 What will I learn</Text>
                {learningPoints.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <View style={styles.dot} />
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>👤 Who is the target audience?</Text>
                {audiencePoints.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <View style={styles.dot} />
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                ))}
            </View> */}
        </ScrollView>
    )
}

const learningPoints = [
    "Memahami konsep lazy loading dalam React",
    "Mengetahui cara kerja dan penggunaan React.lazy dan Suspense",
    "Menyadari manfaat performa dari pemuatan komponen secara tertunda",
    "Mengenal batasan dan tantangan saat menggunakan fitur ini",
    "Mampu menerapkan React.lazy untuk mengoptimalkan aplikasi skala menengah hingga besar",
]

const audiencePoints = [
    "Pengembang React tingkat menengah yang ingin meningkatkan performa aplikasi",
    "Developer yang sedang membangun aplikasi SPA berskala besar",
    "Siapa pun yang ingin memahami teknik code splitting di React",
    "Front-end engineer yang fokus pada pengalaman pengguna (UX) dan efisiensi loading",
    "Mahasiswa atau praktisi yang sudah paham dasar React dan ingin mendalami fitur lanjutan",
]

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFF'
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginBottom: 20,
    },
    section: {
        marginTop: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#14116B',
        marginBottom: 12
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3B37BD',
        marginTop: 6,
        marginRight: 8
    },
    itemText: {
        flex: 1,
        fontSize: 15,
        lineHeight: 22,
        color: '#161360'
    }
});

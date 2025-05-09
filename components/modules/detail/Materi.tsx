import { View, FlatList, Text, StyleSheet } from "react-native"

const DATA = [
    { id: '1', title: 'Apa itu React.lazy', describe: 'React.lazy memungkinkan kita memuat komponen secara dinamis hanya saat dibutuhkan untuk meningkatkan efisiensi aplikasi.' },
    { id: '2', title: 'Cara Menggunakan React.lazy', describe: 'React.lazy digunakan bersama fungsi import untuk memisahkan dan memuat komponen sesuai kebutuhan.' },
    { id: '3', title: 'Suspense sebagai Pembungkus Lazy Component', describe: 'Suspense digunakan untuk menampilkan fallback UI sementara komponen lazy masih dalam proses pemuatan.' },
    { id: '4', title: 'Manfaat Lazy Loading', describe: 'Lazy loading mempercepat waktu muat awal dan mengurangi beban memori aplikasi dengan menunda pemuatan komponen.' },
    { id: '5', title: 'Batasan React.lazy dan Suspense', describe: 'React.lazy hanya mendukung default export dan Suspense belum bisa menangani pemuatan data async secara langsung.' },
];

type ItemProps = {
    title: string;
    describe: string;
};

const Item = ({ title, describe }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.describe}>{describe}</Text>
    </View>
);

export const Materi = () => {
    return (
        <FlatList
            contentContainerStyle={styles.listContainer}
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} describe={item.describe} />}
            keyExtractor={item => item.id}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: '#FFF'
    },
    item: {
        padding: 16,
        backgroundColor: '#F9F9FF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0F0',
        marginBottom: 12
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A40',
        marginBottom: 6
    },
    describe: {
        fontSize: 14,
        color: '#6B6B8D',
        lineHeight: 20
    }
});

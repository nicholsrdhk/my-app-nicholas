import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonTabsType {
    onPress(): any;
    title: String;
    isActive: Boolean;
    customStyle?: any;
}

export const ButtonTabs = (props: ButtonTabsType) => {

    return (
        <TouchableOpacity style={[
            props.customStyle,
            props.isActive ? styles.buttonActive : styles.buttonInactive
        ]}
            onPress={props.onPress}>
            <Text>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonInactive: {
        padding: 5
    },
    buttonActive: {
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#4D15A2'
    }
})

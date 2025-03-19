import { Switch, View, Text } from "react-native";


export default function SettingComponent ({title}:SettingTypeComponentProps){
    return(
        <View>
            <Text>{title}</Text>
            <Switch/>
        </View>
    )
}
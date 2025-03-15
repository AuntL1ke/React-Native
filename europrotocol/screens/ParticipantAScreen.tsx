import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function ParticipantAScreen({navigation}){
    const [name,setName] = React.useState('')
    const [birthday,setBirthday] = React.useState('')
    const [phone,setPhone] = React.useState('')
    const [car,setCar] = React.useState('')

    return(
        <View>
            <TextInput placeholder="Ім'я, прізвище" value={name} onChangeText={setName} style={styles.input}/>
            <TextInput placeholder="Дата народження" value={birthday} onChangeText={setBirthday} style={styles.input}/>
            <TextInput placeholder="Телефон" value={phone} onChangeText={setPhone} style={styles.input}/>
            <TextInput placeholder="Модель, номер авто" value={car} onChangeText={setCar} style={styles.input}/>

            <Button title='Далі' onPress={()=>navigation.navigate('ParticipantB')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1,padding:20},
    input:{marginVertical:10,padding:10,borderWidth:1,borderRadius:5}
})
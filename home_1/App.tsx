import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const artistInfo = {
  name: 'Вінсент ван Гог',
  bio: 'Нідерландський художник-постімпресіоніст, автор близько 2100 творів.',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Vincent_van_Gogh_self-portrait_dedicated_to_Gauguin.jpg',
  gallery: [
    { id: '1', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Starry_Night_Over_the_Rhone.jpg/800px-Starry_Night_Over_the_Rhone.jpg' },
    { id: '2', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Vincent_Willem_van_Gogh_128.jpg/800px-Vincent_Willem_van_Gogh_128.jpg' },
    { id: '3', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Vincent_van_Gogh_-_Irises_-_Google_Art_Project.jpg/800px-Vincent_van_Gogh_-_Irises_-_Google_Art_Project.jpg' },
  ]
};
function HomeScreen({navigation}){
  return(
    <View style={styles.container}>
      <Image source={{uri:artistInfo.photo}} style={styles.image}/>
      <Text style={styles.name}>{artistInfo.name}</Text>
      <Text style={styles.bio}>{artistInfo.bio}</Text>
      <Button title='Переглянути галерею' onPress={()=>navigation.navigate('Gallery')}/>

    </View>
  )
}
function GalleryScreen(){
  return(
    <FlatList
      data={artistInfo.gallery}
      keyExtractor={item=>item.id}
      renderItem={({item})=>(
        <Image source={{uri:item.image}} style={styles.galleryImage}/>
      )}
    />
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'Художник'}}/>
        <Stack.Screen name="Gallery" component={GalleryScreen} options={{title:'Галерея'}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    alignItems: 'center',
    justifyContent: 'center',
    padding:20 
  },
  image:{
    width:200,
    height:200,
    borderRadius:100,
    marginBottom:20
  },
  name:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:10
  },
  bio:{
    textAlign:'center',
    marginBottom:20
  },
  galleryImage:{
    width:'100%',
    height:300,
    marginBottom:15
  }
});

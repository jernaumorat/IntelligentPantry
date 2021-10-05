import { NavigationContainer } from '@react-navigation/native';
import React, {
  useState,
  useEffect,
} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Alert,

} from 'react-native';

import {
  Picker
} from '@react-native-picker/picker';

// TODO: remove all NewAppScreen imports, then remove from package deps.
import { useTheme } from '@react-navigation/native';
import { NetworkManager, PItem } from '../NetworkManager'

const PantryStyles = StyleSheet.create({
  pantryItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    // alignItems: 'center',
    margin: 10,
  },
  pantryItemContent: {
    padding: 10,
  },
})

/* Asynchronous timeout */
const wait = (timeout: number): Promise<number> => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const PantryScreen = ({ navigation }: any): JSX.Element => {
  /* Create the state elements and their setter functions.
     This state will persist for the lifecycle of the component, and is tied to a single component instance.
     This is not a mechanism for passing state/data between components, but rather is a standin for class properties. */
  const [pState, setpState] = useState<PItem[]>([])
  const [isRefreshing, setRefreshing] = useState(true)
  const { colors } = useTheme();
  const [searchtext, setSearchText] = useState("");
  const [selectedValue, setSelectedValue] = useState("A-Z");
  const [filteredDataSource, setFilteredDataSource] = useState<PItem[]>([]);

  // TODO: move all light/dark mode to context
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: colors.background,
  };
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = pState.filter(
        function (item) {
          const itemData = item.label
            ? item.label.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchText(text);
    } else {
      setFilteredDataSource(pState);
      setSearchText(text);
    }
  };
  const sortFilterFunction = (itemValue, itemIndex) =>{
    
   
    if(itemValue==="A-Z")
    {
      filteredDataSource.sort((a, b) => (a.label < b.label) ? 1 : -1);
    }
    if(itemValue==="Z-A")
    {
      filteredDataSource.sort((a, b) => (a.label > b.label) ? 1 : -1);
    
    }
    if(itemValue==="ASC(Qty)")
    {
    filteredDataSource.sort((a, b) => (a.quantity > b.quantity) ? 1 : -1);
    }
    if(itemValue==="DESC(Qty)")
    {
    filteredDataSource.sort((a, b) => (a.quantity < b.quantity) ? 1 : -1);
    }
    setSelectedValue(itemValue);
   
      
 };

  /* Generates the PantryItem components from an array of PItem objects, returns array of JSX components */
  const components_from_pitems = (data: PItem[]): JSX.Element[] => {
    const final = []

    for (let pItem of data) {
      final.push(<PantryItem key={pItem.id} itemUri={pItem.uri} itemLabel={pItem.label} itemQuant={pItem.quantity.toString()}
        onPress={() => { navigation.navigate('Item Detail', { id: pItem.id }) }} />)
    }

    return final
  }

  const update_state = async (): Promise<void> => {
    setRefreshing(true)
    let nm = NetworkManager().getInstance()
    const data = await nm.getPantryItems()
    setpState(data)
    setFilteredDataSource(data);
    await wait(1000).then(() => { setRefreshing(false) })
  }

  const pItem_components = filteredDataSource ? components_from_pitems(filteredDataSource) : []

  /* useEffect(func, []) runs func when component is first loaded. 
     The return statement of func expects a callback or lambda, and is executed when the component is cleaned up.
     We update the state of the view at first load, to ensure a seamless transition from the title card.
     The RefreshControl component requires that refreshing is set to false prior to cleanup to prevent memory leaks, and so is done in the useEffect "destructor".
     The second argument to useEffect (in this case, []) is the dependancy of the effect hook. This means that func will be called every time the dependancies update.
     We are only updating the state on user intervention at this time, so no dependancies are required here. */
  useEffect(() => {
    update_state()

    return () => {
      setRefreshing(false)
    }
  }, [])

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
      style={[backgroundStyle, { height: '100%' }]}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={update_state} />}>
         <View style={{
           backgroundColor:colors.card,
          
       
         }}>
         <TextInput
        style={
          {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor:"#ffffff",
            
            
          }
        }
        placeholderTextColor='green'
       // onChangeText={setSearchText}
       onChangeText={(text) => searchFilterFunction(text)}
        value={searchtext}
      />
      <Picker
        selectedValue={selectedValue}
        style={
          {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderColor:"#000000",
            width:"100%",
            
          }
        }
        
        onValueChange={(itemValue, itemIndex) => sortFilterFunction(itemValue,itemIndex)}
      >
        <Picker.Item color ={colors.primary} label="A-Z" value="A-Z" />
        <Picker.Item color ={colors.primary} label="Z-A" value="Z-A" />
        <Picker.Item color ={colors.primary} label="ASC" value="ASC(Qty)" />
        <Picker.Item color ={colors.primary} label="DESC" value="DESC(Qty)" />
      </Picker>
      </View>
      {pItem_components}
    </ScrollView>
  )
}

const PantryItem = (props: any): JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[PantryStyles.pantryItem]}>
        <Image style={[PantryStyles.pantryItemContent, { flex: 2, height: 100, aspectRatio: 1 }]} source={{ uri: props.itemUri }} />
        <Text style={[PantryStyles.pantryItemContent, { flex: 7, fontSize: 30, }]}>{props.itemLabel}</Text>
        <Text style={[PantryStyles.pantryItemContent, { flex: 1, fontSize: 30, }]}>{props.itemQuant}</Text>
      </View>
    </TouchableOpacity>
  );
};
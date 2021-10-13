import React, {
  useState,
  useEffect,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  Picker
} from '@react-native-picker/picker';

import { useTheme } from '@react-navigation/native';
import { NetworkManager, PItem } from '../NetworkManager'
import { StorageManager } from '../StorageManager';

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
  const [pStateFiltered, setpStateFiltered] = useState<PItem[]>([]);
  const [isRefreshing, setRefreshing] = useState(true)
  const [bearer, setBearer] = useState("");
  const [searchtext, setSearchText] = useState("");
  const [selectedValue, setSelectedValue] = useState("A-Z");

  const { colors } = useTheme();

  const searchFilterFunction = (text: string) => {
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
      setpStateFiltered(newData);
    } else {
      setpStateFiltered(pState);
      setSearchText(text);
    }
  };
  const sortFilterFunction = (itemValue: string) => {
    //function to sort data according to name and qty

    if (itemValue === "Z-A") {
      pStateFiltered.sort((a, b) => (a.label < b.label) ? 1 : -1);
    } else if (itemValue === "A-Z") {
      pStateFiltered.sort((a, b) => (a.label > b.label) ? 1 : -1);
    } else if (itemValue === "ASC(Qty)") {
      pStateFiltered.sort((a, b) => (a.quantity > b.quantity) ? 1 : -1);
    } else if (itemValue === "DESC(Qty)") {
      pStateFiltered.sort((a, b) => (a.quantity < b.quantity) ? 1 : -1);
    }
    setSelectedValue(itemValue);
  };

  /* Generates the PantryItem components from an array of PItem objects, returns array of JSX components */
  const components_from_pitems = (data: PItem[]): JSX.Element[] => {
    const final = []
    let header = "";
    for (let pItem of data) {
      let labelchat = pItem.label.charAt(0);
      //Function to make sectioning - Take the first leter of the name and convert it to header
      if (header != labelchat) {
        final.push(<Text key={'SECTION_' + labelchat.toUpperCase()}
          style={{
            backgroundColor: colors.card,
            color: colors.text,
            fontSize: 18,
            paddingStart: 5,
            paddingTop: 5
          }}>
          {labelchat.toUpperCase()}
        </Text>);
        final.push(<PantryItem key={pItem.id} itemUri={pItem.uri} itemLabel={pItem.label} itemQuant={pItem.quantity.toString()} bearer={bearer}
          onPress={() => { navigation.navigate('Item Detail', { id: pItem.id }) }} />);
        header = labelchat;
      }
      else {
        //Else push items to the list
        final.push(<PantryItem key={pItem.id} itemUri={pItem.uri} itemLabel={pItem.label} itemQuant={pItem.quantity.toString()} bearer={bearer}
          onPress={() => { navigation.navigate('Item Detail', { id: pItem.id }) }} />);
      }
    }

    return final
  }

  const update_state = async (): Promise<void> => {
    setRefreshing(true)
    let data = await StorageManager.getPantryItems();
    NetworkManager.getPantryItems().then(d => {
      StorageManager.setPantryItems(d)
      data = d
    })

    setpState(data)
    setpStateFiltered(data)

    await wait(1000).then(() => { setRefreshing(false) })
  }

  const pItem_components = pStateFiltered ? components_from_pitems(pStateFiltered) : []

  /* useEffect(func, []) runs func when component is first loaded. 
     The return statement of func expects a callback or lambda, and is executed when the component is cleaned up.
     We update the state of the view at first load, to ensure a seamless transition from the title card.
     The RefreshControl component requires that refreshing is set to false prior to cleanup to prevent memory leaks, and so is done in the useEffect "destructor".
     The second argument to useEffect (in this case, []) is the dependancy of the effect hook. This means that func will be called every time the dependancies update.
     We are only updating the state on user intervention at this time, so no dependancies are required here. */
  useEffect(() => {
    update_state()
    StorageManager.getToken().then(tk => { setBearer(tk) })
    return () => {
      setRefreshing(false)
    }
  }, [])

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
      style={{ height: '100%', backgroundColor: colors.card }}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={update_state} />}>

      <View style={{
        backgroundColor: colors.card,
      }}>
        <TextInput
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: "#ffffff",
          }}
          placeholderTextColor='green'
          // onChangeText={setSearchText}
          onChangeText={text => searchFilterFunction(text)}
          value={searchtext}
        />
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderColor: "#000000",
            width: "100%",
          }}
          onValueChange={itemValue => sortFilterFunction(itemValue)} >
          <Picker.Item color={colors.primary} label="A-Z" value="A-Z" />
          <Picker.Item color={colors.primary} label="Z-A" value="Z-A" />
          <Picker.Item color={colors.primary} label="ASC" value="ASC(Qty)" />
          <Picker.Item color={colors.primary} label="DESC" value="DESC(Qty)" />
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
        <Image style={[PantryStyles.pantryItemContent, { flex: 2, height: 100, aspectRatio: 1 }]} source={{ uri: props.itemUri, headers: { 'Authorization': 'Bearer ' + props.bearer } }} />
        <Text style={[PantryStyles.pantryItemContent, { flex: 7, fontSize: 30, }]}>{props.itemLabel}</Text>
        <Text style={[PantryStyles.pantryItemContent, { flex: 1, fontSize: 30, }]}>{props.itemQuant}</Text>
      </View>
    </TouchableOpacity>
  );
};
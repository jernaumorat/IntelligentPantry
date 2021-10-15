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

import { useTheme } from '@react-navigation/native';
import { NetworkManager, PItem } from '../NetworkManager'
import { StorageManager } from '../StorageManager';

const PantryStyles = StyleSheet.create({
  pantryItem: {
    flexDirection: 'row',
    // alignItems: 'center',
    margin: 5,
    // marginVertical: 20,
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
  const [searchText, setSearchText] = useState("");

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
    }
  };

  /* Generates the PantryItem components from an array of PItem objects, returns array of JSX components */
  const components_from_pitems = (data: PItem[]): JSX.Element[] => {
    const final = []

    for (let pItem of data) {
      final.push(<PantryItem key={pItem.id} itemUri={pItem.uri} itemLabel={pItem.label} itemQuant={pItem.quantity.toString()} bearer={bearer}
        onPress={() => { navigation.navigate('Item Detail', { id: pItem.id }) }} />);
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
      style={{ height: '100%', backgroundColor: colors.background }}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={update_state} />}>

      <View style={{
        backgroundColor: colors.background,
      }}>
        <TextInput
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: "#ffffff",
          }}
          placeholder="Search..."
          onChangeText={text => { setSearchText(text); searchFilterFunction(text) }}
          value={searchText}
        />
      </View>
      {pItem_components}
    </ScrollView>
  )
}

const PantryItem = (props: any): JSX.Element => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[PantryStyles.pantryItem, { backgroundColor: colors.card }]}>
        <Image style={[PantryStyles.pantryItemContent, { flex: 2, height: 100, aspectRatio: 1 }]} source={{ uri: props.itemUri, headers: { 'Authorization': 'Bearer ' + props.bearer } }} />
        <Text style={[PantryStyles.pantryItemContent, { flex: 7, fontSize: 30, color: colors.text }]}>{props.itemLabel}</Text>
        <Text style={[PantryStyles.pantryItemContent, { flex: 1, fontSize: 30, color: colors.text }]}>{props.itemQuant}</Text>
      </View>
    </TouchableOpacity>
  );
};
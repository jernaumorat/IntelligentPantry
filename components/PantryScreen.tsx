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
  TouchableOpacity,
} from 'react-native';

// TODO: remove all NewAppScreen imports, then remove from package deps.
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
  const [pState, setpState] = useState<PItem[]>()
  const [isRefreshing, setRefreshing] = useState(true)
  const { colors } = useTheme();

  // TODO: move all light/dark mode to context
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: colors.background,
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
    let data = await StorageManager.getPantryItems();
    NetworkManager.getPantryItems().then(d => {
      data = d
      StorageManager.setPantryItems(data)
    })

    setpState(data)
    await wait(1000).then(() => { setRefreshing(false) })
  }

  const pItem_components = pState ? components_from_pitems(pState) : []

  /* useEffect(func, []) runs func when component is first loaded. 
     The return statement of func expects a callback or lambda, and is executed when the component is cleaned up.
     We update the state of the view at first load, to ensure a seamless transition from the title card.
     The RefreshControl component requires that refreshing is set to false prior to cleanup to prevent memory leaks, and so is done in the useEffect "destructor".
     The second argument to useEffect (in this case, []) is the dependancy of the effect hook. This means that func will be called every time the dependancies update.
     We are only updating the state on user intervention at this time, so no dependancies are required here. */
  useEffect(() => {
    update_state()
    setInterval(update_state, 60000)
    return () => {
      setRefreshing(false)
    }
  }, [])

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
      style={[backgroundStyle, { height: '100%' }]}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={update_state} />}>
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
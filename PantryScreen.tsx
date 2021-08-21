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
} from 'react-native';

// TODO: remove all NewAppScreen imports, then remove from package deps.
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

interface PItem {
  id: number,
  uri: string,
  label: string,
  quantity: number
}

const PantryStyles = StyleSheet.create({
  pantryItem: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    // margin: 5,
  },
  pantryItemContent: {
    padding: 10,
    height: '100%',
  },
})

/* Asynchronous timeout */
const wait = (timeout: number): Promise<number> => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

/* Retrieves json from url, and formats the response to the PItem interface.
   NOT currently robust, needs reworking. */
const pitems_from_api = async (url: string): Promise<PItem[]> => {
  console.log(url)
  const res = await fetch(url);
  const data = await res.json();

  // TODO: This is brittle, should be generalised
  for (let item of data) {
    item.uri = url + item.id.toString() + '/img'
  }

  return data
}

export const PantryScreen = (props: any): JSX.Element => {
  /* Create the state elements and their setter functions.
     This state will persist for the lifecycle of the component, and is tied to a single component instance.
     This is not a mechanism for passing state/data between components, but rather is a standin for class properties. */
  const [pState, setpState] = useState<PItem[]>([])
  const [isRefreshing, setRefreshing] = useState(true)

  // TODO: move all light/dark mode to context
  const isDarkMode = useColorScheme() === 'dark';

  const apiUrl = 'http://192.168.0.220:5000/pantry/knownitems/';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /* Generates the PantryItem components from an array of PItem objects, returns array of JSX components */
  const components_from_pitems = (data: PItem[]): JSX.Element[] => {
    const final = []

    for (let pItem of data) {
      final.push(<PantryItem key={pItem.id} itemUri={pItem.uri} itemLabel={pItem.label} itemQuant={pItem.quantity.toString()} />)
    }

    return final
  }

  const update_state = async (): Promise<void> => {
    setRefreshing(true)
    const data = await pitems_from_api(apiUrl)
    setpState(data)
    wait(1000).then(() => { setRefreshing(false) })
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
    <View style={[PantryStyles.pantryItem]}>
      <Image style={[PantryStyles.pantryItemContent, { flex: 2, backgroundColor: 'white', height: 100, aspectRatio: 1 }]} source={{ uri: props.itemUri }} />
      <Text style={[PantryStyles.pantryItemContent, { flex: 7, backgroundColor: 'white', fontSize: 30, }]}>{props.itemLabel}</Text>
      <Text style={[PantryStyles.pantryItemContent, { flex: 1, backgroundColor: 'white', fontSize: 30, }]}>{props.itemQuant}</Text>
    </View>
  );
};
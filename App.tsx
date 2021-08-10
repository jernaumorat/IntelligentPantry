/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

interface PItem {
  id: number,
  uri: string,
  label: string,
  quantity: number
}

const fetchPantry = async (): Promise<PItem[]> => {
  const url = 'http://192.168.0.248:5000/pantry/knownitems/';
  const res = await fetch(url);
  const data = await res.json();

  for (let item of data) {
    item.uri = url + item.id.toString() + '/img'
  }

  return data
}

const PantryView = (props: any) => {
  const [pState, setpState] = useState<PItem[]>([])
  const [refreshing, setRefreshing] = useState(true)

  const itemsFromData = (data: PItem[]) => {
    const final = []

    for (let pItem of data) {
      final.push(<PantryItem key={pItem.id} itemUri={pItem.uri} itemLabel={pItem.label} itemQuant={pItem.quantity.toString()} />)
    }

    return final
  }

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const fetch = async () => {
    setRefreshing(true)
    const data = await fetchPantry()
    setpState(data)
    wait(1000).then(() => { setRefreshing(false) })
  }

  const pList = pState ? itemsFromData(pState) : []

  useEffect(() => {
    fetch()
    return () => {
      setRefreshing(false)
    }
  }, [])

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
      style={[backgroundStyle, { height: '100%' }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetch} />}>
      {pList}
    </ScrollView>
  )
}

const PantryItem = (props: any) => {
  return (
    <View style={[styles.pantryItem]}>
      <Image style={[styles.pantryItemContent, { flex: 2, backgroundColor: 'white', height: 100, aspectRatio: 1 }]} source={{ uri: props.itemUri }} />
      <Text style={[styles.pantryItemContent, { flex: 7, backgroundColor: 'white', fontSize: 30, }]}>{props.itemLabel}</Text>
      <Text style={[styles.pantryItemContent, { flex: 1, backgroundColor: 'white', fontSize: 30, }]}>{props.itemQuant}</Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <PantryView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
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
});

export default App;

/*
 * Copyright © 2021 PS2106, licensed under the MIT License, 
 * the full text of which can be found under LICENSE.md at the top level of this repository,
 * or at https://mit-license.org
 */

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
  SectionList,
  SectionListData,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { NetworkManager, PItem, SItem } from '../NetworkManager'
import { StorageManager } from '../StorageManager';

const PantryStyles = StyleSheet.create({
  pantryItem: {
    flexDirection: 'row',
    margin: 5,
  },
  pantryItemContent: {
    padding: 10,
  },
})

/* Asynchronous timeout */
const wait = (timeout: number): Promise<number> => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const PantryScreen = ({ navigation, devMode, sortType, setSortType }: any): JSX.Element => {
  /* Create the state elements and their setter functions.
     This state will persist for the lifecycle of the component, and is tied to a single component instance.
     This is not a mechanism for passing state/data between components, but rather is a standin for class properties. */
  const [itemData, setItemData] = useState<PItem[]>([])
  const [formattedData, setFormattedData] = useState<SItem[]>([]);
  const [filterText, setFilterText] = useState("");

  const [isRefreshing, setRefreshing] = useState(true)
  const [bearer, setBearer] = useState("");

  const { colors } = useTheme();

  const data_initials = (data: PItem[]): string[] => {
    const initials: string[] = []

    for (const item of data) {
      const i = item.label[0].toUpperCase()
      if (!initials.includes(i)) { initials.push(i) }
    }

    return initials
  }

  const filter_data = (text: string, data: PItem[]): PItem[] => {
    if (text) {
      const newData = data.filter(item => {
        return item.label
          .toUpperCase()
          .indexOf(text.toUpperCase()) > -1;
      });
      return newData
    } else {
      return data
    }
  };

  const sort_data = (sortType: { sort: 'alpha' | 'quant', direction: 'asc' | 'dsc' }, data: PItem[]) => {
    const d = data

    if (sortType.sort === "alpha") {
      if (sortType.direction === "asc") {
        d.sort((a, b) => (a.label > b.label) ? 1 : -1);
      } else {
        d.sort((a, b) => (a.label < b.label) ? 1 : -1);
      }
    } else {
      if (sortType.direction === "asc") {
        d.sort((a, b) => (a.quantity > b.quantity) ? 1 : -1);
      } else {
        d.sort((a, b) => (a.quantity < b.quantity) ? 1 : -1);
      }
    };

    return d
  }

  const section_data = (sortType: { sort: 'alpha' | 'quant', direction: 'asc' | 'dsc' }, data: PItem[]): SItem[] => {
    if (sortType.sort === 'quant') {
      return [
        { initial: 'QUANTITY', data: [...data] }
      ]
    }

    const initials = data_initials(data)
    const d = []
    for (const i of initials) {
      d.push({ initial: i, data: [...data.filter(it => it.label[0].toUpperCase() === i)] })
    }

    return d
  }

  /* Generates the PantryItem components from an array of PItem objects, returns array of JSX components */
  const components_from_pitems = (data: PItem[]): JSX.Element[] => {
    const final = []

    for (const pItem of data) {
      final.push(<PantryItem key={pItem.id} itemUri={pItem.uri} itemLabel={pItem.label} itemQuant={pItem.quantity.toString()} bearer={bearer}
        onPress={() => { navigation.navigate('Item Detail', { id: pItem.id }) }} devMode={devMode} />);
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

    setItemData(data)

    await wait(1000).then(() => { setRefreshing(false) })
  }


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

  useEffect(() => {
    const format_data = (data: PItem[]): SItem[] => {
      let d = data
      d = filter_data(filterText, d)
      d = sort_data(sortType, d)
      return section_data(sortType, d)
    }

    setFormattedData(format_data(itemData))
  }, [itemData, filterText, sortType.direction, sortType.sort])

  return (
    <>
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
          placeholder={"Search..."}
          placeholderTextColor={"#222222"}
          onChangeText={setFilterText}
          value={filterText}
        />
      </View>
      <SectionList
        sections={formattedData}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={update_state} />}
        renderSectionHeader={({ section: { initial } }) => {
          return initial === 'QUANTITY' ? <View style={{ marginTop: 5 }} /> :
            <Text style={{ color: colors.text, fontSize: 25, marginTop: 5, marginLeft: 5 }}>{initial}</Text>
        }}
        renderItem={({ item }) => (
          <PantryItem
            key={item.id}
            itemUri={item.uri}
            itemLabel={item.label}
            itemQuant={item.quantity.toString()}
            bearer={bearer}
            devMode={devMode}
            onPress={() => { navigation.navigate('Item Detail', { id: item.id }) }} />
        )}
      />
    </>
  )
}

const PantryItem: React.FC<{ itemUri: string, bearer: string, itemLabel: string, itemQuant: string, devMode: boolean, onPress: () => void }> =
  ({ itemUri, bearer, itemLabel, itemQuant, devMode, onPress }) => {
    const { colors } = useTheme();

    const pitem = (
      <View style={[PantryStyles.pantryItem, { backgroundColor: colors.card }]}>
        <Image style={[PantryStyles.pantryItemContent, { flex: 2, height: 100, aspectRatio: 1 }]} source={{ uri: itemUri, headers: { 'Authorization': 'Bearer ' + bearer } }} />
        <Text style={[PantryStyles.pantryItemContent, { flex: 7, fontSize: 30, color: colors.text }]}>{itemLabel}</Text>
        <Text style={[PantryStyles.pantryItemContent, { flex: 1, fontSize: 30, color: colors.text }]}>{itemQuant}</Text>
      </View>
    )

    return devMode ? (
      <TouchableOpacity onPress={onPress}>
        {pitem}
      </TouchableOpacity>
    ) : (pitem);
  };
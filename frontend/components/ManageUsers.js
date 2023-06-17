import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { SelectList } from 'react-native-dropdown-select-list';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { SearchBar, ListItem } from '@rneui/themed';
import { DataTable } from 'react-native-paper';

const Button = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.black;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.white;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style}}
      onPress={props.onPress}>
      <Text style={{ fontSize: 15, color: textColor }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const CustomButtonGroup = ({ buttons, selectedIndex, onPress }) => {
  return (
    <View style={styles.buttonGroupContainer}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedIndex === index && styles.selectedButton,
          ]}
          onPress={() => onPress(index)}
        >
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ManageUsers = ({ navigation }) => {

  // for dropdown select list
  const [selected, setSelected] = React.useState("");
  
  const data = [
    {key:'1',value:'Manage Users'},
    {key:'2',value:'Feedback'},
    {key:'3',value:'View All'},
    {key:'4',value:'Bugs and Reports'},
  ];

  const BackButton = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
      navigation.navigate('Welcome');
    };
  
    return (
      <TouchableOpacity onPress={handleBackPress}>
        <Feather name="home" size={24} color="black" style={{marginTop: 12}}/>
      </TouchableOpacity>
    );
  };
  
  // Calculate the dropdown container height based on the number of options
  const dropdownContainerHeight = data.length * 50;

  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const data1 = [
    { name: "John", status: "Active"},
    { name: "Bob", status: "Inactive"},
    { name: "Mei", status: "Active"},
  ];

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const handleButtonPress = (index) => {
    setSelectedButtonIndex(index);
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ marginHorizontal: 12, marginTop: 12 }}>
            <BackButton />
          </View>

          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 25, fontWeight: '700', color: COLORS.black, marginTop: 22 }}>
                Welcome
              </Text>

              <Pressable onPress={() => navigation.navigate('Welcome')}>
                <Text style={{ color: COLORS.black, marginLeft: 4 }}>Logout</Text>
              </Pressable>
            </View>

            <View style={{ paddingHorizontal: 20, paddingVertical: 20, flex: 1 }}>
              <SelectList
                data={data}
                setSelected={setSelected}
                boxStyles={{
                  borderRadius: 20,
                  width: 280,
                  opacity: 1,
                }}
                dropdownStyles={{
                  width: 280,
                  position: 'absolute',
                  top: '100%',
                  borderRadius: 20,
                  height: dropdownContainerHeight,
                  opacity: 1,
                }}
                defaultOption={{ key: '1', value: 'Search' }}
                search={false}
              />

              {/* Search bar */}
              <View style={styles.container}>
                <SearchBar
                  placeholder="Search by"
                  onChangeText={updateSearch}
                  value={search}
                  containerStyle={styles.searchBarContainer}
                  inputContainerStyle={styles.searchBarInputContainer}
                  inputStyle={styles.searchBarInput}
                />
                <SearchBar
                  placeholder="Search by ID"
                  onChangeText={updateSearch}
                  value={search}
                  containerStyle={styles.searchBarContainer}
                  inputContainerStyle={styles.searchBarInputContainer}
                  inputStyle={styles.searchBarInput}
                />
              </View>

              <Button
                title="Create User"
                color={COLORS.black}
                filled
                style={{
                  marginTop: 10,
                  marginBottom: 4,
                  paddingHorizontal: 12,
                }}
              />

              {/* Table */}
              <ScrollView horizontal>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title style={{ justifyContent: 'center', width: 150 }}>
                      Username
                    </DataTable.Title>
                    <DataTable.Title style={{ justifyContent: 'center', width: 150 }}>
                      Status
                    </DataTable.Title>
                  </DataTable.Header>

                  {data1.map((item, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell style={{ justifyContent: 'center', width: 150 }}>
                        {item.name}
                      </DataTable.Cell>
                      <DataTable.Cell style={{ justifyContent: 'center', width: 150 }}>
                        {item.status}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>

              </ScrollView>

              <View>
                <CustomButtonGroup
                  buttons={['View Details', 'Suspend', 'Deactivate', 'View Chat History']}
                  selectedIndex={selectedButtonIndex}
                  onPress={handleButtonPress}
                  buttonStyle={styles.button}
                  selectedButtonStyle={styles.selectedButton}
                  buttonTextStyle={styles.buttonText}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 12,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flex: 1,
  },
  searchBarInputContainer: {
    backgroundColor: "transparent",
    borderRadius: 10,
    height: 40,
  },
  searchBarInput: {
    fontSize: 12,
  },
  tableContainer: {
    marginBottom: 20,
    paddingHorizontal: 12,
    maxHeight: 200
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: COLORS.black,
    borderRadius: 20,
    width: '50%',
    alignSelf: 'center',
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  selectedButton: {
    backgroundColor: COLORS.foam,
  },
  buttonText: {
    color: 'black',
  },
});

export default ManageUsers

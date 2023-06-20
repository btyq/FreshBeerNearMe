import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import { Feather } from 'react-native-vector-icons';
import { Table, Row, Rows } from 'react-native-table-component';

//CODES TO STYLE BUTTON
const Button = (props) => {
  const filledBgColor = props.color || COLORS.yellow;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.black : COLORS.primary;
    
  return (
    <TouchableOpacity 
    style={{...styles.button,
            ...{backgroundColor: bgColor},
            ...props.style}}
    onPress={props.onPress}>
        <Text style={{fontSize: 15, ... { color: textColor }}}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const tableData = {
  tableHead: ['Case Number', 'Description', 'Status'],
  tableData: [
      ['4', 'Swag', 'Pending'],
      ['2', 'Swaggy', 'Active'],
      ['1', 'Not Swag', 'Inactive'],
  ],
};

const tableData1 = {
  tableHead1: ['Request Number', 'Requests', 'Status'],
  tableData1: [
      ['3', 'Pleasee', 'Pending'],
      ['1', 'Pleaser', 'Pending'],
      ['2', 'Pleasee', 'Done'],
  ],
};

const AdminLogin = () => {
  // for dropdown select list
  const [selected, setSelected] = React.useState("");
  
  const data = [
    {key:'1',value:'Dashboard'},
    {key:'2',value:'Reported Bugs'},
    {key:'3',value:'Feature Requests'},
    {key:'4',value:'User Management'},
    {key:'5',value:'Database Management'},
    {key:'6',value:'Content Management'},
  ];
  
  // for table data
  const [data1, setData] = useState(tableData);

  const [data2, setData2] = useState(tableData1);

  // for selectlist navigation
  const navigation = useNavigation();

  const handleGoPress = () => {
    // Perform the navigation based on the selected option
    switch (selected) {
      case 'Dashboard':
        navigation.navigate({ components: 'AdminDashboard' });
        break;
      case 'User Management':
        navigation.navigate({ components: 'ManageUsers' });
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
        <ScrollView style={{ flex: 1, marginHorizontal: 0 }} contentContainerStyle={{ padding: 0 }}>
          <Header
            placement="left"
            backgroundColor={COLORS.foam}
            centerComponent={{ text: 'FreshBeer', style: {fontSize: 20, color: COLORS.black, fontWeight: 'bold', flexDirection: 'row'} }}
            rightComponent={
              <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                <Feather name="log-out" size={24} color={COLORS.black} />
              </TouchableOpacity>}
          />

          <View style={{ flex: 1, marginHorizontal: 12, marginVertical: 22, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '700', color: COLORS.black }}>Welcome!</Text>

            <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 20, flex: 1, zIndex: 1 }}>
              <View style={{ flex: 3, marginRight: 10 }}>
                <SelectList
                  data={data}
                  setSelected={setSelected}
                  boxStyles={{
                    borderRadius: 20,
                    width: 200,
                    opacity: 1
                  }}
                  dropdownStyles={{
                    position: 'absolute',
                    top: '100%',
                    width: 200,
                    backgroundColor: COLORS.white,
                    opacity: 1
                  }}
                  defaultOption={{ key: '1', value: 'Dashboard' }}
                  search={false}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="Go"
                  color={COLORS.foam}
                  filled
                  style={{ width: '100%' }}
                  onPress={handleGoPress}
                />
              </View>
            </View>
          
          </View>

          <View style={{ flex: 1, marginHorizontal: 15, zIndex: -5 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: COLORS.black,
              zIndex: -5
            }}>New bug reports: 3</Text>
          </View>

          <View style={{ flex: 1, marginHorizontal: 12, zIndex: -5 }}>
            <View style={styles.container}>
              <Table borderStyle={{ borderWidth: 1, borderColor: COLORS.black }}>
                  <Row data={data1.tableHead} style={styles.head} textStyle={styles.headText} />
                  <Rows data={data1.tableData} textStyle={styles.text} />
              </Table>
              <View style={{ flex: 1, marginLeft: 5, marginVertical: 10 }}>
                <TouchableOpacity
                  style={styles.smallButton}
                  onPress={() => { console.log("Swag press"); }}>
                  <Text style={styles.smallButtonText}>See all</Text>
                </TouchableOpacity>
              </View> 
            </View>

            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: COLORS.black,
              zIndex: -5
            }}>New feature requests: 3</Text>

            <View style={styles.container}>
              <Table borderStyle={{ borderWidth: 1, borderColor: COLORS.black }}>
                  <Row data={data2.tableHead1} style={styles.head} textStyle={styles.headText} />
                  <Rows data={data2.tableData1} textStyle={styles.text} />
              </Table>
              <View style={{ flex: 1, marginLeft: 5, marginVertical: 10 }}>
                <TouchableOpacity
                  style={styles.smallButton}
                  onPress={() => { console.log("Swag press again"); }}
                >
                  <Text style={styles.smallButtonText}>See all</Text>
                </TouchableOpacity>
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
    paddingBottom: 10,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2
  },
  container: { 
    flex: 1, 
    padding: 5,
    justifyContent: 'center', 
  },
  head: { 
    height: 34, 
    backgroundColor: COLORS.foam
  },
  headText: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: COLORS.black 
  },
  text: { 
    margin: 6, 
    fontSize: 14, 
    textAlign: 'center' 
  },
  smallButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.foam,
    borderRadius: 8,
    alignSelf: 'flex-end',
    elevation: 2,
  },
});

export default AdminLogin

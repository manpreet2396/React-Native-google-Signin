
// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// // import CheckBox from '@react-native-community/checkbox';
// import CheckBox from 'react-native-check-box'

// // const instructions = Platform.select({
// //   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
// //   android:
// //     'Double tap R on your keyboard to reload,\n' +
// //     'Shake or press menu button for dev menu!',
// // });

// // type Props = {};
// export default class List extends Component {
//     constructor(props){
//         super(props);
//         this.state={
//           isChecked:true
//         }
//       }

//   render() {
//     return (
//       <View style={styles.container}>
//           <Text>
//               react
//           </Text>
//     <CheckBox
//     style={{flex: 1, padding: 10}}
//     onClick={()=>{
//       this.setState({
//           isChecked:!this.state.isChecked
//       })
//     }}
//     isChecked={this.state.isChecked}
//     // leftText={"CheckBox"}
// />

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },

// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { Component } from 'react';
// import {
//   Text, View, StyleSheet, Alert, FlatList
// } from 'react-native';
// import Dimensions from 'Dimensions';
// import { CheckBox } from 'react-native-elements'

// const DeviceWidth = Dimensions.get('window').width;
// const DeviceHeight = Dimensions.get('window').height;

// export default class List extends React.Component {

//   constructor(props){
//     super(props); 
//     this.state = {
//       checked:[],
//       data : [
//       {
//         "name": "ALL",
//       },
//       {
//         "name": "Android",
//       },
//       {
//         "name": "iOS",
//       },
//       {
//         "name": "React Native",
//       }
//     ]}
//   }

//   render() {
//     return (
//       <FlatList
//         data={ this.state.data }
//         renderItem={({item, index}) =>
//         <CheckBox
//           center
//           title={item.name}
//           onPress={() => {this.setState({checked: !this.state.checked}), console.log(this.state.checked +' '+ index)}}
//           checked={this.state.checked}/>
//         }
//       />
//     );
//   }
// }

//////////////////////////////////////////////////////////////////////////
// import React, { Component } from 'react';
// import { Text, View, StyleSheet,FlatList } from 'react-native';
// import { ListItem, CheckBox } from 'react-native-elements';
// const list = [
//     {
//       name: 'Manpreet',
//       id:0
//     },
//     {
//       name: 'Gitansh',
//       id:1
//     },
//     {
//         name: 'Rahul',
//         id:2
//       },
//       {
//         name: 'Davinder',
//         id:3
//       },
//       {
//         name: 'Pooja',
//         id:4
//       },
//       {
//         name: 'Ashu',
//         id:5
//       },
//       {
//         name: 'Sandeep',
//         id:6
//       },
//       {
//         name: 'Robin',
//         id:7
//       },
//       {
//         name: 'Manpreet',
//         id:8
//       },
//       {
//         name: 'Gitansh',
//         id:9
//       },
//       {
//         name: 'Bass hor nai',
//         id:10
//       },
//   ]
//   export default class List extends Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         checked:[]
//       }
//     }
  
//     handleCheckBox = () => this.setState({ checked: !this.state.checked })
  
//     renderItem = ({ item }) => (
//       <ListItem
//         title={<View><Text>{item.name}</Text></View>}
//         // leftAvatar={
//         // }
//         rightAvatar={
//         //   <CheckBox
//         //     checked={this.state.checked}
//         //     onPress={() => this.setState({checked: !this.state.checked})}
//         //   />
//         <CheckBox
//         checked={this.state.checked === item.id}
//         onPress={() => this.setState({checked: item.id})}
//       />
//         }
//       >
//       </ListItem>
  
//     )
  
//     render() {
//     return(
//       <View style={{flex:1}}>
//       <FlatList
//            keyExtractor={this.keyExtractor}
//            data={list}
//            renderItem={this.renderItem}
//            extraData={this.state}
//          />
//         </View>
//       )
//     };
//   }
  ///////////////////////////////////////////////////////////////////////////////////////

  import React from 'react';
  import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    ActivityIndicator,
    TouchableOpacity,
  } from 'react-native';
  import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from 'react-native-google-signin';
   
  export default class List extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userInfo: null,
        gettingLoginStatus: true,
      };
    }
   
    componentDidMount() {
      //initial configuration
      GoogleSignin.configure({
        //It is mandatory to call this method before attempting to call signIn()
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        // Repleace with your webClientId generated from Firebase console
        webClientId: '437574347608-on11rn1tr8qu24gc2i5av9vfossm6c6v.apps.googleusercontent.com',
      });
      //Check if user is already signed in
      this._isSignedIn();
    }
   
    _isSignedIn = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        alert('User is already signed in');
        //Get the User details as user is already signed in
        this._getCurrentUserInfo();
      } else {
        //alert("Please Login");
        console.log('Please Login');
      }
      this.setState({ gettingLoginStatus: false });
    };
   
    _getCurrentUserInfo = async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        console.log('User Info --> ', userInfo);
        this.setState({ userInfo: userInfo });
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          alert('User has not signed in yet');
          console.log('User has not signed in yet');
        } else {
          alert("Something went wrong. Unable to get user's info");
          console.log("Something went wrong. Unable to get user's info");
        }
      }
    };
   
    _signIn = async () => {
      //Prompts a modal to let the user sign in into your application.
      try {
        await GoogleSignin.hasPlayServices({
          //Check if device has Google Play Services installed.
          //Always resolves to true on iOS.
          showPlayServicesUpdateDialog: true,
        });
        const userInfo = await GoogleSignin.signIn();
        console.log('User Info --> ', userInfo);
        this.setState({ userInfo: userInfo });
      } catch (error) {
        console.log('Message', error.message);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User Cancelled the Login Flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('Signing In');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Play Services Not Available or Outdated');
        } else {
          console.log('Some Other Error Happened');
        }
      }
    };
   
    _signOut = async () => {
      //Remove user session from the device.
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        this.setState({ userInfo: null }); // Remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
    };
   
    render() {
      //returning Loader untill we check for the already signed in user
      if (this.state.gettingLoginStatus) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      } else {
        if (this.state.userInfo != null) {
          //Showing the User detail
          return (
            <View style={styles.container}>
              <Image
                source={{ uri: this.state.userInfo.user.photo }}
                style={styles.imageStyle}
              />
              <Text style={styles.text}>
                Name: {this.state.userInfo.user.name}{' '}
              </Text>
              <Text style={styles.text}>
                Email: {this.state.userInfo.user.email}
              </Text>
              <TouchableOpacity style={styles.button} onPress={this._signOut}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          );
        } else {
          //For login showing the Signin button
          return (
            <View style={styles.container}>
              <GoogleSigninButton
                style={{ width: 312, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this._signIn}
              />
            </View>
          );
        }
      }
    }
  }
   
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageStyle: {
      width: 200,
      height: 300,
      resizeMode: 'contain',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      width: 300,
      marginTop: 30,
    },
  });

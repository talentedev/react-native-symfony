// import React from 'react'
// import {Avatar} from 'react-native-elements'
// import {Alert, Button, ScrollView, Text} from 'react-native'
// import Spinner from 'react-native-loading-spinner-overlay'
// import {WhiteSpace} from '@ant-design/react-native'
//
// import BookmarkIcon from 'App/Components/BookmarkIcon'
// import CustomHeader from 'App/Components/CustomHeader'
//
// import NavigationService from 'App/Services/NavigationService'
// import {UserService} from 'App/Services/GraphQL/UserService'
//
// import Style from './HomeScreenStyle'
// import {Images} from 'App/Theme'
//
// export default class HomeScreen extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       spinner: false,
//     }
//   }
//
//   render() {
//     const mockPromotion = {
//       id: 0,
//     }
//     return (
//       <React.Fragment>
//         <Spinner visible={this.state.spinner} />
//         <CustomHeader title="Home (tmp)" rightComponent="bell" />
//         <ScrollView
//           showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={Style.scrollView}>
//           <Avatar rounded size="xlarge" source={Images.logo} />
//           <WhiteSpace />
//
//           <WhiteSpace size="xl" />
//           <Text style={Style.text}>SMS Sign In</Text>
//           <Button
//             onPress={() => NavigationService.push('SignInScreen')}
//             title="SMS sign in"
//             textStyle={Style.title}
//           />
//           <WhiteSpace size="xl" />
//           <Text style={Style.text}>Test users</Text>
//           <Button
//             onPress={() => {
//               this.setState({spinner: true}, () => {
//                 UserService.testCustomerSignIn()
//                   .then(() =>
//                     UserService.getCustomerUser().then(() => {
//                       this.setState({spinner: false}, () => {
//                         NavigationService.navigateAndReset('CustomerMainScreen')
//                       })
//                     }),
//                   )
//                   .catch(() => {
//                     this.setState({spinner: false}, () => {
//                       setTimeout(() => {
//                         Alert.alert('Error', 'Cannot connect to backend')
//                       }, 100)
//                     })
//                   })
//               })
//             }}
//             title="Sign In As Test Customer"
//           />
//           <WhiteSpace />
//           <Button
//             onPress={() => {
//               this.setState({spinner: true}, () => {
//                 UserService.testBusinessSignIn()
//                   .then(() =>
//                     UserService.getBusinessUser().then(() => {
//                       this.setState({spinner: false}, () => {
//                         NavigationService.navigateAndReset('BusinessMainScreen')
//                       })
//                     }),
//                   )
//                   .catch(() => {
//                     this.setState({spinner: false}, () => {
//                       setTimeout(() => {
//                         Alert.alert('Error', 'Cannot connect to backend')
//                       }, 100)
//                     })
//                   })
//               })
//             }}
//             title="Sign In As Test Business"
//           />
//           <WhiteSpace size="xl" />
//           <Text style={Style.text}>Mock Bookmark</Text>
//           <BookmarkIcon promotion={mockPromotion} />
//           <WhiteSpace size="xl" />
//         </ScrollView>
//       </React.Fragment>
//     )
//   }
// }

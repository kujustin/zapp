import React, { PropTypes } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Colors, Images, Metrics } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'
// Enable when you have configured Xcode
// import PushNotification from 'react-native-push-notification'
import I18n from 'react-native-i18n'

// Styles
import styles from './Styles/UsageExamplesScreenStyle'

class UsageExamplesScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (nextProps) {
    // Request push premissions only if the user has logged in.
    const { loggedIn } = nextProps
    if (loggedIn) {
      /*
      * If you have turned on Push in Xcode, http://i.imgur.com/qFDRhQr.png
      * uncomment this code below and import at top
      */
      // if (__DEV__) console.log('Requesting push notification permissions.')
      // PushNotification.requestPermissions()
    }
  }

  // fires when we tap the rocket!
  handlePressRocket = () => {
    this.props.requestTemperature('Boise')
  }

  // fires when tap send
  handlePressSend = () => {
    this.props.requestTemperature('Toronto')
  }

  // fires when tap star
  handlePressStar = () => {
    this.props.requestTemperature('New Orleans')
  }

  renderLoginButton () {
    return (
      <RoundedButton onPress={this.props.login}>
        {I18n.t('signIn')}
      </RoundedButton>
    )
  }

  renderLogoutButton () {
    return (
      <RoundedButton onPress={this.props.logout}>
        {I18n.t('logOut')}
      </RoundedButton>
    )
  }

  renderHeader (title) {
    return (
      <View style={styles.componentLabelContainer}>
        <Text style={styles.componentLabel}>{title}</Text>
      </View>
    )
  }

  renderUsageExamples () {
    const { loggedIn, temperature, city } = this.props
    return (
      <View>
        {this.renderHeader(I18n.t('igniteGenerated'))}
        <View>
          <RoundedButton text='Listview' onPress={this.props.listviewExample} />
        </View>
        <View>
          <RoundedButton text='Listview Grid' onPress={this.props.listviewGridExample} />
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionText} >
							Zapp Community Portal
            </Text>
          </View>
          {this.renderUsageExamples()}
        </ScrollView>
      </View>
    )
  }
}

UsageExamplesScreen.propTypes = {
  loggedIn: PropTypes.bool,
  dispatch: PropTypes.func,
  temperature: PropTypes.number,
  city: PropTypes.string,
  login: PropTypes.func,
  logout: PropTypes.func,
  requestTemperature: PropTypes.func,
  listviewExample: PropTypes.func,
  listviewGridExample: PropTypes.func,
  mapviewExample: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.username !== null,
    temperature: state.weather.temperature,
    city: state.weather.city
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: NavigationActions.login,
    logout: () => dispatch(Actions.logout()),
    requestTemperature: (city) => dispatch(Actions.requestTemperature(city)),
    listviewExample: NavigationActions.listviewExample,
    listviewGridExample: NavigationActions.listviewGridExample,
    mapviewExample: NavigationActions.mapviewExample
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsageExamplesScreen)

// @flow

import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import s from '../../../common/locales/strings.js'

export type Props = {
  style: Object,
  pin: string,
  username: string,
  wait: boolean,
  onChangeText(Object): void
}

type State = {
  random: boolean
}

const buttons = {
  zero: { num: '0', text: s.strings.keypad_zero },
  one: { num: '1', text: s.strings.keypad_one },
  two: { num: '2', text: s.strings.keypad_two },
  three: { num: '3', text: s.strings.keypad_three },
  four: { num: '4', text: s.strings.keypad_four },
  five: { num: '5', text: s.strings.keypad_five },
  six: { num: '6', text: s.strings.keypad_six },
  seven: { num: '7', text: s.strings.keypad_seven },
  eight: { num: '8', text: s.strings.keypad_eight },
  nine: { num: '9', text: s.strings.keypad_nine }
}

let randButtons = []

function randomizeNumPad(array) {
  const keys = Object.keys(array)
  const randKeys = []
  while (keys.length > 0) {
    const i = Math.floor(Math.random() * keys.length)
    const newObj = buttons[keys[i]]
    randKeys.push(newObj)
    keys.splice(i, 1)
  }
  return randKeys
}

class PinKeypad extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      random: false
    }
  }

  changePin = (value: string) => {
    const { username, pin, onChangeText } = this.props
    if (value === 'back') {
      return onChangeText({
        username: username,
        pin: pin && pin !== '' ? pin.substr(0, pin.length - 1) : ''
      })
    }
    onChangeText({ username: username, pin: pin ? pin.concat(value) : value })
  }

  componentDidMount() {
    randButtons = randomizeNumPad(buttons)
    this.setState({ random: true })
  }

  render() {
    const { wait, style } = this.props
    return (
      <View style={style.keypadContainer}>
        <View style={style.keypadInner}>
          <View style={style.keypadRow}>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() =>
                this.changePin(
                  this.state.random ? randButtons[0].num : buttons.one.num
                )
              }
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>
                  {this.state.random ? randButtons[0].text : buttons.one.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() =>
                this.changePin(
                  this.state.random ? randButtons[1].num : buttons.two.num
                )
              }
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>
                  {this.state.random ? randButtons[1].text : buttons.two.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() =>
                this.changePin(
                  this.state.random ? randButtons[2].num : buttons.three.num
                )
              }
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>
                  {this.state.random ? randButtons[2].text : buttons.three.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={style.keypadRow}>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() =>
                this.changePin(
                  this.state.random ? randButtons[3].num : buttons.four.num
                )
              }
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>
                  {this.state.random ? randButtons[3].text : buttons.four.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() =>
                this.changePin(
                  this.state.random ? randButtons[4].text : buttons.five.num
                )
              }
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>
                  {this.state.random ? randButtons[4].text : buttons.five.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() =>
                this.changePin(
                  this.state.random ? randButtons[5].num : buttons.six.num
                )
              }
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>
                  {this.state.random ? randButtons[5].text : buttons.six.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={style.keypadRow}>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() =>
                this.changePin(
                  this.state.random ? randButtons[6].num : buttons.seven.num
                )
              }
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>
                  {this.state.random ? randButtons[6].text : buttons.seven.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() =>
                this.changePin(
                  this.state.random ? randButtons[7].num : buttons.eight.num
                )
              }
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>
                  {this.state.random ? randButtons[7].text : buttons.eight.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() =>
                this.changePin(
                  this.state.random ? randButtons[8].num : buttons.nine.num
                )
              }
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>
                  {this.state.random ? randButtons[8].text : buttons.nine.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={style.keypadRow}>
            <View style={style.keypadColumnBlank} />
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() =>
                this.changePin(
                  this.state.random ? randButtons[9].num : buttons.zero.num
                )
              }
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>
                  {this.state.random ? randButtons[9].text : buttons.zero.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.changePin('back')}
              disabled={wait}
            >
              <View style={style.keypadColumnBack}>
                <MaterialIcon name="backspace" style={style.keypadKeysBack} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    )
  }
}

export { PinKeypad }

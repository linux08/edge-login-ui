// @flow

import React from 'react'
import { ActivityIndicator, View } from 'react-native'

type Props = {
  style: Object,
  size?: number | 'small' | 'large'
}
const Spinner = (props: Props) => {
  return (
    <View style={props.style}>
      <ActivityIndicator size={props.size || 'large'} />
    </View>
  )
}

export { Spinner }

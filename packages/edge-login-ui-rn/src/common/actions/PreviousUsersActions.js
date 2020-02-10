// @flow

import { makeReactNativeDisklet } from 'disklet'

import { isTouchEnabled } from '../../native/keychain'
import type { Dispatch, GetState, Imports } from '../../types/ReduxTypes'
import * as Constants from '../constants'

export type LoginUserInfo = {
  username: string,
  pinEnabled: boolean,
  touchEnabled: boolean
}

/**
 * The payload included in the 'SET_PREVIOUS_USERS' redux action.
 */
export type PreviousUsersState = {
  userList: LoginUserInfo[],
  lastUser?: LoginUserInfo,

  usernameOnlyList: string[],
  filteredUsernameList: string[]
}

/**
 * Load the user list from core & disk into redux.
 */
export const getPreviousUsers = () => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  const { context, folder, username } = imports
  const disklet = makeReactNativeDisklet()

  // Load the last users array:
  const lastUsernames: string[] = await disklet
    .getText('lastusers.json')
    .then(text => JSON.parse(text))
    .then(json => (Array.isArray(json) ? json.slice(0, 3) : []))
    .catch(() => [])

  // Load the last user, using `imports.username` as a fallback:
  let lastUsername = username
  if (lastUsername === '' || lastUsername == null) {
    if (lastUsernames.length > 0) {
      lastUsername = lastUsernames[0]
    } else {
      lastUsername = await disklet
        .getText('lastuser.json')
        .then(text => JSON.parse(text))
        .then(json =>
          typeof json.username === 'string' ? json.username : username
        )
        .catch(() => username)
    }
  }

  // Figure out which users have biometric logins:
  const coreUsers: LoginUserInfo[] = await Promise.all(
    context.localUsers.map(async userInfo => {
      return {
        username: userInfo.username,
        pinEnabled: userInfo.pinLoginEnabled,
        touchEnabled: await isTouchEnabled(folder, userInfo.username)
      }
    })
  )

  // Move recent users to their own list:
  const recentUsers: LoginUserInfo[] = []
  for (const username of lastUsernames) {
    for (let i = 0; i < coreUsers.length; ++i) {
      if (coreUsers[i].username === username) {
        recentUsers.push(coreUsers[i])
        coreUsers.splice(i, 1)
        break
      }
    }
  }

  // Assemble the master user list:
  const userList: LoginUserInfo[] = [...recentUsers, ...sortUsers(coreUsers)]

  // Dispatch to redux:
  const data: PreviousUsersState = {
    userList,
    lastUser: userList.find(user => user.username === lastUsername),

    usernameOnlyList: userList.map(userInfo => userInfo.username),
    filteredUsernameList: userList.map(userInfo => userInfo.username)
  }
  dispatch({ type: Constants.SET_PREVIOUS_USERS, data })
}

function sortUsers(users: LoginUserInfo[]): LoginUserInfo[] {
  return users.sort((a: LoginUserInfo, b: LoginUserInfo) => {
    const stringA = a.username.toUpperCase()
    const stringB = b.username.toUpperCase()
    if (stringA < stringB) {
      return -1
    }
    if (stringA > stringB) {
      return 1
    }
    return 0
  })
}

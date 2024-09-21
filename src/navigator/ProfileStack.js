import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Profile from '../components/Profile'

const ProfileStack = ({checkAuthentication}) => {
  return (
    <Profile checkAuthentication={checkAuthentication} />
  )
}

export default ProfileStack

const styles = StyleSheet.create({})
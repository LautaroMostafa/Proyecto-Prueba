import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const ImputForm = () => {

    

    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
        />
    )
}

export default ImputForm

const styles = StyleSheet.create({})
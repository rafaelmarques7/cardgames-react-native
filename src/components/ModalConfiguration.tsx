import React, { Component } from 'react';
import { Text, Picker, StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { screen } from '../config';
import Icon from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons';

type cProps = {
  actionSetNumberOfCards: Function,
} 

export default class ModalConfiguration extends Component<cProps> {
  state = {
    isModalVisible: false,
    numCards: 2
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  dispatchConfigAction = () => {
    this.props.actionSetNumberOfCards(this.state.numCards);
    this.toggleModal();
  }

  renderModal = () => (
    <Modal 
      isVisible={this.state.isModalVisible}
      onBackdropPress={this.toggleModal}> 
      <View style={styles.modal}>
        <View style={styles.valuePickerContainer}>
          <Picker
            selectedValue={this.state.numCards}
            style={styles.valuePicker}
            onValueChange={(itemValue) => this.setState({numCards: itemValue})}>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
          </Picker>
          <Text>Number of cards per hand</Text>
        </View>
        <View style={styles.modalActions}>
          <TouchableOpacity
            onPress={this.toggleModal}>
            <Icon name='closecircleo' size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.dispatchConfigAction}>
            <Icon name='checkcircleo' size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  renderModalButton = () => (
    <TouchableOpacity
      onPress={this.toggleModal}>
      <EvilIcons name='gear' size={40} />
    </TouchableOpacity>    
  )

  render() {
    return (
      <View style={styles.container}>
        {this.renderModalButton()}
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingTop: (screen.heightScreen - screen.heightWindow) / 2,
    paddingLeft: 3,
  },
  modal: {
    flex: 1/4,
    backgroundColor: 'white',
  },
  valuePickerContainer: { 
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valuePicker: { 
    flex: 1/2,
  },
  modalActions: {
    flex: 3/2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#efc050', // cream colour. @TODO Refactor colors in the future
  }
})

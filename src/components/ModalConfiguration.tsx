import React, { Component } from 'react';
import { Button, Text, View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import { ImageList } from "../logic/images";
import { Picker } from "react-native";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'
import { screen } from '../config';

export default class ModalConfiguration extends Component {
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

  render() {
    const imageSource = ImageList['gearConfig'];
    const sizeImage = 40;
    const styleImage = {height: sizeImage, width: sizeImage};
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.toggleModal}>
          <Image
            style={styleImage}
            source={imageSource} />
        </TouchableOpacity>        
        { this.renderModal() }
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
    backgroundColor: '#efc050',
  }
})

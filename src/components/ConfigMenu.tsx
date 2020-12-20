import React, { Component } from 'react';
import { Text, Picker, StyleSheet, View, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { colorsApp } from '../styles';

type cProps = {
  numCardsPerHand: number,
  shouldDisplayOdds: boolean,
  actionSetNumberOfCards: Function,
  actionSetShouldDisplayOdds: Function
} 

export default class ConfigMenu extends Component<cProps> {
  state = {
    isModalVisible: false,
    numCardsPerHand: this.props.numCardsPerHand,
    shouldDisplayOdds: this.props.shouldDisplayOdds,
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  toggleOddsCheckbox = () => {
    this.setState({ shouldDisplayOdds: !this.state.shouldDisplayOdds });
  };

  dispatchConfigAction = () => {
    if (this.props.numCardsPerHand !== this.state.numCardsPerHand) {
      this.props.actionSetNumberOfCards(this.state.numCardsPerHand);
    }
    if (this.props.shouldDisplayOdds !== this.state.shouldDisplayOdds) {
      this.props.actionSetShouldDisplayOdds(this.state.shouldDisplayOdds);
    }
    this.toggleModal();
  }

  renderModal = () => (
    <Modal 
      isVisible={this.state.isModalVisible}
      onBackdropPress={this.toggleModal}> 
      <View style={styles.modal}>
        <View style={styles.valuePickerContainer}>
          <Picker
            selectedValue={this.state.numCardsPerHand}
            style={styles.valuePicker}
            onValueChange={(itemValue) => this.setState({numCardsPerHand: itemValue})}>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
          </Picker>
          <Text>Number of cards per hand</Text>
        </View>
        
        <View>
          <CheckBox
            center
            title='Display odds'
            checked={this.state.shouldDisplayOdds}
            onPress={this.toggleOddsCheckbox}
          />
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
      <EvilIcons 
        name='gear' 
        size={35} 
        color='grey' 
      />
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
  container: {},
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
    backgroundColor: colorsApp.cream,
  }
})

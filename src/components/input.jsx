import {StyleSheet, TextInput} from 'react-native';

function Input({secureTextEntry, placeholder, onChangeText, onBlur, value}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 30,
    textAlign: 'center',
  },
});
export default Input;

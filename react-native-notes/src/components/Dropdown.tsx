import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown as EDropdown} from 'react-native-element-dropdown';

type DropdownProps = {
  data: {label: string; value: any}[];
  title: string;
  placeholder?: string;
  isSearchable?: boolean;
  onChanged?: (value: any) => any;
};

const Dropdown = ({
  data,
  title,
  isSearchable,
  placeholder,
  onChanged,
}: DropdownProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const _renderLabel = (): React.JSX.Element | null => {
    if (!title) {
      return null;
    }
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>{title}</Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {_renderLabel()}
      <EDropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={isSearchable}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onChanged?.(item.value);
        }}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

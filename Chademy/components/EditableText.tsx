import React, { useState } from 'react';
import { Text, TextInput, StyleProp, TextStyle, Platform } from 'react-native';

interface Props {
  value: string;
  onChange?: (val: string) => void;
  style?: StyleProp<TextStyle>;
  multiline?: boolean;
}

export default function EditableText({ value, onChange, style, multiline = false }: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  if (editing) {
    return (
      <TextInput
        value={text}
        onChangeText={setText}
        onBlur={() => {
          setEditing(false);
          onChange?.(text);
        }}
        autoFocus
        multiline={multiline}
        style={[
          style,
          {
            borderBottomWidth: 1,
            borderBottomColor: '#22c7a5',
            outlineStyle: 'none',
          } as any,
        ]}
      />
    );
  }

  return (
    <Text
      style={style}
      onPress={Platform.OS === 'web' ? undefined : () => setEditing(true)}
      // @ts-ignore — web only
      onClick={Platform.OS === 'web' ? () => setEditing(true) : undefined}
      suppressHighlighting
    >
      {text}
    </Text>
  );
}

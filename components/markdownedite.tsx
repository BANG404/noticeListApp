import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Markdown from "react-native-markdown-display";

interface MarkdownEditorProps {
  markdownText: string;
  setMarkdownText: (text: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export default function MarkdownEditor({
  markdownText,
  setMarkdownText,
  isEditing,
  setIsEditing
}: MarkdownEditorProps) {
  const animatedHeight = useRef(new Animated.Value(isEditing ? 300 : 200)).current;
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    Animated.spring(animatedHeight, {
      toValue: !isEditing ? 300 : 200,
      useNativeDriver: false,
    }).start();
    if (!isEditing) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (Platform.OS !== 'web') {
          setIsEditing(false);
        }
      }
    );

    if (Platform.OS === 'web') {
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          setIsEditing(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        keyboardDidHideListener.remove();
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleInputPress = (event) => {
    event.stopPropagation();
  };

  const ContentWrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

  return (
    <View style={styles.container} ref={containerRef}>
      <ContentWrapper 
        style={styles.contentWrapper} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView style={styles.contentContainer} contentContainerStyle={styles.scrollContent}>
          <Animated.View
            style={[styles.editorContainer, { height: animatedHeight }]}
          >
            {isEditing ? (
              <TouchableOpacity activeOpacity={1} onPress={handleInputPress} style={styles.editorTouchable}>
                <TextInput
                  ref={inputRef}
                  multiline
                  style={[styles.editor, { outline: 'none', textAlign: 'left' }]}
                  value={markdownText}
                  onChangeText={setMarkdownText}
                  placeholder="Type your Markdown here..."
                  selection={selection}
                  onSelectionChange={(event) => setSelection(event.nativeEvent.selection)}
                  onFocus={() => setSelection({ start: markdownText.length, end: markdownText.length })}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={toggleEditMode}
                style={styles.previewContainer}
              >
                <Markdown style={markdownStyles}>{markdownText}</Markdown>
              </TouchableOpacity>
            )}
          </Animated.View>
        </ScrollView>
      </ContentWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentWrapper: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  editorContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  editorTouchable: {
    flex: 1,
  },
  editor: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    outlineStyle: 'none',
  },
  previewContainer: {
    flex: 1,
    padding: 15,
  },
});

const markdownStyles = {
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  heading1: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  heading2: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  paragraph: {
    marginBottom: 16,
  },
  list: {
    marginBottom: 16,
  },
};
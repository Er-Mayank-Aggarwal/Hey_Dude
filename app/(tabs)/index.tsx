import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Linking, Keyboard } from 'react-native';

const App = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const driveLinks = [
    //Civil Semester
    { name: 'Chemistry Theory Notes ', url: 'https://drive.google.com/drive/folders/1CmZfe94zWrFEivKlioVZYWjgL2Vg8rEe?usp=drive_link' },
    { name: 'Chemistry Notes ', url: 'https://drive.google.com/drive/folders/1CmZfe94zWrFEivKlioVZYWjgL2Vg8rEe?usp=drive_link' },
    { name: 'Chemistry Lab ', url: 'https://drive.google.com/drive/folders/1ZI60hBL6DHEJKtOhRWLqWie89uBzxSbG?usp=drive_link' },

    { name: 'Mechanics Notes ', url: 'https://drive.google.com/drive/folders/1coZWXP0h1lYrhB4AcCkQdyomBaR3F8ls?usp=drive_link' },
    { name: 'Mechanics Theory Notes ', url: 'https://drive.google.com/drive/folders/1coZWXP0h1lYrhB4AcCkQdyomBaR3F8ls?usp=drive_link' },
    { name: 'Mechanics Lab ', url: 'https://drive.google.com/drive/folders/152YHlXsZmzqHUT2SNn9lKuqXuLUG8KHY?usp=drive_link' },

    { name: 'Civil Theory Notes ', url: 'https://drive.google.com/drive/folders/1EM-rvKg7DeFpe1rJDSeBN0KtS4maVgLq?usp=drive_link' },
    { name: 'Civil Notes ', url: 'https://drive.google.com/drive/folders/1EM-rvKg7DeFpe1rJDSeBN0KtS4maVgLq?usp=drive_link' },
    { name: 'Civil Lab ', url: 'https://drive.google.com/drive/folders/1bHYC6WI5l1an2IfuhXDO4RyNEeTPJ3em?usp=drive_link' },

    { name: 'Electrical Notes ', url: 'https://drive.google.com/drive/folders/1bhwGUc900lB23cKVKsxy3TqLeuBjBy3R?usp=drive_link' },
    { name: 'Electrical Theory Notes ', url: 'https://drive.google.com/drive/folders/1bhwGUc900lB23cKVKsxy3TqLeuBjBy3R?usp=drive_link' },
    { name: 'Electrical Lab ', url: 'https://drive.google.com/drive/folders/1qH2JPf-s7QwS_G4iH0ZV-qsyZkYir5ws?usp=drive_link' },

    //Mechanical Semester
    { name: 'Computer Theory Notes ', url: 'https://drive.google.com/drive/folders/1yGdReZyv8h6D0yotkzp4UMatvn0TMR3Y?usp=drive_link' },
    { name: 'Computer Notes ', url: 'https://drive.google.com/drive/folders/1yGdReZyv8h6D0yotkzp4UMatvn0TMR3Y?usp=drive_link' },
    { name: 'Computer Lab ', url: 'https://drive.google.com/drive/folders/1RSeB07kaxpxBo6-yeQAxBeTgiVgo_O6r?usp=drive_link' },

    { name: 'Electronics Notes ', url: 'https://drive.google.com/drive/folders/1HlPTXPse1cHEArMQ7DvxFw5eZxr7K-V2?usp=drive_link' },
    { name: 'Electronics Theory Notes ', url: 'https://drive.google.com/drive/folders/1HlPTXPse1cHEArMQ7DvxFw5eZxr7K-V2?usp=drive_link' },
    { name: 'Electronics Lab ', url: 'https://drive.google.com/drive/folders/15NUabeYMkWCBhG7HjtiPTn86fmVDO2Px?usp=drive_link' },

    { name: 'Mechanical Theory Notes ' , url: 'https://drive.google.com/drive/folders/1YO7VbNwb1n_RFWKecxWLhOVGEksW-PfO?usp=drive_link' },
    { name: 'Mechanical Notes ', url: 'https://drive.google.com/drive/folders/1YO7VbNwb1n_RFWKecxWLhOVGEksW-PfO?usp=drive_link' },
    { name: 'Mechanical Lab ', url: 'https://drive.google.com/drive/folders/1ttmD46DBh0T9ypg_Knq4od3zjkDPjymo?usp=drive_link' },

    { name: 'Physics Notes ', url: 'https://drive.google.com/drive/folders/1jUuwWu9hHoMgMVr0uL0458NnE62YnFgD?usp=drive_link' },
    { name: 'Physics Theory Notes ', url: 'https://drive.google.com/drive/folders/1jUuwWu9hHoMgMVr0uL0458NnE62YnFgD?usp=drive_link' },
    { name: 'Physics Lab ', url: 'https://drive.google.com/drive/folders/1GrPvSeubMw_a32ewMGO5_VJueLix0MjP?usp=drive_link' },

    //Maths 
    { name: 'M1 ', url: 'https://drive.google.com/drive/folders/1xk8yaREfAgThYl3TGHTQ0ijuVUzCCw2m?usp=drive_link' },
    { name: 'Maths 1 ', url: 'https://drive.google.com/drive/folders/1xk8yaREfAgThYl3TGHTQ0ijuVUzCCw2m?usp=drive_link' },
    { name: 'M2 ', url: 'https://drive.google.com/drive/folders/1T3RP1XUyZpFJwrBu3fuxeXUacdJ2ZQeu?usp=sharing' },
    { name: 'Maths 2 ', url: 'https://drive.google.com/drive/folders/1T3RP1XUyZpFJwrBu3fuxeXUacdJ2ZQeu?usp=sharing' },

    //Machine Drawing
    { name: 'Machine Drawing ', url: 'https://drive.google.com/drive/folders/1NAQD3zpJfakEmsVnotFxR_WdSMdweRY3?usp=sharing' },

    //Engineering Graphics
    { name: 'Graphics ', url: 'https://drive.google.com/drive/folders/1HRIxEJ8fhZs5E8thztgER0GToMefK-2F?usp=sharing' },

    //Workshop
    { name: 'Welding ', url: 'https://drive.google.com/drive/folders/1jUuwWu9hHoMgMVr0uL0458NnE62YnFgD?usp=drive_link' },
    { name: 'Foundary ', url: 'https://drive.google.com/drive/folders/1jUuwWu9hHoMgMVr0uL0458NnE62YnFgD?usp=drive_link' },
    { name: 'Forging ', url: 'https://drive.google.com/drive/folders/1jUuwWu9hHoMgMVr0uL0458NnE62YnFgD?usp=drive_link' },
    { name: 'Carpentry ', url: 'https://drive.google.com/drive/folders/1jUuwWu9hHoMgMVr0uL0458NnE62YnFgD?usp=drive_link' },
    { name: 'Fitting ', url: 'https://drive.google.com/drive/folders/1jUuwWu9hHoMgMVr0uL0458NnE62YnFgD?usp=drive_link' },

    //English Humanities
    { name: 'English ', url: 'https://drive.google.com/drive/folders/1NAQD3zpJfakEmsVnotFxR_WdSMdweRY3?usp=drive_link' },
    { name: 'Humanities ', url: 'https://drive.google.com/drive/folders/1wXwtYW8cadjrKerMInENZ3MFLiLnomnc?usp=drive_link' },

  ];

  const backgrounds = [
    require('./img2.png'),
    // Add more backgrounds here
  ];

  const extractKeywords = (input) => {
    // Remove extra white spaces
    const cleanedInput = input.toLowerCase();
  
    // Keywords to check for specific subjects
    const keywords = ['notes', 'chemistry', 'mechanics', 'civil', 'electrical', 'computer', 'physics', 'maths', 'machine drawing'];
  
    // Split the input sentence into words
    const inputWords = cleanedInput.split(' ');
  
    // Check if any words from the input match the keywords
    const foundKeywords = keywords.filter(keyword =>
      inputWords.some(word => keyword.includes(word) || word.includes(keyword))
    );
  
    return foundKeywords.length > 0 ? foundKeywords.join(' ') : cleanedInput;
  };
  

  const handleSendAndSearch = () => {
    if (text.trim() !== '') {
      const nextIndex = (backgroundIndex + 1) % backgrounds.length;
      setBackgroundIndex(nextIndex);

      const userMessage = { type: 'user', text: text.trim() };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      const keywords = extractKeywords(text);

      const filteredLinks = driveLinks.filter(link =>
        link.name.toLowerCase().includes(keywords)
      );

      if (filteredLinks.length > 0) {
        filteredLinks.forEach(link => {
          const botMessage = { type: 'bot', text: link.name, url: link.url };
          setMessages(prevMessages => [...prevMessages, botMessage]);
        });
      } else {
        const noResultsMessage = { type: 'bot', text: 'No results found' };
        setMessages(prevMessages => [...prevMessages, noResultsMessage]);
      }

      setText('');
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleLinkPress = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handleClear = () => {
    setMessages([]);
    setText('');
    setBackgroundIndex(0);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => scrollViewRef.current.scrollToEnd({ animated: true })
    );
    return () => keyboardDidShowListener.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgrounds[backgroundIndex]}
        style={styles.background}
      />

      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>

      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.messageContainer}
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, index) => (
            <View key={index} style={styles.messageBlock}>
              {msg.type === 'user' ? (
                <Text style={styles.messageText}>{msg.text}</Text>
              ) : (
                msg.url ? (
                  <TouchableOpacity onPress={() => handleLinkPress(msg.url)}>
                    <Text style={{ padding: 5, color: 'blue' }}>{msg.text}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.botMessageText}>{msg.text}</Text>
                )
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          onChangeText={newText => setText(newText)}
          value={text}
          placeholderTextColor={"black"}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendAndSearch}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingBottom: 70, 
  },
  messageBlock: {
    padding: 10,
    elevation: 1,
    width: '100%',
  },
  messageText: {
    fontSize: 23,
    color: '#000',
    textAlign: 'right',
  },
  botMessageText: {
    fontSize: 23,
    color: 'red',
    textAlign: 'left',
    left: 3,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(251,247,231,1)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    paddingBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
    backgroundColor: 'rgba(255,189,89,1)',
    color: 'black',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '22%',
    marginLeft: '3%',
    top: 7,
    borderColor: 'black',
    borderWidth: 1,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;

import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function AudioRecorder({ addNewNote }) {
  const [recording, setRecording] = useState(null);
  const [recordName, setRecordName] = useState("");

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;

      const recording = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = async () => {
    setRecording(null);
    await recording.stopAndUnloadAsync();

    const uri = recording.getURI();
    const id = new Date().getTime();
    const newNote = { id, uri, name: recordName || `Audio ${id}` };
    addNewNote(newNote);
    setRecordName("");
  };

  return (
    <View style={styles.recorder}>
      <TextInput
        placeholder="Enter Note Name"
        value={recordName}
        onChangeText={setRecordName}
        style={styles.input}
      />
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  recorder: {
    padding: 10,
    borderBottomWidth: 1,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
});

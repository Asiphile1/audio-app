import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, FlatList } from "react-native";
import AudioRecorder from "./components/AudioRecorder";
import AudioList from "./components/AudioList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [audioNotes, setAudioNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadAudioNotes();
  }, []);

  const loadAudioNotes = async () => {
    const storedNotes = await AsyncStorage.getItem("audioNotes");
    if (storedNotes) {
      setAudioNotes(JSON.parse(storedNotes));
    }
  };

  const saveAudioNotes = async (notes) => {
    await AsyncStorage.setItem("audioNotes", JSON.stringify(notes));
    setAudioNotes(notes);
  };

  const handleDelete = async (id) => {
    const filteredNotes = audioNotes.filter((note) => note.id !== id);
    saveAudioNotes(filteredNotes);
  };

  const addNewNote = (note) => {
    const updatedNotes = [...audioNotes, note];
    saveAudioNotes(updatedNotes);
  };

  const filteredNotes = audioNotes.filter((note) =>
    note.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar setSearchTerm={setSearchTerm} />
      <AudioRecorder addNewNote={addNewNote} />
      <AudioList audioNotes={filteredNotes} onDelete={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
});

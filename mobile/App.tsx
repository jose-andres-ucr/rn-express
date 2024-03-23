import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

const getText = async () => {
  const debuggerHost = Constants.expoConfig?.hostUri;
  const ip = debuggerHost?.split(":")[0];

  const result = await fetch(`http://${ip}:5000`);
  const resultJson = await result.json();
  return resultJson.message;
};

export default function App() {
  const [apiText, setApiText] = React.useState("");

  React.useEffect(() => {
    const getExample = async () => {
      try {
        setApiText(await getText());
      } catch (error) {
        console.error("Error", error);
      }
    };

    void getExample();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app</Text>
      <Text>Texto desde API: {apiText}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

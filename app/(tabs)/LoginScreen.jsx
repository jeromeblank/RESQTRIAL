import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import React, { useState } from "react";
import { colors } from "../../assets/fonts/utils/colors";
import { fonts } from "../../assets/fonts/utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";

// Mock API function (replace with actual API)
const loginUser = async (email, password) => {
  // Simulate an API call
  if (email === "user@example.com" && password === "password123") {
    return { success: true, token: "mock-jwt-token" };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoBack = () => {
    navigation.goBack("HOMESCREEN");
  };

  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  const handleLogin = async () => {
    // Basic validation (you can enhance this)
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // Call the login API
    const response = await loginUser(email, password);

    if (response.success) {
      // Display success message and navigate to the home screen
      Alert.alert("Success", "Login successful!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("HOMESCREEN"), // Replace with actual screen
        },
      ]);
    } else {
      // Display error message
      Alert.alert("Error", response.message || "Login failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={"arrow-back-outline"} color={colors.white} size={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Welcome Back</Text>
        <Text style={styles.headingText}>My Giga</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.mintgreen} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.steelgray}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.mintgreen} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.steelgray}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} color={colors.mintgreen} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offwhite,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.steelgray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.navyblue,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.mintgreen,
    borderRadius: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginVertical: 15,
    backgroundColor: colors.white,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: colors.navyblue,
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.navyblue,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
    paddingVertical: 12,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.steelgray,
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.navyblue,
    fontFamily: fonts.Bold,
  },
});

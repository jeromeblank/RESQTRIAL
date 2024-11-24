import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../assets/fonts/utils/colors";
import { fonts } from "../../assets/fonts/utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Ensure axios is only imported once

const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [selectedValue, setSelectedValue] = useState('option1'); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email,
        password,
        phone,
        user_type: selectedValue,
      });
      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('Something went wrong!');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={"arrow-back-outline"} color={colors.white} size={25} />
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
      </View>

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
          <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
            <SimpleLineIcons name={"eye"} size={20} color={colors.mintgreen} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={"screen-smartphone"}
            size={30}
            color={colors.mintgreen}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone no"
            placeholderTextColor={colors.steelgray}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.radioButtonContainer}>
          <TouchableOpacity
            style={styles.radioButtonWrapper}
            onPress={() => setSelectedValue('Citizen')}
          >
            <View
              style={[styles.radioButtonCircle, selectedValue === 'Citizen' && styles.radioButtonSelected]}
            />
            <Text style={styles.radioButtonText}>Citizen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButtonWrapper}
            onPress={() => setSelectedValue('Responder')}
          >
            <View
              style={[styles.radioButtonCircle, selectedValue === 'Responder' && styles.radioButtonSelected]}
            />
            <Text style={styles.radioButtonText}>Responder</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButtonWrapper}
            onPress={() => setSelectedValue('Service Provider')}
          >
            <View
              style={[styles.radioButtonCircle, selectedValue === 'Service Provider' && styles.radioButtonSelected]}
            />
            <Text style={styles.radioButtonText}>Service Provider</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButtonWrapper} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

// Styles remain the same



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
  radioButtonContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonCircle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.mintgreen,
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: colors.mintgreen, 
  },
  radioButtonText: {
    fontSize: 16,
    color: colors.navyblue, 
    fontFamily: fonts.Medium,
  },
  signupButtonWrapper: {
    backgroundColor: colors.navyblue, 
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  signupText: {
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
  loginText: {
    color: colors.navyblue, 
    fontFamily: fonts.Bold,
  },
});

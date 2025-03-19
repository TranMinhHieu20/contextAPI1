import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./AuthContext";

// Màn hình Trang chủ
const HomeScreen = ({ navigation }) => {
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Chào mừng Trần Minh Hiếu! 🎉</Text>
            <Button
                title="Đăng xuất"
                onPress={() => {
                    logout();
                    navigation.replace("Login"); // Quay lại màn hình đăng nhập
                }}
            />
        </View>
    );
};

// Màn hình Đăng nhập
const LoginScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useAuth();

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

        if (phoneRegex.test(phone)) {
            setErrorMessage("");
            login(phone); // Lưu số điện thoại vào Context
            navigation.replace("Home"); // Chuyển đến HomeScreen
        } else {
            setErrorMessage("❌ Số điện thoại không hợp lệ! ❌");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.h1}> Đăng Nhập</Text>
            <StatusBar style="auto" />
            <View style={styles.hr} />
            <Text style={styles.h2}>Nhập số điện thoại</Text>
            <Text style={styles.h3}>
                Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại
                OneHousing Pro
            </Text>
            <TextInput
                placeholder="Nhập số điện thoại của bạn"
                style={styles.textinput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            {errorMessage ? (
                <Text style={{ color: "red" }}>{errorMessage}</Text>
            ) : null}
            <Button
                title="Kiểm tra"
                onPress={() => validatePhoneNumber(phoneNumber)}
            />
        </View>
    );
};

// Cấu hình Navigation
const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: "Đăng Nhập" }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Trang chủ" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// App chính, bao bọc bởi AuthProvider
const App = () => {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    h1: {
        fontSize: 31,
        fontWeight: "bold",
    },
    hr: {
        height: 1,
        width: "100%",
        backgroundColor: "#000",
    },
    h2: {
        marginTop: 20,
        fontSize: 25,
    },
    h3: {
        marginTop: 10,
        fontSize: 17,
        textAlign: "center",
    },
    textinput: {
        marginTop: 20,
        marginBottom: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        width: "80%",
        textAlign: "center",
    },
});

export default App;

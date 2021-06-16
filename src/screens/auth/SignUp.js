import React, { useState } from 'react';
import { Text, StyleSheet, Image, StatusBar, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Item, Input, Button, View, Label } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import { Icon } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
import ImgToBase64 from 'react-native-image-base64';

const SignUp = ({ navigation }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        address: '',
        zip_code: '',
        email: '',
        image: null,
        password: '',
        confirmpassword: '',
        country: '',
        city: '',
    })

    
    

    const { firstname, lastname, email, password, image, confirmpassword } = formData

    const onSubmit = () => {
        console.log('First Screen Data', firstname, lastname, email, password, image)
        if (email == '' || firstname == '' || lastname == '') {
            Toast.show("Incomplete Information Provided!", Toast.SHORT)
            return;
        }
        else if (password == '' || confirmpassword == '') {
            Toast.show("Empty Password Field!", Toast.SHORT)
            return;
        }
        else if (password !== confirmpassword) {
            Toast.show("Password MisMatch!", Toast.SHORT)
            return;
        }
        else {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(email) === false) {
                Toast.show("Invalid Email Format!", Toast.SHORT)
                return;
            }
            else {
                navigation.navigate('SignUp2', {
                    firstname: firstname,
                    lastname: lastname,
                    image: image,
                    email: email,
                    password: password,
                })
            }
        }
    }


    const chooseFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false
        }).then(avatar => {
            console.log("Image", avatar);
            setFormData({ ...formData, image: avatar.path })
            
            

        });
    }
    return (
        <View style={[GLOBALSTYLE.screenbg, styles.container]} >
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>


                <View style={styles.formContent}>

                    <Text style={styles.headText}> Create Account </Text>
                    <Text style={styles.headDesc}>Please Fill the Details Below </Text>

                    <TouchableOpacity style={styles.avatar}>
                        <ImageBackground source={{ uri: image }} style={styles.avatarimg}>
                            <Icon name='ios-add' size={50} style={{ color: COLORS.white, fontSize: 35 }} onPress={chooseFromGallery} />
                        </ImageBackground>
                    </TouchableOpacity>

                    <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>First Name</Label>
                        <Input
                            style={styles.textContent}
                            autoCorrect={false}
                            placeholderTextColor={COLORS.white}
                            autoCapitalize="none"
                            onChangeText={(e) => setFormData({ ...formData, firstname: e })}
                        />
                    </Item>
                    <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>Last Name</Label>
                        <Input
                            style={styles.textContent}
                            autoCorrect={false}
                            placeholderTextColor={COLORS.white}
                            autoCapitalize="none"
                            onChangeText={(e) => setFormData({ ...formData, lastname: e })}
                        />
                    </Item>
                    <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>Email</Label>
                        <Input
                            style={styles.textContent}
                            autoCorrect={false}
                            placeholderTextColor={COLORS.white}
                            autoCapitalize="none"
                            onChangeText={(e) => setFormData({ ...formData, email: e })}
                        />
                    </Item>

                    <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>Password</Label>
                        <Input
                            style={styles.textContent}
                            autoCorrect={false}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholderTextColor={COLORS.white}
                            onChangeText={(e) => setFormData({ ...formData, password: e })}
                        />
                    </Item>
                    <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>Confirm Password</Label>
                        <Input
                            style={styles.textContent}
                            autoCorrect={false}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholderTextColor={COLORS.white}
                            onChangeText={(e) => setFormData({ ...formData, confirmpassword: e })}
                        />
                    </Item>

                    <Button
                        style={GLOBALSTYLE.themebtn}
                        mode="contained"
                        onPress={onSubmit}
                    // onPress={() => navigation.navigate('SignUp2')}
                    >
                        <Text style={{ color: 'white', fontSize: 16, textTransform: 'uppercase' }}>Next
                <Icon style={{ fontSize: 15, marginLeft: 10 }} name='arrow-forward' />
                        </Text>
                    </Button>

                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <Text style={{ color: COLORS.lightGray, marginTop: 12.5, fontSize: SIZES.body4 }}>Already have an Account? </Text>
                        <Button
                            hasText
                            transparent
                            onPress={() => navigation.navigate('LoginScreen')}
                        >
                            <Text style={{ color: COLORS.secondry, fontWeight: "bold", fontSize: SIZES.body4, textTransform: 'uppercase' }}> Sign In</Text>
                        </Button>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    formContent: {
        marginTop: 0,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: SIZES.width * 0.30,
        height: SIZES.width * 0.30,
        resizeMode: "contain",
        marginVertical: 30,
        alignSelf: 'center'
    },
    headText: {
        fontFamily: 'RobotoSlab-Regular',
        fontSize: 32,
        color: COLORS.white,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,

    },
    headDesc: {
        color: COLORS.lightGray,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20,
    },
    textContent: {
        color: COLORS.white
    },
    inputBox: {
        marginTop: 10,
        backgroundColor: COLORS.black,
        color: '#707070',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: COLORS.transparent,
        marginTop: 20,
        paddingHorizontal:20
    },
    labelContent: {
        color: COLORS.lightGray,
        marginLeft: 20,
        marginTop: -13,
    },
    formContent: {
        width: SIZES.width * 0.80,
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.black,
        borderWidth: 2,
        borderColor: COLORS.secondry

    },
    avatarimg: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 50,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden'

    }

});
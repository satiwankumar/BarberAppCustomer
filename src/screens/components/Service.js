import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { View } from 'native-base';
import { Container, Header, Content, Form, Item, Input, Button, Icon, Card, CardItem, Body } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE, TEXTSTYLES } from "../../constants";
import { useRoute } from '@react-navigation/native';
import { getServices } from '../../redux/actions/services'
import { connect } from 'react-redux'


const Service = ({ navigation, getServices, Services: { Services, loading }, Shop: { Shop } }) => {
    useEffect(() => {
        getServices()
    }, [getServices])
    const route = useRoute();
    const typeKey = route.params.typeKey;
    console.log("SERVICE ROUTES", route.params)
    return (
        <>
            {Services && Object.keys(Services).length > 0 ?
                Services.data.map((item, index) => (
                     
                    typeKey == 'Men' ? 
                        item.type == "Skin Treatment" ? 
               <TouchableOpacity key={item._id} style={styles.serviceBox}
                onPress={route.name == 'Home' ? () => navigation.navigate('ServiceProvider', { ServiceName: item.title, ServiceId: item._id }) : () => navigation.navigate('BookNow')}
                                        >
                    <View style={{ flex: 2 }}>
                    <Image
                        source={{ uri: item.images[0] }}
                        resizeMode="contain"
                        style={styles.serviceImg}
                    />
                    </View>
                    <View style={{ flex: 1 }}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.serviceText}>{item.title}</Text>
                    </View>
                </TouchableOpacity> : null
                        :   
                    typeKey == 'Women'  ?
                        item.type == "Beauty" ?  
                        <TouchableOpacity key={item._id} style={styles.serviceBox}
                onPress={route.name == 'Home' ? () => navigation.navigate('ServiceProvider', { ServiceName: item.title, ServiceId: item._id }) : () => navigation.navigate('BookNow')}
                                        >
                    <View style={{ flex: 2 }}>
                    <Image
                        source={{ uri: item.images[0] }}
                        resizeMode="contain"
                        style={styles.serviceImg}
                    />
                    </View>
                    <View style={{ flex: 1 }}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.serviceText}>{item.title}</Text>
                    </View>
                </TouchableOpacity> : null : 
                        
                        <TouchableOpacity key={item._id} style={styles.serviceBox}
                        onPress={route.name == 'Home' ? () => navigation.navigate('ServiceProvider', { ServiceName: item.title, ServiceId: item._id }) : () => navigation.navigate('BookNow')}
                                                >
                            <View style={{ flex: 2 }}>
                            <Image
                                source={{ uri: item.images[0] }}
                                resizeMode="contain"
                                style={styles.serviceImg}
                            />
                            </View>
                            <View style={{ flex: 1 }}>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.serviceText}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>

            

                )) : <Text style={{ color: COLORS.lightGray, textTransform: 'uppercase' ,marginLeft:10}}>No Services Found</Text>}
            {Services && Object.keys(Services).length > 7 && route.name == 'Home' ? (
                <Button
                    onPress={() => navigation.navigate('ViewAll', { type: 'Services' })}
                    style={{ alignSelf: 'center', backgroundColor: '#000', borderRadius: 100, borderWidth: 1, borderColor: '#fff', height: 55, width: 55, marginLeft: 10 }}>
                    <Icon name='arrow-forward-outline' style={{ fontSize: 24, color: COLORS.white }} />
                </Button>


            ) : <Text></Text>}
        </>
    )

}

const mapStateToProps = state => ({
    Services: state.services,
    Shop: state.shops

})

// export default Service;
export default connect(mapStateToProps, { getServices })(Service);

const styles = StyleSheet.create({
    serviceBox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.secondry,
        height: SIZES.width * 0.35,
        width: SIZES.width * 0.35,
        maxWidth: 130,
        maxHeight: 130,
        borderRadius: 8,
        marginVertical: 15,
        marginHorizontal: 10,
        padding: 10,
    },
    serviceText: {
        color: COLORS.white,
        fontSize: SIZES.h4,
        textAlign: 'center'

    },
    serviceImg: {
        width: 60,
        height: 60,
    }

});
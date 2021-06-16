import React,{useEffect} from 'react';
import { Text, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity } from "react-native";
import { Container, Header, Content, Form, Item, Input, Button, View, Icon, Card, CardItem, Body } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE, TEXTSTYLES } from "../../constants";
import {getShopPackages} from '../../redux/actions/shops'
import {connect} from 'react-redux'

const Package = ({navigation,getShopPackages,Packages:{Packages,loading},shopid}) => {
    console.log('ORIGINAL IDD',shopid)
    useEffect (() =>{
        getShopPackages('60845b31dc8bd5284098c869')
    },[getShopPackages.shopid])
    console.log("SHOPPP PACKAGEEE",Packages)
    return (
        <>
        {Packages && Object.keys(Packages).length > 0?

            Packages.data.map((item,index)=>(
            <Card key={item._id} style={styles.shopBox}>
                <CardItem style={{ backgroundColor: COLORS.transparent, }}>
                    <Body>
                        <Image    source={{uri: item.images[0]}}
                            resizeMode="cover"
                            style={styles.shopImg} />
                        <View style={{ flexDirection: 'row', paddingVertical: 10,justifyContent:'space-between', alignItems: 'flex-start' }}>
                            <View style={{ width: '80%' }}>
                                <Text style={styles.shopHead}>{item.title}</Text>
                                <Text style={styles.shopDesc}>{item.description}</Text>
                            </View>
                                <Text style={{ color: COLORS.secondry, fontSize: 18,width:'20%',textAlign:'right' }}>${item.charges}</Text>
                            
                        </View>
                    </Body>
                </CardItem>
            </Card>)):<Text>kjdgkd</Text>}
            </>
    )
    
}

const mapStateToProps = state => ({
    Packages: state.shops
    
} )

// export default Review;
export default connect(mapStateToProps,{getShopPackages})(Package);

const styles = StyleSheet.create({
    shopBox: {
        borderWidth: 1,
        borderColor: COLORS.secondry,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
        width:300,
        marginLeft:15,

    },
    shopHead: {
        color: COLORS.white,
        textTransform: 'uppercase',
        fontSize: 17,
        lineHeight: 24
    }
    ,
    shopDesc: {
        color: COLORS.lightGray,
        fontSize: 13,
        marginTop:5
    },
    shopText: {
        flex: 1,
        padding: 15,
    },
    shopImg: {
        width: '100%',
        height: 160,
        borderRadius: 8,

    }

});
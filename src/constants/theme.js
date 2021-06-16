import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: '#050506', // Black
    secondry: '#9a703a', // Brown


    black: "#1E1F20", //DarkGray
    white: "#FFFFFF",
    // lightGray: "#B8B8B830",
    transparent: "transparent", 
    darkgray : "#2e2f34",
    lightGray: "#A1A0A1",
    yellow:'#f3c030'
    
};

export const SIZES = {
    // App Dimensions
    width,
    height
};

export const TEXTSTYLES = {
    sectionHead: {fontFamily:'RobotoSlab-Regular',letterSpacing:3,color:COLORS.white,fontSize:23,textTransform:'uppercase',marginVertical:10,marginLeft:7},
    paragraph : { fontFamily:'Roboto-Regular',color:COLORS.white,fontSize:16,letterSpacing:0.7},
    boxHead: {fontFamily:'RobotoSlab-Regular',color:COLORS.white,fontSize:20 }
};

export const GLOBALSTYLE = {
    screenbg:{backgroundColor: COLORS.primary, flex:1,},
    themebtn:{ 
            marginTop: 20,
            width: 200,
            height: 50,
            backgroundColor: COLORS.black,
            borderColor:COLORS.secondry,
            borderWidth:1,
            alignSelf:'center',
            justifyContent:'center',
            borderRadius: 8,
            textAlign:'center',
    },
}

const appTheme = { COLORS, SIZES, GLOBALSTYLE ,TEXTSTYLES };

export default appTheme;
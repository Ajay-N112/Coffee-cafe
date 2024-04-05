

import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, StatusBar, ImageBackground, TextInput, Pressable, Image } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FAIcons from 'react-native-vector-icons/FontAwesome6';

const { height } = Dimensions.get('window');

const Btn = ({ children, onPress, active }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.button,
        { 
          backgroundColor: pressed || (isPressed && active) ? 'brown' : '#c58b4e',
        },
      ]}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Icon name="home" size={25} color="#c58b4e" />
      <Icon name="heart" size={25} color="#c58b4e" />
      <Icon name="shopping-bag" size={25} color="#c58b4e" />
      <Icon name="bell" size={25} color="#c58b4e" />
    </View>
  );
};

const ItemScreen = () => {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://api.sampleapis.com/coffee/hot');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filteration
    const filteredProducts = products.filter(product => {
      return (
        (searchText ? product.title.toLowerCase().includes(searchText.toLowerCase()) : true) &&
        (selectedCategory ? product.title.toLowerCase() === selectedCategory.toLowerCase() : true)
      );
    });

    return (
        <>
            <StatusBar translucent backgroundColor='transparent' />
            <ScrollView contentContainerStyle={styles.container}>
                {/* Top container */}
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#333333', '#222222', '#111111']}>
                    <View style={styles.top}>
                        <View style={styles.location}>
                            <View style={{ width: '80%', paddingTop: 5 }} >
                                <Text style={{ color: 'grey' }} >Location</Text>
                                <Text style={{ fontFamily: 'Sora-Medium', color: 'lightgrey' }}>Bilzen, Tanjungbalai</Text>
                            </View>
                            <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/027/708/418/small/default-avatar-profile-icon-in-flat-style-free-vector.jpg' }} style={{ width: '15%',height:'100%', borderRadius: 15 }} />
                        </View>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#555555', '#444444', '#444444']} style={{ borderRadius: 15 }}>
                            <View style={styles.search}>
                                <FeatherIcons name='search' color='lightgrey' size={30} />
                                <TextInput 
                                    placeholderTextColor='grey' 
                                    placeholder='Search coffee' 
                                    style={{ flex: 1, marginHorizontal: 10 }} 
                                    value={searchText}
                                    onChangeText={text => setSearchText(text)}
                                />
                                <FAIcons name='sliders' size={30} style={{ backgroundColor: '#c58b4e', color: 'white', padding: 10, borderRadius: 10 }} />
                            </View>
                        </LinearGradient>
                    </View>
                </LinearGradient>

               {/* Banner */}
                <View style={{ position: 'absolute', alignSelf: 'center', top: 200, width: '95%', borderRadius: 50 }}>
                    <Image source={{ uri: 'https://i.postimg.cc/QxQMh39Q/Frame-17.png' }} style={{ height: 150, width: '100%', borderRadius: 50 }} />
                </View>

                {/* Button  */}
                <View style={styles.buttonContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {['Cappuccino', 'Latte', 'Americano', 'Machiato'].map((category, index) => (
                            <Btn 
                              key={index}
                              onPress={() => setSelectedCategory(category)}
                              active={selectedCategory === category}
                            >
                              {category}
                            </Btn>
                        ))}
                    </ScrollView>
                </View>

                <Footer />

                {/* Bottom */}
                <View style={styles.bottom}>
                    {/* Products */}
                    <View style={styles.cardContainer}>
                        {filteredProducts.map((item, index) => (
                            <View style={styles.card} key={index}>
                                <ImageBackground source={{ uri: item.image }} style={styles.img} borderRadius={20}>
                                    <View style={styles.rateContainer}>
                                        <Icon name='star' color='gold' />
                                        <Text style={{ color: 'white' }}>4.5</Text>
                                    </View>
                                </ImageBackground>
                                <View style={styles.details}>
                                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{item.title}</Text>
                                    <Text style={{}}>with {item.ingredients[0]}</Text>
                                    <View style={styles.price}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>$ 5.20</Text>
                                        <Icon color='white' name='plus' size={15} style={{ backgroundColor: '#c58b4e', padding: 10, borderRadius: 10 }} />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: height,
        backgroundColor: '#fafafa'
    },
    top: {
        height: height * 0.35,
        paddingBottom: 50,
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    bottom: {
        minHeight: (height - (height * 0.3)),
        paddingTop: 30,
        paddingBottom: 30
    },
    location: {
        height: 60,
        marginBottom: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    search: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 5
    },
    cardContainer: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 20,
        flexWrap: 'wrap',
        rowGap: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 90,
    },
    button: {
        height: 40,
        backgroundColor: '#c58b4e',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        position: 'absolute',
        top: 674,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        zIndex: 999,
    },
    card: {
        width: '40%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginTop:-45
    },
    img: {
        height: 150,
    },
    rateContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 30,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingLeft: 5
    },
    details: {
        height: 130,
        padding: 10
    },
    price: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default ItemScreen;

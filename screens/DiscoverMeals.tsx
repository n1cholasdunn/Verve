import {FlatList, Text, View, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';

//We can also display recipes such as high-protein, low-fat, low-cal, vegan.....
const DiscoverMeals = () => {
  const [breakfastRecipes, setbreakfastRecipes] = useState('testrecipe');

  const renderBreakfast = ({item}) => (
    <View style={styles.mealCard}>
      <Image
        style={{
          height: 200,
          width: 200,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        source={{
          uri: 'https://edamam-product-images.s3.amazonaws.com/web-img/36b/36be4fd2cbb2dafacf722da53d7de6da-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLWVhc3QtMSJHMEUCIQDYpAKap2SjYCSa4T2riUn4WSaA51VlkDZqT6LJ7%2Fu5nwIgBLHEb0de8pneyQN2avuzOGMwdMfTbZgxMHfJ6fqZsPkquQUIeRAAGgwxODcwMTcxNTA5ODYiDEiBlWWQCTY8Co%2Fz2SqWBU5UmxHSJ6subUn018Kl3g%2FvCfUKC%2FEoFSSPaKbg4Fizla30Hzzh1F9uaZvyEq2y46a30G9MIBwYJ19AMAuiuwBeINrsCIZYv4C6Pn2ik4xSsFT6e%2FtX22XoiilvjulPH%2BVZ%2BLt1pJUzBjv%2B%2B97CjbS%2BcCxqsrD5qvT46ZpTbvqBXB3UuHpn%2BOqycymQgrEMx8vloV09iX9IyIHq8wiEtbLg0WT%2BdRcSHwtIPVD08p0NdhawLV6zgo7ZhSjaFhYwl2%2BxDBz9fRjFS2miEXuEmvISxl8IumbKZfbEG%2FhtdbJMsSoKHOaFJj%2Fp5c7htrtMerVd0RrLS3SeIxhUlrCdyUR3hEb9zHhW8jTax9NZd0crehhggOhrv224lCFu0H%2FPVnOGCeFYYwAB6%2BSEF8hAsW2oFG7iJ4bCIi1076JtLvMrrPkf9m7Np0wJgmusfANWLSYMNNVy0UUWIK7PcNlLHQzyD026bxmyycd6iM8QNcpGpxYUUIbe8UEm8txVhPOwpDU4wVEgcOyE%2BVhiHZVVKrTGtcJYfXIU5lYLR3voQWK9Z50na6FWjcvYnjZsvdJqK00gFLv85XwEXr6auyeACT%2F7GOFJWvDyPYPSsmg5qNJbz3Id%2Bvemj7O7T3tetAimFeQIRzIGYCmVhfBuviD2EmM7pAcD4WEhQ5tlbobnomDP6xhiQdelz2KNjkDtVPJOBbCD3BAZt9tKLzOkOOP%2Fo%2FNTv%2F%2BEayrYLdzQt3N0ytctXJ8NJk2CQso0tgqi1p9uCJe9ZFiil8OR%2Fb8OdRN0r%2BWpNq49ia6wUq34cm63nW988%2FlZJYpMYCtk00dZnzZWU5IPlDUnjeVCRBaBy5DlQj2HJ8sIHaifJU2u26Q%2Bs%2FvzYAiZ1YuMMLi28aQGOrEBIycIPS9nvH1fERjgL5rSWwatqEIzH%2BxWi9nIeZau5f1l%2BZUF6S5hvuFOlm%2F0U%2FY88gLkt8gp%2Bm3FiFWSmImVli3Ug9UOTIFXQpMxBMssc9RVwQnw1xSL1Ahq3uJVtpV9o3B5ysAfGUySZCEerDrRP4A7RWp59RAeOwmL%2FJqcVDCARhhsCk7x5%2Fag%2B691jAJmol4X8VCD4D%2Bpi0Dfy3aoiHPrsp34eDvTfRHzg3Udf4M7&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230628T165805Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFL4YGOKXL%2F20230628%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=fbb5ff505b72be4eb79e911fed08a4f7f7c8f4684a7564b4afec5cdaadcf15a8',
        }}
      />
      <Text
        style={{
          fontSize: 18,
          color: 'white',
          marginTop: 5,
          marginHorizontal: 5,
        }}>
        Test name
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Text style={{fontSize: 15, color: 'gray', marginTop: 20}}>
          100 Cal/serving
        </Text>
        <Text style={{fontSize: 15, color: 'gray', marginTop: 20}}>Save</Text>
      </View>
    </View>
  );

  return (
    <View>
      <View className="mt-10">
        <Text className="text-3xl text-[#ffffff]">Breakfast</Text>
        <FlatList
          data={breakfastRecipes}
          renderItem={renderBreakfast}
          horizontal={true}
          keyExtractor={item => item.uri}
        />
      </View>
      <View className="mt-10">
        <Text className="text-3xl text-[#ffffff]">Lunch</Text>
        <FlatList
          data={breakfastRecipes}
          renderItem={renderBreakfast}
          horizontal={true}
          keyExtractor={item => item.uri}
        />
      </View>
      <View className="mt-10">
        <Text className="text-3xl text-[#ffffff]">Dinner</Text>
        <FlatList
          data={breakfastRecipes}
          renderItem={renderBreakfast}
          horizontal={true}
          keyExtractor={item => item.uri}
        />
      </View>
      <View className="mt-10">
        <Text className="text-3xl text-[#ffffff]">Snacks</Text>
        <FlatList
          data={breakfastRecipes}
          renderItem={renderBreakfast}
          horizontal={true}
          keyExtractor={item => item.uri}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    height: 300,
    width: 200,
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
  },
});

export default DiscoverMeals;

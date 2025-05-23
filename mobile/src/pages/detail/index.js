import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, Linking } from "react-native" ;
import { useNavigation, useRoute } from '@react-navigation/native';
import logoImg from '../../assets/logo.png'
import styles from './styles';
import * as MailComposer from 'expo-mail-composer';

export default function Detail(){

    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident
    const message = `Olá ${incident.name}, estou entrando em contato pois quero ajudar a com o caso ${incident.title}, com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`;
    

    function navigateBack () { navigation.goBack()};

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Quero ajudar no caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })

    };

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone={incident.whatsapp}&text=${message}`)
    };




    return(
        <View style={styles.container}>
            <View style={styles.header}>
            <Image source={logoImg}/>

            <TouchableOpacity onPress = { navigateBack }>
                <Feather name='arrow-left' size={28} color='#E02041' />
            </TouchableOpacity>
        </View>
        <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0 }]}>ONG:</Text>
                                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
                
                                <Text style={styles.incidentProperty}>Descrição:</Text>
                                <Text style={styles.incidentValue}>{incident.description}</Text>
                                
                                <Text style={styles.incidentProperty}>Valor:</Text>
                                <Text style={styles.incidentValue}>
                                    {Intl.NumberFormat('pt-BR', { 
                                        style: 'currency', 
                                        currency: 'BRL'
                                        }).format(incident.value)}</Text>
        </View>
        <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

        <Text style={styles.herodescription}>Entre em contato:</Text>
        
        <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
        <Text style={styles.actionText}>Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={sendMail}>
        <Text style={styles.actionText}>Email</Text>
        </TouchableOpacity>
        </View>





        </View>



        </View>
    );
}
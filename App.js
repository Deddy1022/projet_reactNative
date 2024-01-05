import React , {useEffect, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal
} from "react-native";
import axios from 'axios';

import {AntDesign, FontAwesome} from "react-native-vector-icons/"

const App = () => {
    const baseUrl = "http://10.0.2.2/api_react/api/etudiant.php";
    const [list, setList] = useState([])
    const [modalList, setModalList] = useState(false)
    const [modalListUpdate, setModalListUpdate] = useState(false)

    const [matricule, setMatricule] = useState('');
    const [nom, setNom] = useState('');
    const [bourse, setBourse] = useState('');

    useEffect(() => {
        getList();
    }, []);

    const getList = () => {
        axios({
            url: baseUrl,
            method: "GET"
        })
        .then((res) => {
            let response = res.data;
            setList(response.data)
            
        }).catch(error => console.log(error))
        
    }

    const handleDelete = (item) => {
        axios({
            url: `${baseUrl}?numEt=${item.numEt}`,
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            let response = res.data;
            getList();
            console.log(item.numEt);
        }).catch(error => console.log(error))
    }

    const handleUpdate = (item) => {
        axios({
            url: `${baseUrl}?numEt=${item.numEt}`,
            method: "PUT",
            data: {
                "numEt": item.numEt,
                "nom": nom,
                "bourse": bourse
            }
        }).then((res) => {
            let response = res.data;
            console.log(response.data);
            getList();
            setModalListUpdate(false);
            clearAllText();

        })
    }

    const handlemodalUpdate = (item) => {
        setModalListUpdate(true)
        setMatricule(item.numEt);
    }

    const handleCreate = () => {
        setModalList(true)
    }

    const closeButton = () => {
        setModalList(false);
        setModalListUpdate(false);
        clearAllText();
    }

    const registerEt = () => {
        axios({
            url: baseUrl,
            method: "POST",
            data: {
                "numEt": matricule,
                "nom": nom,
                "bourse": bourse
            }
        })
        .then((res) => {
            let response = res.data;
            setModalList(false);
            getList();
            clearAllText();
            
        }).catch(error => console.log(error))
    }

    const clearAllText = () => {
        setMatricule("");
        setNom("");
        setBourse("");
    }

    return (
        <SafeAreaView>
            <Modal visible={modalList}>
                
                <View  style={[styles.rowBetween, styles.header_container]}>
                    <Text style={styles.close_header}>Nouvel étudiant</Text>
                    <TouchableOpacity onPress={closeButton}>
                        <Text style={styles.close_header}>Close</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{paddingHorizontal:10, marginTop:20}}>
                    <Text style={{marginTop: 20}}>matricule</Text>
                    <TextInput
                        placeholder='numéro étudiant'
                        style={styles.textInput}
                        value={matricule}
                        onChangeText={(text) => {
                            setMatricule(text)
                        }}

                    />
                    <Text style={{marginTop: 20}}>nom</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='votre nom'
                        value={nom}
                        onChangeText={(text) => {
                            setNom(text)
                        }}
                    />
                    <Text style={{marginTop: 20}}>bourse</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='Vola'
                        value={bourse}
                        onChangeText={(text) => {
                            setBourse(text)
                        }}
                    />

                    <TouchableOpacity onPress={registerEt} style={styles.btnSave}>
                        <Text style={styles.close_table} >SAVE</Text>
                    </TouchableOpacity>
                </View>
                
                <TextInput></TextInput>
            </Modal>

            <Modal visible={modalListUpdate}>
                
                <View  style={[styles.rowBetween, styles.header_container]}>
                    <Text style={styles.close_header}>Update étudiant</Text>
                    <TouchableOpacity onPress={closeButton}>
                        <Text style={styles.close_header}>Close</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{paddingHorizontal:10, marginTop:20}}>
                    <Text style={{marginTop: 20}}>matricule</Text>
                    <TextInput
                        placeholder='numéro étudiant'
                        style={styles.textInput}
                        value={matricule}
                        onChangeText={(text) => {
                            setMatricule(text)
                        }}

                    />
                    <Text style={{marginTop: 20}}>nom</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='votre nom'
                        value={nom}
                        onChangeText={(text) => {
                            setNom(text)
                        }}
                    />
                    <Text style={{marginTop: 20}}>bourse</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='Vola'
                        value={bourse}
                        onChangeText={(text) => {
                            setBourse(text)
                        }}
                    />

                    <TouchableOpacity onPress={handleUpdate} style={styles.btnSave}>
                        <Text style={styles.close_table}>Update</Text>
                    </TouchableOpacity>
                </View>
                
                <TextInput></TextInput>
            </Modal>
            
            <View style ={styles.header_container}>
                <View style ={styles.rowBetween}>
                    <Text style={styles.txt_main }>Listes des étudiants</Text>
                    <TouchableOpacity style={{padding:10}} onPress={handleCreate}>
                        <Text style={{color:"blue", fontWeight:"bold"}}>
                            <AntDesign name='adduser' style={{color: "violet", fontSize: 30}}/>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                {list.map((item,index) => {
                    return(
                        <View key={index} style={styles.item_et}>
                            <View>
                                <Text style={styles.liste}>{item.numEt}</Text>
                                <Text style={styles.liste}>{item.nom}</Text>
                                <Text style={styles.liste}>{item.bourse}</Text>
                            </View>
                            <View>
                            
                                <TouchableOpacity onPress={() => handleDelete(item)}>
                                    <Text style={styles.delete_et}>
                                        <AntDesign name='delete' style={{color: "red", fontSize: 30}}/>
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlemodalUpdate(item)}>
                                    <Text style={styles.update_et}>
                                        <FontAwesome name='pencil-square-o' style={{color: "#279", fontSize: 30}}/>
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    header_container: {
        marginTop: 26,
        padding: 15,
        backgroundColor: "#eeeeee"
    },
    txt_main: {
        fontSize: 22,
        fontWeight: "bold"
    },
    item_et: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e2e2e2",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    liste: {
        fontSize: 14,
        marginTop: 5,
    },
    delete_et: {
        fontSize: 14,
        marginTop: 5,
        color: "red",
        fontWeight: "bold"
    },
    update_et: {
        fontSize: 14,
        marginTop: 5,
        color: "blue",
        fontWeight: "bold"
    },
    close_table: {
        color: "#ffffff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold"
    },
    close_header: {
        color: "#888",
        fontSize: 16,
        fontWeight: "bold"
    },
    textInput: {
        padding:10,
        borderWidth: 1,
        borderRadius:12,
        borderColor:"#888",
        marginTop:10
    },
    btnSave: {
        marginTop: 60,
        marginHorizontal: 160,
        backgroundColor: "green",
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "grey",
        padding: 10
    }
})
// import {firestore} from './firebase'
// import {getUserInfoFromToken} from '../components/verify'

// function getId(){
//     let userInfo = getUserInfoFromToken()
//     let signedInId = userInfo["userId"]
//     return signedInId
// }

// const getData = async () => {
//     const userid = await getId()
//     const snapshot = await firestore.collection("data").where("userid", "==", userid).orderBy("timestamp").get()
//     const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
//     return data
// }

// const createData = async (debCred, price, desc, timestamp) => {
//     const userid = await getId()
//     const ref = await firestore.collection("data").add({debCred, price, desc, timestamp, userid});

//     const newData = {
//         id : ref.id,
//         ...{debCred, price, desc},
//     };
    
//     return newData;
// }

// const deleteDataById = async (id) => {
//     const deleteData = await firestore.collection("data").doc(id).delete()
//     return deleteData
// }

// export {getData, createData, deleteDataById}
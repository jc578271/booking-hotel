import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyCLtMLmiOdt8eUBGur5gyVI5J9FqApOGNI",
    authDomain: "booking-hotel-hoang.firebaseapp.com",
    databaseURL: "https://booking-hotel-hoang.firebaseio.com",
    projectId: "booking-hotel-hoang",
    storageBucket: "booking-hotel-hoang.appspot.com",
    messagingSenderId: "126892028911",
    appId: "1:126892028911:web:628da5c6b7ddd592793c1a",
    measurementId: "G-CX2XGYH7DX"
};

firebase.initializeApp(config)

const firebaseDB = firebase.database()
const firebaseBookings = firebaseDB.ref('bookings')
const firebaseRooms = firebaseDB.ref('rooms')
const firebaseServices = firebaseDB.ref('services')

export {
    firebase,
    firebaseBookings,
    firebaseRooms,
    firebaseServices,
    firebaseDB
}
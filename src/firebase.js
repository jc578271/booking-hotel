import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyCVjomV4tY3Atu6DoIC-LcTdOQ434S0EPk",
    authDomain: "booking-hotel-dcaf8.firebaseapp.com",
    databaseURL: "https://booking-hotel-dcaf8.firebaseio.com",
    projectId: "booking-hotel-dcaf8",
    storageBucket: "booking-hotel-dcaf8.appspot.com",
    messagingSenderId: "716967256329",
    appId: "1:716967256329:web:e591699ce91a383a8bb3d8",
    measurementId: "G-5RLZQ2NGB9"
};

firebase.initializeApp(config)

const firebaseDB = firebase.database()
const firebaseBookings = firebaseDB.ref('bookings')
const firebaseRooms = firebaseDB.ref('rooms')

export {
    firebase,
    firebaseBookings,
    firebaseRooms,
    firebaseDB
}
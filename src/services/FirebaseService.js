const firebase = require('firebase-admin')

class FirebaseService {
    constructor() {}

    async sendNotification(message) {
        try {
            await firebase.messaging().send(message)
        } catch (error) {
            console.log(error) 
        }
    }
}

module.exports = FirebaseService
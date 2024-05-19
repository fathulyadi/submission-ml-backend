const { Firestore } = require('@google-cloud/firestore');

async function getData() {
    const db = new Firestore();
    const historyRef = db.collection('predictions');
    const historySnap = await historyRef.get();

    const data = [];

    historySnap.forEach(doc => {
        data.push({
            id: doc.id,
            history: doc.data()
        });
    });

    return data;
}

module.exports = getData;
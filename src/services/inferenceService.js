const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        const classes = ['Cancer', 'Non-cancer'];
        let label, suggestion;

        if (confidenceScore >= 50) {
            label = classes[0];
            suggestion = "Silahkan periksa ke dokter untuk konsultasi dan penanganan lebih lanjut!";
        } else {
            label = classes[1];
            suggestion = "Hidup anda sedikit lebih aman!";
        }

        // const classResult = tf.argMax(prediction, 1).dataSync()[0];
        // const label = classes[classResult];

        // let suggestion;

        // if (label === 'Cancer') {
        //     suggestion = "Silahkan periksa ke dokter untuk konsultasi dan penanganan lebih lanjut!"
        // }

        // if (label === 'Non-cancer') {
        //     suggestion = "Hidup anda sedikit lebih aman!"
        // }

        return { label, suggestion };
    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
}

module.exports = predictClassification;
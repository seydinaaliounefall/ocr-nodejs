const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  keyFilename: './google-vision-ocr-key.json'
});

async function extractTextFromImage(imagePath) {
  const [result] = await client.textDetection(imagePath);
  const detections = result.textAnnotations;
  console.log('Detections : ', detections);

    // Return the full text from the first detection if available
    if (detections.length > 0) {
      return detections[0].description;
    } else {
      return ''; // Return an empty string if no text was detected
    }
}
module.exports = { extractTextFromImage };

const fs = require('fs');
const https = require('https');

const API_KEY = process.env.GOOGLE_API_KEY;
const MODEL = 'gemini-3-pro-image-preview';

async function generateImage(prompt, filename) {
    const data = JSON.stringify({
        contents: [{
            parts: [{ text: prompt }]
        }],
        generationConfig: {
            responseModalities: ["image", "text"]
        }
    });

    const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    if (json.candidates && json.candidates[0].content.parts) {
                        const imagePart = json.candidates[0].content.parts.find(p => p.inlineData);
                        if (imagePart) {
                            const base64Data = imagePart.inlineData.data;
                            fs.writeFileSync(filename, Buffer.from(base64Data, 'base64'));
                            const stats = fs.statSync(filename);
                            console.log(`Saved ${filename} (${stats.size} bytes)`);
                            resolve(stats.size);
                        } else {
                            reject(new Error('No image in response: ' + body));
                        }
                    } else {
                        reject(new Error('Unexpected response format: ' + body));
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.write(data);
        req.end();
    });
}

const style = "Professional textbook illustration. Clean modern infographic style. Blue and orange color scheme with gray accents. White or light background. Labeled components with clear typography. Business analytics / data science education context. Wide landscape format, high resolution.";

async function main() {
    const images = [
        {
            prompt: `IoT architecture stack. Showing sensors at the edge, fog/edge nodes for local processing, central cloud platform for big data analytics, and resulting business actions. ${style}`,
            file: '/home/node/openclaw/books/business-intelligence/images/ch08-iot-architecture.png'
        },
        {
            prompt: `Cloud computing service models stack. Vertical layers showing IaaS at the base, PaaS above it, SaaS above that, and AaaS (Analytics as a Service) at the top. ${style}`,
            file: '/home/node/openclaw/books/business-intelligence/images/ch08-cloud-service-models.png'
        },
        {
            prompt: `Geospatial and location analytics visualization. A city map with multiple data layers including a heat map of customer density and point locations of stores. ${style}`,
            file: '/home/node/openclaw/books/business-intelligence/images/ch08-geospatial-analytics.png'
        },
        {
            prompt: `Data scientist skills landscape. A Venn diagram with four overlapping circles: Programming, Statistics, Domain Knowledge, and Communication. ${style}`,
            file: '/home/node/openclaw/books/business-intelligence/images/ch08-data-scientist-skills.png'
        }
    ];

    for (const img of images) {
        try {
            await generateImage(img.prompt, img.file);
        } catch (e) {
            console.error(`Failed to generate ${img.file}:`, e.message);
            // Retry once with fallback model if needed, but here I'll just log
        }
    }
}

main();

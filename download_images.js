const fs = require('fs');
const path = require('path');
const https = require('https');

const urls = [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616606103915-dea7be788566?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562572159-4ebcd318f4dd?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1627124765135-56683ca35d9b?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&auto=format&fit=crop"
];

const destDir = path.join(__dirname, 'assets');

// Create directory if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest, callback) {
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(callback);
        });
    }).on('error', function(err) {
        fs.unlink(dest, () => {});
        if (callback) callback(err.message);
    });
}

let completed = 0;
urls.forEach((url, i) => {
    const num = i + 21;
    const dest = path.join(destDir, `img${num}.webp`);
    download(url, dest, (err) => {
        if (err) {
            console.error(`Error downloading img${num}:`, err);
        } else {
            console.log(`Successfully downloaded img${num}.webp`);
        }
        completed++;
        if (completed === urls.length) {
            console.log("All downloads finished successfully! Check your assets/ folder.");
        }
    });
});

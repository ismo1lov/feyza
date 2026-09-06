const fs = require('fs');
const path = require('path');

function saveBase64Image(dataUrl) {
  if (!dataUrl || !dataUrl.startsWith('data:')) return dataUrl;

  const matches = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) return dataUrl;

  const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + ext;
  const filepath = path.join(__dirname, '..', 'uploads', filename);

  fs.writeFileSync(filepath, buffer);
  return '/uploads/' + filename;
}

module.exports = { saveBase64Image };

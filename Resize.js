const sharp = require('sharp');
const path = require('path');

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer, user) {
    console.log(user)
    const filename = `${user}.png`;
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    
    return filename;
  }

  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;
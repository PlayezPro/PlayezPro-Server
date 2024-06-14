import crypto from 'crypto'

//Creo una llave publica y pirivada para cifrar, usando el metrodo de crypto llamado generatekeypairsync
export const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {//el keypair
    modulusLength: 2048, //la longitud que tendra
    publicKeyEncoding: {//Llave publica
      type: 'spki', //simple public-key infrastructure
      format: 'pem' //formato (necesario para los keypairs que sea de tipo pem)
    },

    privateKeyEncoding: {//Llave privada
      //Formato para manejar la informacion encriptada y no encriptada en la llave publica, este en especifico es compatible con varios algorithmos no solo RSA
      type: 'pkcs8',
      format: 'pem'
    }
  })
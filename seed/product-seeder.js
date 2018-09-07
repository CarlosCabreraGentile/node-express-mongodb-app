var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true });

var products = [
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/91O2cwfTxDL._SL1500_.jpg',
        title: 'GTA 5',
        description: 'Sandbox game',
        price: 14
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Call_of_Duty_Modern_Warfare_3_box_art.png/220px-Call_of_Duty_Modern_Warfare_3_box_art.png',
        title: 'MW 3',
        description: 'War game',
        price: 28
    }),
    new Product({
        imagePath: 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcaIJ1CfzeNNY.j0LVaV89ILAtfcndh0YYNH1I9r_wwfQwQrFcNM5K3eaA4TBIdiYrX7gk3qADwwdR2m3adOIFBYPFrSoe6cLQjODrzP1wP0m7TYJ5Vn1e_oj496N1Of3x_4ZG.1L9oCFP39kv7Y.V9QxaSTFWMCwtVMBN64Z_gXM-&h=300&w=200&format=jpg',
        title: 'Tomb Raider Definitive Edition',
        description: 'Accion game',
        price: 14
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Constructor-pc.jpg',
        title: 'Constructor',
        description: 'Strategy game',
        price: 14
    }),
    new Product({
        imagePath: 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcTwvbhJv8SdSctGQx_l51ieM1HELuFpCNYyyJF3LIdzi8eAGvUANe6UsQGujXWN1JX3DD2XEx4xIP5yuk8JbykhXIfzQRjET3wl4378Rvi4GsooVQM1w1TD4pZdMq0Y2QLBkwPIM2KZ2SAkgb.5D3EUJ9tpn1i602xWIor50vkA8-&h=300&w=200&format=jpg',
        title: 'Metal Gear Solid V: The Definitive Experience',
        description: 'Accion game',
        price: 14
    }),
    new Product({
        imagePath: 'https://i11a.3djuegos.com/juegos/14863/far_cry_5__nombre_provisional_/fotos/ficha/far_cry_5__nombre_provisional_-3996928.jpg',
        title: 'Far Cry 5',
        description: 'Accion game',
        price: 14
    })
];

var done = 0;

for (let i = 0; i < products.length; i++) {
    products[i].save(function(err, result){
        done++;
        //if finish with de last item
        if (done === products.length) {
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

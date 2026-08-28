const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordenSchema = new Schema({

    // quien  hizo la orden?
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },

        // arreglo de productos con cantidad
        productos: [{
            producto: {
                type: Schema.Types.ObjectId,
                ref: 'Producto'
            },
            cantidad: { type: Number, required: true, min: 1}
        
        }],
        total: {type: Number, required: true},

        // estado del ciclo de vida de la orden
        estado: { 
            type: String,
            default: 'pendiente',
            enum: ['pendiente', 'procesando', 'enviado', 'entregado' ]
        }

    }, {timestamps: true});

    const Orden = mongoose.model ('Orden', ordenSchema);
    module.exports = Orden; 


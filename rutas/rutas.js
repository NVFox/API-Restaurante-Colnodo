const express = require('express');
const router = express.Router();
const controlador = require('../controlador/controlador');
const tables = ['/usuarios', '/testimonios', '/productos', '/servicios']

for (let item of tables){
    router.get(item, controlador.listItems);
    router.post(item, controlador.createItems);
    router.put(`${item}/:id`, controlador.updateItems);
    router.delete(`${item}/:id`, controlador.deleteItems);
}

module.exports = router;
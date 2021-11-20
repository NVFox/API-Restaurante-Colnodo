const express = require('express');
const router = express.Router();
const controlador = require('../controlador/controlador');
const tables = ['/usuarios', '/testimonios', '/productos', '/servicios',
                '/compras', '/reservas', '/contacto', '/empleados',
                '/establecimiento', '/mensajes']

for (let item of tables){
    router.get(item, controlador.listItems);
    router.get(`${item}/:id`, controlador.listItemsWithId);
    router.post(item, controlador.createItems);
    router.put(`${item}/:id`, controlador.updateItems);
    router.delete(`${item}/:id`, controlador.deleteItems);
}

router.post('/login', controlador.loginHandler);

module.exports = router;
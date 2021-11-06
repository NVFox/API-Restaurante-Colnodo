const controlador = {}

controlador.listItems = (req, res) => {
    const url = (req.originalUrl).slice(1);

    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM ${url}`, (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        })
    })
}

controlador.listItemsWithId = (req, res) => {
    const { id } = req.params;
    let url = (req.originalUrl).slice(1);
    url = url.replace(/\d/g, "").slice(0, -1);

    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM ${url} WHERE usuId = ?`, [id], (err, results) => {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        })
    })
}

controlador.createItems = (req, res) => {
    const url = (req.originalUrl).slice(1);

    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO ${url} SET ?`, [req.body], (err, results) => {
            if (err) {
                res.json(err);
            }
        })
    })
}

controlador.updateItems = (req, res) => {
    const { id } = req.params;
    let url = (req.originalUrl).slice(1);
    url = url.replace(/\d/g, "").slice(0, -1);

    req.getConnection((err, conn) => {
        conn.query(`UPDATE ${url} SET ? WHERE ${url.slice(0, 3)}Id = ?`, [req.body, id], (err, results) => {
            if (err) {
                res.json(err);
            }
        })
    })
}

controlador.deleteItems = (req, res) => {
    const { id } = req.params;
    let url = (req.originalUrl).slice(1);
    url = url.replace(/\d/g, "").slice(0, -1);

    req.getConnection((err, conn) => {
        conn.query(`DELETE FROM ${url} WHERE ${url.slice(0, 3)}Id = ?`, [id], (err, results) => {
            if (err) {
                res.json(err);
            }
        })
    })
}

controlador.loginHandler = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM usuarios WHERE usuNombre = ?", [data.usuNombre], (err, results) => {
            if (err) {
                res.json({
                    message: 'Un error inesperado ha ocurrido',
                    type: 'danger'
                })
            } else if (results.length > 0 && results[0] !== null) {
                if (data.usuContraseña === results[0].usuContraseña){
                    res.json({
                        usuId: results[0].usuId,
                        usuNombre: results[0].usuNombre,
                        usuCorreo: results[0].usuCorreo,
                        usuTelefono: results[0].usuTelefono,
                        usuRol: results[0].usuRol
                    })
                } else {
                    res.json({
                        message: 'Los datos introducidos son incorrectos',
                        type: 'danger'
                    })
                }
            } else {
                res.json({
                    message: 'Los datos introducidos no existen',
                    type: 'danger'
                })
            }
        })
    })
}

module.exports = controlador;
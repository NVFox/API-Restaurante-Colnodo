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

module.exports = controlador;
const { pool } = require('./db');
const { v4: uuidv4 } = require('uuid');

exports.insert = async ({description}) => {
    const id = uuidv4();

    const res = await pool.query(
        `INSERT INTO conditions(id, description)
         VALUES ($1, $2)`,
        [id, description]
    );
    return {
        id,
        description
    }
}

exports.update = async (id, {description}) => {
    const res = await pool.query(
        `UPDATE conditions SET description=$1 WHERE id = $2`,
        [description, id]
    )
}

exports.findAll = async () => {
    const res = await pool.query(
        `SELECT id, description FROM conditions`);

    return res.rows.map(row => ({
        id: row.id,
        description: row.description
    }))
}

exports.findOne = async (id) => {
    const res = await pool.query(
        `SELECT id, description FROM conditions WHERE id = $1`,
        [id]
    );
    return result.rows.map(row => ({
        id: row.id,
        description: row.description
    }))
}

exports.delete = async (id) => {
    const res = await pool.query(
        'DELETE FROM conditions WHERE id=$1',
        [id]
    );
}
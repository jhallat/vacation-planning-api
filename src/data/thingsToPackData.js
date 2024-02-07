const { pool } = require('./db');
const { v4: uuidv4 } = require('uuid');

//{"id":1,"description":"Shirts","amountType":1,"dayAmount":0.5,"extraAmount":1,"frequencyType":0}

exports.insert = async ({description, amountType, dayAmount, extraAmount, frequencyType, conditions}) =>  {
    const id = uuidv4();
    const convertedDayAmount = dayAmount * 100;

    const res = await pool.query(
        `INSERT INTO things_to_pack(id, description, amount_type, day_amount, extra_amount, frequency_type)
         VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [id, description, amountType, convertedDayAmount, extraAmount, frequencyType]
    );
    for (let condition of conditions) {
        await pool.query(
            'INSERT INTO thing_to_pack_condition_mapping VALUES ($1, $2)',
            [id, condition.id]
        )
    }
    return {
        id,
        description,
        dayAmount,
        extraAmount,
        frequencyType,
        conditions
    }
}

exports.update = async (id, {description, amountType, dayAmount, extraAmount, frequencyType, conditions}) => {
    console.log(conditions);
    const convertedDayAmount = dayAmount * 100;
    await pool.query(
        `UPDATE things_to_pack SET description = $1, amount_type = $2, day_amount=$3, extra_amount=$4, frequency_type=$5
         WHERE id = $6`,
        [description, amountType, convertedDayAmount, extraAmount, frequencyType, id]
    )
    await pool.query(
        'DELETE FROM thing_to_pack_condition_mapping WHERE thing_to_pack_id = $1',
        [id]
    )
    for (let condition of conditions) {
        await pool.query(
            'INSERT INTO thing_to_pack_condition_mapping VALUES ($1, $2)',
            [id, condition.id]
        )
    }
}

exports.findAll = async () => {
    const result = await pool.query(
        `SELECT id, description, amount_type, day_amount, extra_amount, frequency_type FROM things_to_pack`)

    const thingsToPack = [];

    for (let row of result.rows) {
        const conditionResults = await pool.query(
            `SELECT id, description FROM conditions INNER JOIN thing_to_pack_condition_mapping
            ON conditions.id = thing_to_pack_condition_mapping.condition_id
            WHERE thing_to_pack_id = $1`,
            [row.id]
        )
        thingsToPack.push({id: row.id,
            description: row.description,
            amountType: row.amount_type,
            dayAmount: row.day_amount / 100,
            extraAmount: row.extra_amount,
            frequencyType: row.frequency_type,
            conditions: conditionResults.rows});

    }

    return thingsToPack;
}

exports.findOne = async (id) => {
    const result = await pool.query(
        `SELECT id, description, amount_type, day_amount, extra_amount, frequency_type FROM things_to_pack WHERE id=$1`,
        [id]);

    return result.rows.map(row => ({id: row.id,
        description: row.description,
        amountType: row.amount_type,
        dayAmount: row.day_amount / 100,
        extraAmount: row.extra_amount,
        frequencyType: row.frequency_type,
        conditions: []}));
}

exports.delete = async (id) => {
    const result = await pool.query(
        'DELETE FROM things_to_pack WHERE id=$1',
        [id]
    );
}



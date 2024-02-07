const conditionsData = require(`./../data/conditionsData`);

exports.checkBody = (req, res, next) => {
    if (!req.body.description) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing description'
        });
    }
    next();
}

exports.getAllConditions = (req, res) => {
    conditionsData.findAll().then((conditions) => {
        res.status(200).json({
            status: 'success',
            results: conditions.length,
            data: {
                conditions
            }
        })
    })
}

exports.getCondition = (req, res) => {
    conditionsData.findOne(req.params.id).then((conditions) => {
        res.status(200).json({
            status: 'success',
            results: conditions.length,
            data: {
                conditions
            }
        })
    })
}

exports.createCondition = (req, res) => {
    conditionsData.insert(req.body).then((condition) => {
        res.status(201).json({
            status: 'success',
            data: {
                condition
            }
        })
    })
}

exports.updateCondition = (req, res) => {
    conditionsData.update(req.params.id, req.body).then((condition) => {
        res.status(204).json({
            status: 'success',
            data: {
                condition
            }
        })
    })
}

exports.deleteCondition = (req, res) => {
    conditionsData.delete(req.params.id).then(() => {
        res.status(204).json({
            status: 'success'
        })
    })
}

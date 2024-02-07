const thingsToPackData = require('./../data/thingsToPackData');


exports.checkBody = (req, res, next) => {
    if (!req.body.description) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing description'
        });
    }
    next();
}

exports.getAllThingsToPack = (req, res) => {
    thingsToPackData.findAll().then((thingsToPack) => {
        res.status(200).json({
            status: 'success',
            results: thingsToPack.length,
            data: {
                thingsToPack
            }
        })
    })
}

exports.getThingToPack = (req, res) => {
    thingsToPackData.findOne(req.params.id).then((thingsToPack) => {
        res.status(200).json({
            status: 'success',
            results: thingsToPack.length,
            data: {
                thingsToPack
            }
        })
    })
}

exports.createThingToPack = (req, res) => {
    thingsToPackData.insert(req.body).then((newThingToPack) => {
        res.status(201).json({
            status: 'success',
            data: {
                thingsToPack: newThingToPack
            }
        })
        }
    )
}

exports.updateThingToPack = (req, res) => {
    thingsToPackData.update(req.params.id, req.body).then((newThingToPack) => {
            res.status(204).json({
                status: 'success',
                data: {
                    thingsToPack: newThingToPack
                }
            })
        }
    )
}

exports.deleteThingToPack = (req, res) => {
    thingsToPackData.delete(req.params.id).then(() => {
            res.status(204).json({
                status: 'success',
            })
        }
    )
}
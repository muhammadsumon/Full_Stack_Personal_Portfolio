import technologies from "../Models/technologies.model.js";

/**
 * @desc {*} Get All Technologies
 * @route {*} GET /api/technologies/
 * @access private
 */

const getTechnologies = (req, res) => {
    technologies.find({}, (err, docs) => {
        if (err) {
            res.status(400).json({
                "error": "there are server side error !!",
                "message": err
            })
        } else {
            res.status(200).send(docs);
        }
    })
}


/**
 * @desc {*} Post a Technology
 * @route {*} POST /api/technologies/
 * @access private
 */

const addTechnology = async (req, res) => {

    technologies.create({ ...req.body }, ((err, doc) => {
        if (err) {
            res.status(400).send({
                "error": "Something went wrong !!",
                "message": err
            })
        } else {
            res.status(200).send({
                "message": "Technology created Successfully",
                "createdDocument": doc
            })
        }
    }));

}


/**
 * @desc {*} Get Single Technology
 * @route {*} GET /api/technologies/:id
 * @access private
 */

const getTechnology = (req, res) => {
    const id = req.params.id;

    technologies.findById(id, (err, doc) => {
        
        // If any error occur
        if (err !== null) {
            res.status(400).send({
                "error": "Something went wrong !",
                "message": err
            })
        }

        // If Technology found
        else if (doc !== null) {
            res.status(200).send(doc)
        }

        // If Technology id wrong
        else if ((err === null) && (doc === null)) {
            res.status(404).send({
                "error": "Technology id wrong !",
                "message": err
            })
        }
    })
}


/**
 * @desc {*} Update Technology
 * @route {*} PUT & PATCH /api/technologies/:id
 * @access private
 */

const updateTechnology = async (req, res) => {

    const id = req.params.id;
    const { name } = req.body;

    // any empty key value is not acceptable
    if (!name || !name === "") {
        res.status(400).send({
            "message": "any empty key value is not acceptable !!"
        })
    } else {
        technologies.findByIdAndUpdate(id, { ...req.body }, { new: true }, (
            (err, doc) => {
                // If any error occur
                if (err !== null) {
                    res.status(400).send({
                        "error": "Something went wrong !",
                        "message": err
                    })
                }

                // If technology updated successfully
                else if (doc !== null) {
                    res.status(200).send({
                        "message": "Technology updated Successfully",
                        "updatedDocument": doc
                    })
                }

                // If user id wrong
                else if ((err === null) && (doc === null)) {
                    res.status(404).send({
                        "error": "technology id wrong !",
                        "message": err
                    })
                }
            })
        );
    }

}


/**
 * @desc {*} Delete Technology
 * @route {*} DELETE /api/technologies/:id
 * @access private
 */

const deleteTechnology = async (req, res) => {
    const id = req.params.id;

    technologies.findByIdAndDelete(id, (err, doc) => {
        // If any error occur
        if (err !== null) {
            res.status(400).send({
                "error": "Something went wrong !",
                "message": err
            })
        }

        // If technology updated successfully
        else if (doc !== null) {
            res.status(200).send({
                "message": "Technology Deleted Succussfully",
                "deletedDocument": doc
            })
        }

        // If user id wrong
        else if ((err === null) && (doc === null)) {
            res.status(404).send({
                "error": "technology id wrong !",
                "message": err
            })
        }

    });

}


export {
    getTechnologies,
    getTechnology,
    addTechnology,
    deleteTechnology,
    updateTechnology
};


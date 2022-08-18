import projectTypes from "../Models/projectType.model.js";

/**
 * @desc {*} Get All Project Types
 * @route {*} GET /api/projecttypes/
 * @access private
 */

const getProjectTypes = (req, res) => {

    projectTypes.find({}, (err, docs) => {
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
 * @desc {*} Add New Project Type
 * @route {*} POST /api/projecttypes/
 * @access private
 */

const addProjectType = (req, res) => {

    projectTypes.create({ ...req.body }, ((err, doc) => {
        if (err) {
            res.status(400).send({
                "error": "key or key value are required !!",
                "message": err
            })
        } else {
            res.status(200).send({
                "message": "Project Type created Successfully",
                "createdDocument": doc
            })
        }

    }));

}


/**
 * @desc {*} Get Single Project Type
 * @route {*} GET /api/projecttypes/:id
 * @access private
 */

const getProjectType = (req, res) => {

    const id = req.params.id;

    projectTypes.findById(id, (err, doc) => {

        // If any error occur
        if (err !== null) {
            res.status(400).send({
                "error": "Something went wrong !",
                "message": err
            })
        }

        // If Project Type found
        else if (doc !== null) {
            res.status(200).send(doc)
        }

        // If Project Type id wrong
        else if ((err === null) && (doc === null)) {
            res.status(404).send({
                "error": "Project Type id wrong !",
                "message": err
            })
        }
    })
}


/**
 * @desc {*} Delete Project Type
 * @route {*} DELETE /api/projecttypes/:id
 * @access private
 */

const deleteProjectType = (req, res) => {
    const id = req.params.id;

    projectTypes.findByIdAndDelete(id, (err, doc) => {

        // If any error occur
        if (err !== null) {
            res.status(400).send({
                "error": "Something went wrong !",
                "message": err
            })
        }

        // If Project Type Deleted Successfully
        else if (doc !== null) {
            res.status(200).send({
                "message": "Project Type Deleted Successfully",
                "deletedDocument": doc
            })
        }

        // If Project Type id wrong
        else if ((err === null) && (doc === null)) {
            res.status(404).send({
                "error": "Project Type id wrong !",
                "message": err
            })
        }
    });
}


/**
 * @desc {*} Update Project Type
 * @route {*} PUT & PATCH /api/projecttypes/:id
 * @access private
 */

const updateProjectType = (req, res) => {

    const id = req.params.id;
    const { name } = req.body;

    // Any empty key value is not acceptable
    if (!name || !name === "") {
        res.status(400).send({
            "message": "Any empty key value is not acceptable !!"
        })
    } else {
        projectTypes.findByIdAndUpdate(id, { ...req.body }, { new: true }, (
            (err, doc) => {

                // If any error occur
                if (err !== null) {
                    res.status(400).send({
                        "error": "Something went wrong !",
                        "message": err
                    })
                }

                // If Project Type updated Successfully
                else if (doc !== null) {
                    res.status(200).send({
                        "message": "Project Type updated Successfully",
                        "updatedDocument": doc
                    })
                }

                // If Project Type id wrong
                else if ((err === null) && (doc === null)) {
                    res.status(404).send({
                        "error": "Project Type id wrong !",
                        "message": err
                    })
                }
            })
        );
    }
}

export {
    getProjectTypes,
    getProjectType,
    addProjectType,
    deleteProjectType,
    updateProjectType
};


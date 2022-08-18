import projectCategories from "../Models/projectCategories.model.js";

/**
 * @desc {*} Get All Categories
 * @route {*} GET /api/categories/
 * @access private
 */

const getProjectCategories = (req, res) => {

    projectCategories.find({}, (err, docs) => {
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
 * @desc {*} Create a new category
 * @route {*} POST /api/categories/
 * @access private
 */

const addProjectCategory = (req, res) => {

    projectCategories.create({ ...req.body }, ((err, doc) => {
        if (err) {
            res.status(400).send({
                "error": "All key/fields are required !!",
                "message": err
            })
        } else {
            res.status(200).send({
                "message": "Category created Successfully",
                "createdDocument": doc
            })
        }

    }));

}


/**
 * @desc {*} Get Single Category
 * @route {*} GET /api/categories/:id
 * @access private
 */

const getProjectCategory = (req, res) => {

    const id = req.params.id;

    projectCategories.findById(id, ((err, doc) => {

        // If any error occur
        if (err !== null) {
            res.status(400).send({
                "error": "Something went wrong !",
                "message": err
            })
        }

        // If Category found
        else if (doc !== null) {
            res.status(200).send(doc)
        }

        // If Category id wrong
        else if ((err === null) && (doc === null)) {
            res.status(404).send({
                "error": "Category id wrong !",
                "message": err
            })
        }
    }))
}


/**
 * @desc {*} Delete Category
 * @route {*} POST /api/categories/:id
 * @access private
 */

const deleteProjectCategory = (req, res) => {

    const id = req.params.id;

    projectCategories.findByIdAndDelete(id, ((err, doc) => {

        // If any error occur
        if (err !== null) {
            res.status(400).send({
                "error": "Something went wrong !",
                "message": err
            })
        }

        // If Category found
        else if (doc !== null) {
            res.status(200).send({
                "message": "Category Deleted Successfully",
                "deletedDocument": doc
            })
        }

        // If Category id wrong
        else if ((err === null) && (doc === null)) {
            res.status(404).send({
                "error": "Category id wrong !",
                "message": err
            })
        }
    }))
}


/**
 * @desc {*} Update Category
 * @route {*} PUT & PATCH /api/categories/:id
 * @access private
 */

const updateProjectCategory = (req, res) => {

    const id = req.params.id;
    const { name } = req.body;

    // Any empty key value is not acceptable
    if (!name || !name === "") {
        res.status(400).send({
            "message": "Any empty key value is not acceptable !!"
        })
    } else {
        projectCategories.findByIdAndUpdate(id, { ...req.body }, { new: true }, (
            (err, doc) => {

                // If any error occur
                if (err !== null) {
                    res.status(400).send({
                        "error": "Something went wrong !",
                        "message": err
                    })
                }

                // If Category found
                else if (doc !== null) {
                    res.status(200).send({
                        "message": "Category updated Successfully",
                        "updatedDocument": doc
                    })
                }

                // If Category id wrong
                else if ((err === null) && (doc === null)) {
                    res.status(404).send({
                        "error": "Category id wrong !",
                        "message": err
                    })
                }
            })
        );
    }
}

export {
    getProjectCategories,
    getProjectCategory,
    addProjectCategory,
    deleteProjectCategory,
    updateProjectCategory
};


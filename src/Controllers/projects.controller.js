import projects from "../Models/project.model.js";

/**
 * @desc {*} Get All Projects
 * @route {*} GET /api/projects/
 * @access private
 */

const getProjects = (req, res) => {
    projects.find({}, (err, docs) => {
        if (err) {
            res.status(400).json({
                "error": "there are server side error !!",
                "desc": err
            })
        } else {
            res.status(200).send(docs);
        }

    }).
        populate("category", ["_id", "name"]).
        populate("type", ["_id", "name"]).
        populate("usedTechnology", ["_id", "name"]);
}


/**
 * @desc {*} Create New Project
 * @route {*} POST /api/projects/
 * @access private
 */

const addProject = (req, res) => {

    let { name, description, images, category, type, responsibility, usedTechnology, live, code } = req.body;

    // Get images path array from "project.images.upload.js" Middleware
    images = req.imagesLink;

    try {
        // if usedTechnology type is string make it array
        if (!Array.isArray(usedTechnology)) {
            usedTechnology = JSON.parse(usedTechnology);
        }
    } catch (error) {
        console.log(error)
    }

    // Project Structure
    const project = {
        "name": name,
        "description": description,
        "link": {
            "live": live,
            "code": code,
        },
        "images": images,
        "responsibility": responsibility,
        "type": type,
        "category": category,
        "usedTechnology": usedTechnology,
    }

    // User must have to fill all required fields
    if (!name || !description || !responsibility || !type || !category || !usedTechnology || !live || !code || !images) {
        res.status(400).send({
            "error": "All key/fields are required !!"
        })
    } else {
        // res.send(project)
        projects.create(project, ((err, doc) => {
            if (err) {
                res.status(400).send({
                    "error": err
                })
            } else {
                projects.populate(doc, {
                    path: "category type usedTechnology",
                    select: "name"
                }, ((err, doc) => {
                    if (err) {
                        res.status(400).send({
                            "error": "There are server side error !!",
                            "message": err
                        })
                    } else {
                        res.status(200).send({
                            "message": "Project created Successfully",
                            "createdDocument": doc
                        })
                    }

                }))
            }
        }));

    }


}


/**
 * @desc {*} Get Single Project
 * @route {*} GET /api/projects/:id
 * @access private
 */

const getProject = (req, res) => {

    const id = req.params.id;

    projects.findById(id, ((err, doc) => {

        // If any error occur
        if (err !== null) {
            res.status(400).send({
                "error": "Something went wrong !",
                "message": err
            })
        }

        // If Project found
        else if (doc !== null) {
            res.status(200).send(doc)
        }

        // If Project id wrong
        else if ((err === null) && (doc === null)) {
            res.status(404).send({
                "error": "Project id wrong !",
                "message": err
            })
        }

    })).
        populate("category", ["_id", "name"]).
        populate("type", ["_id", "name"]).
        populate("usedTechnology", ["_id", "name"])
}


/**
 * @desc {*} Delete Project
 * @route {*} DELETE /api/projects/:id
 * @access private
 */

const deleteProject = (req, res) => {
    const id = req.params.id;

    projects.findByIdAndDelete(id, (err, doc) => {

        // If any error occur
        if (err !== null) {
            res.status(400).send({
                "error": "Something went wrong !",
                "message": err
            })
        }

        // If Project Deleted Succussfully
        else if (doc !== null) {
            res.status(200).send({
                "message": "Project Deleted Succussfully",
                "deletedDocument": doc
            })
        }

        // If Project id wrong
        else if ((err === null) && (doc === null)) {
            res.status(404).send({
                "error": "Project id wrong !",
                "message": err
            })
        }
    });
}


/**
 * @desc {*} Update Project
 * @route {*} PUT & PATCH /api/projects/:id
 * @access private
 */

const updateProject = (req, res) => {

    const id = req.params.id;

    projects.findById(id, (
        (err, doc) => {
            if (doc !== null) {

                let { name, description, category, type, responsibility, usedTechnology, live, code } = req.body;

                // If user don't want to update live & code link ergo live & code link will remain same (bug fix)
                live ? live : live = doc.link.live;
                code ? code : code = doc.link.code;


                try {
                    // if usedTechnology type is string make it array
                    if (!Array.isArray(usedTechnology)) {
                        usedTechnology = JSON.parse(usedTechnology);
                    }
                } catch (error) { }

                // Project Structure
                const project = {
                    "name": name,
                    "description": description,
                    "link": {
                        "live": live,
                        "code": code,
                    },
                    "images": req.imagesLink,
                    "responsibility": responsibility,
                    "type": type,
                    "category": category,
                    "usedTechnology": usedTechnology,
                }

                // Any empty key value is not acceptable
                if (name == "" || description == "" || responsibility == "" || type == "" || category == "" || usedTechnology == "" || live == "" || code == "") {
                    res.status(400).send({
                        "message": "Any empty key value is not acceptable !!"
                    })
                } else {
                    projects.findByIdAndUpdate(id, project, { new: true }, (
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
                                projects.populate(doc, {
                                    path: "category type usedTechnology",
                                    select: "name"
                                }, ((err, doc) => {
                                    if (err !== null) {
                                        res.status(400).send({
                                            "error": "There are server side error !!"
                                        })
                                    } else {
                                        res.status(200).send({
                                            "message": "Project Updated Successfully",
                                            "updatedDocument": doc
                                        })
                                    }

                                }))
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

            } else if (err === null && doc === null) {
                res.status(200).send({
                    "message": "invalid project id !!"
                })
            }
        })
    );
}

export {
    addProject,
    getProjects,
    getProject,
    deleteProject,
    updateProject
};


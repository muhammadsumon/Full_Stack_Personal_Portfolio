import projectCollection from "../Models/project.model.js";

const query = (req, res) => {
    projectCollection.find(req.query, (err, docs) => {
        if (err) {
            res.status(400).json({
                "error": "there are server side error !!",
                "message": err
            })
        } else {
            res.status(200).send(docs);
        }
    }).
        populate("category", ["_id", "name"]).
        populate("type", ["_id", "name"]).
        populate("usedTechnology", ["_id", "name"]);
}

export default query;
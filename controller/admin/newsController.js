const Model = require('../../model/newsModel')



module.exports = {

    getAllNews: async (req, res) => {
        try {
            const news = await Model.find().sort({ createdAt: -1 })
            res.status(200).json(news)
        } catch (error) {
            console.log(error);
        }
    },

    createNews: async (req, res) => {
        try {
            await Model.create(req.body)
            res.status(200).send({ success: true })
        } catch (error) {
            console.log(error);
        }
    },

    editNews: async (req, res) => {
        try {
            await Model.findByIdAndUpdate(req.body.id, {
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                image: req.body.image
            })
            res.status(200).send({ success: true })
        } catch (error) {
            console.log(error);
        }
    },

    deleteNews: async (req, res) => {
        try {

            await Model.deleteOne({ _id: req.body.newsId })
            res.status(200).send({ success: true })
        } catch (error) {
            console.log(error);
        }
    }

}
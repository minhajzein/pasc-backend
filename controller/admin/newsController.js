const Model = require('../../model/newsModel')



module.exports = {
    getAllNews: async (req, res) => {
        try {
            const news = await Model.find()
            res.status(200).json(news)
        } catch (error) {
            console.log(error);
        }
    },
    createNews: async (req, res) => {
        try {
            await Model.create(req.body)
            const news = await Model.find()
            res.status(200).send({ success: true, news })
        } catch (error) {
            console.log(error);
        }
    }


}
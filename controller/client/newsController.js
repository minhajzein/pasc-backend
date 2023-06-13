const Model = require('../../model/newsModel')


module.exports = {

    getAllNews: async (req, res) => {
        try {
            const news = await Model.find().sort({ createdAt: -1 })
            if (news) res.status(200).json(news)
        } catch (error) {
            console.log(error);
        }
    }


}
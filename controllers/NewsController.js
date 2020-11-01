const axios = require("axios")
class NewsController {
    static async getNews(err,res,next){
        try {
            const response = await axios({
                url:'https://newsapi.org/v2/top-headlines?country=id',
                method: 'get',
                headers:{
                    Authorization : `Bearer ${process.env.TOKEN_NEWS}`
                }
            })
            console.log(response.data.articles);
            res.status(200).json(response.data.articles)
        } catch (err) {
            next(err)
        }
    }
}
module.exports = NewsController
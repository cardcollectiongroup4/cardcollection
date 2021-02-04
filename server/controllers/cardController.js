const {Card} = require('../models');
const axios = require("axios").default


class cardController{
    
    static generate(req, res, next){
    //    let random = Math.floor(Math.random()*3)+1
    let random = 2
       let url;
       console.log(random);
       if (random === 1) {
           axios.get("https://api.thecatapi.com/v1/images/search")
            .then(response => {
                // console.log(response);
                res.status(200).json(response.data[0].url)
            })
            .catch(err => {
                res.status(500).json(err)
            })
       }
       else if(random === 2){
        axios.get("https://random.dog/woof.json")
        .then(response => {
            // console.log(response.data.url);
            res.status(200).json(response.data.url)
        })
        .catch(err => {
            res.status(500).json(err)
        })
       }
       else{
        axios.get("https://randomfox.ca/floof/")
        .then(response => {
            // console.log(response.data.image);
            res.status(200).json(response.data.image)
        })
        .catch(err => {
            res.status(500).json(err)
        })
       }
       
    }
}

module.exports = cardController
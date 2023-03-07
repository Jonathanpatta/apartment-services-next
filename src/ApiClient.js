const { default: axios } = require("axios")

// const baseUrl = 'http://localhost:8000'
const baseUrl = 'https://apartment.kadblue.com'

class ApiClient{
    constructor(user){
        this.user = user
        var headers = undefined

        // create an axios instance to use the api

        if(user){
            headers= {
                'Authorization': `Bearer ${this.user.accessToken}`,
            }
        }
        this.Client = axios.create({
            baseURL: baseUrl,
            headers: headers
        })
        if(user){
            this.createProducer(user.uid)
            this.createConsumer(user.uid)
        }
    }

    createProducer(userId){
        var val = window.localStorage.getItem("producer")
        if(val){
            this.producer = JSON.parse(val)
            
        }
        if(!this.producer || this.producer.user_id != userId){
            var data = {
                "user_id": userId
            }
            this.Client.post("/producer/createOrGet",data=data)
            .then((res) => {
                this.producer = res.data
                window.localStorage.setItem("producer",JSON.stringify(res.data))
            })
            .catch(err => console.log(err))
        }
    }

    createConsumer(userId){
        var val = window.localStorage.getItem("consumer")
        if(val){
            this.consumer = JSON.parse(val)
        }
        if(!this.consumer || this.consumer.user_id != userId){
            var data = {
                "user_id": userId
            }
            this.Client.post("/consumer/createOrGet",data=data)
            .then((res) => {
                this.consumer = res.data

                window.localStorage.setItem("consumer",JSON.stringify(res.data))
            })
            .catch(err => console.log(err))
        }
    }

    hasConsumer(){
        if(this.consumer && this.consumer.sk){
            return true
        }
        return false
    }

    hasProducer(){
        if(this.producer && this.producer.sk){
            return true
        }
        return false
    }
}

module.exports = ApiClient
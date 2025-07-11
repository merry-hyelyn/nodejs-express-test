import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import db from "./app/models/index.js"
import tutorialRouters from "./app/routes/tutorial.routers.js";
import request from "request";

const app = express()
const PORT = process.env.PORT || 8080;

var redirectURI = encodeURI("http://localhost:8080/callback");
var api_url = "";

db.sequelize.sync();

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/api/tutorials", tutorialRouters);

app.get("/", (req, res) => {
    console.log("TEST")
    res.send("hello world")
})

app.get('/naverlogin', (req, res) => {
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + CLIENTID + '&redirect_uri=' + redirectURI + '&state=' + state;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
})

app.get("/callback", (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + CLIENTID + '&client_secret=' + CLIENTID_SECRET + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':CLIENTID, 'X-Naver-Client-Secret': CLIENTID_SECRET}
    }
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log("error=" + response.statusCode);
        }
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}!`);
});

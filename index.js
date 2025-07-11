import express from express

const app = express()
const port = 3000

app.get("/", (req, res) => {
    console.log("TEST")
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})

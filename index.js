const http = require("http");

const server = http.createServer((req, res)=>{

    if(req.url === "/"){
        res.end(`<h1>hello</h1> <h2>ayush</h2>`)
    }
})

server.listen(3000, ()=>{
    console.log("server runs");
})
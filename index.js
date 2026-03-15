const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res) =>{

    const url = req.url;
    const method = req.method;

    if(url === "/"){

        res.setHeader("Content-Type", "text/html");

        res.write(`
            <html>
            <head><title>Enter Message</title></head>

            <body>

                <form action="/message" method="POST">
                    <input type="text" name="message"/>
                    <button type="submit">add</button>
                </form>

            </body>
            </html>
        `);

        res.end();
    }

    else if(url === "/message" && method === "POST"){

        const body = [];

        req.on("data",(chunk)=>{
            body.push(chunk);
        });

        req.on("end",()=>{

            const buffer = Buffer.concat(body);

            const formData = buffer.toString();

            const message = formData.split("=")[1];

            fs.writeFile("message.txt",message,(err)=>{

                res.statusCode = 302;
                res.setHeader("Location","/");
                res.end();

            });

        });

    }

});

server.listen(3000);

console.log("server runs on http://localhost:3000");

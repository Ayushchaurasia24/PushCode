const fs = require("fs");

const requestHandler = (req, res)=>{
    const url = req.url;
    const method = req.method;

    if(url === "/"){

        fs.readFile("message.txt", (err, data)=>{

            let messages = "";

            if(data){
                messages = data.toString();
            }

            res.setHeader("Content-Type", "text/html");

            res.write(`
                <html>
                <head><title>Enter Message</title></head>

                <body>

                    <h2>Messages</h2>
                    <p>${messages}</p>

                    <form action="/message" method="POST">
                        <input type="text" name="message"/>
                        <button type="submit">add</button>
                    </form>

                </body>
                </html>
            `);

            res.end();
        });

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

            fs.appendFile("message.txt", message + "\n", (err)=>{

                res.statusCode = 302;
                res.setHeader("Location","/");
                res.end();

            });

        });

    }
};

const anotherFunction = () =>{
    console.log("another fn");
}

//method1 
exports.handler = requestHandler;

//method2
exports.testFunction = anotherFunction;
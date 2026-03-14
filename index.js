const http = require('http'); //import kara built-in http module node js se

//creating http server
//callback fn har bar request aane pr run krega
const server = http.createServer((req, res)=>{

    //setting response header jo browser ko batega ki response html hai
    res.setHeader('Content-Type', 'text/html');
    
    //check krega agr url '/' h kya? agar hn to local host pr run kr raha hoga
    if(req.url === '/'){   //200 means successful

        res.end("<h1>Hello World</h1>"); //send req to browser and finish req
    }
    else if(req.url === '/pizza'){

        res.end('<h1>Pizza</h1>');
    }
    else if(req.url === '/home'){

        res.end('<h1>Home</h1>');
    }
    else if(req.url === '/about'){

        res.end('<h1>About us</h1>');
    }
    else if(req.url === '/node'){

        res.end('<h1>node js proj</h1>');
    }
    else{
        res.statusCode = 404;

        res.end('<h1>Page Not Found :(</h1>');
    }
     

})

let port = 3000;
server.listen(port, ()=> {
    console.log("Server is runing on port 3000");
});
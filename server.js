const http = require("http");
const fs = require("fs");


const server = http.createServer((req,res)=>{

    if(req.url !== "/favicon.ico") {
        let values = req.url.split("/");
        let op ='';
        let file = '';
        let result;
        
        if(req.url.includes("add")){
            file = "add";
            result =0;
            for(let i=2;i<values.length;i++){
                op += `${values[i]} +`;
                result += parseInt(values[i])
            }
        }else if(req.url.includes("sub")){
            file = "sub";
            result = values[2];
            
            for(let i=3;i<values.length;i++){
                op += `${values[i]} -`;
                result -= parseInt(values[i])
            }
        }
        else if(req.url.includes("mul")){
            file = "mul";
            result =1;
            for(let i=2;i<values.length;i++){
                op += `${values[i]} *`;
                result *= parseInt(values[i])
            }
        }
        else if(req.url.includes("div")){
            file = "div";
            result = values[2];
            for(let i=2;i<values.length;i++){
                op += `${values[i]} /`;
                if(i != 2) 
                result /= parseInt(values[i])
            }
        }
    
    
        fs.appendFileSync(`./${file}.txt`,result.toString() + '\n')
    
        res.write(`${op.substring(0,op.length-1)} = ${result}`)
        res.end()
    }


   
});



server.listen(3000,console.log("http://localhost:3000"))
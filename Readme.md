starting project with backend 

Short Notes : 
to track the file we use the nodemon 

npm i -D nodemon 
 then ad dto the script{
    "dev" : nodemon ; 
 }
<h1>step 2 </h1>
 in scr we make the folder name mkdir

 controllers- main functionality 
 db - how the data base is connected datbase connection logic
 middlewares - interfering the response and requestion find some data in between
 models - schema 
 utils -- functionality use agin and again so like mail and more so it is work as function 
 routes -- /jokes , /more tab 


<h1>step 3 </h1>
connection data base 

copy the url as well as the password 

all logic code of the database connection will write inside the db folder weith name db.js


<h1>step 4 </h1>

make sure you use the dotenv.config before the use the function of dbLogic 

in the constants we write the dbName == you can write the name of any 
it will be shown on the data base .. 



<h1>step 5 </h1>


make sure the there is module error of js somthing like that 

  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///D:/learning%20Backend/src/db/db'
}

Node.js v22.14.0
[nodemon] app crashed - waiting for file changes before starting... 

to checkout more error you have t write the console.log(different error name to identify the part which have the error)


<h1>step 6 </h1>

to configure the cors 

const app = express()

<h3>to configure the cors use </h3>
app.use(cors({  
    origin : process.env.CORS_ORIGIN,
    credentials:true  
}))

<h3>to limit the response size from the use </h3>
app.use(express.json({limit:"16kb"}))


<h3>every space have some meaning so to decode it use the encoder </h3>
app.use(express.urlencoded({extended:true , limit :"16kb"}))


<h3>it is the middle ware where When a client sends an HTTP request with cookies, they are included in the Cookie header as a string. The cookie parser takes this string and separates the individual cookie name-value pairs.  </h3>
app.use(cookieParser()) ; 


<h2>what is the middleware </h2>
middleware is the interaction of the system in between the respose said to be middleweare they 
have 4 tupple 
(err, req ,res ,next) 
what is next -> next is the while interaction they will check the authentication , check weather it is admin or not many more thing we can check so it is the hop to htp communication while doing task it will move from onw to another 

at last they get the response  
  ->>
app.get('/insta' , (req, res)=>{
  res.send("hey i am available")
})


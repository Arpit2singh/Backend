
class ApiError extends Error{
    constructor(statusCode , message = "Something Went Wrong " , error =[] ,stack = ""  ){
        super(message) ;
        this.statusCode = statusCode ; 
        this.message = message ; 
        this.error = error ; 
        this.success = false ; 
        this.data = null ; 

    }
}

export default ApiError
class ApiResponse {
    constructor(statusCode,data,message = "Success"){
        this.statusCode = statusCode // it stores the http status code
        this.data = data // it store the main data or result you want to store
        this.success = statusCode<400
        this.message = message
    }
}
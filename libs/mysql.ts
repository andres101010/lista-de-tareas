import mysql from "serverless-mysql"

export const conn = mysql({
    config: {
        host: process.env.DB_HOST as string ,
        database : process.env.DB_NAME as string, 
        user      : process.env.DB_USER as string, 
        password : process.env.DB_PASSWORD as string ,
        port: Number(process.env.DB_PORT)
    }
})
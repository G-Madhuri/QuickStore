import mongoose from "mongoose";


export const connectDB=async()=>{
    try{
        const conn = await mongoose.connect(`mongodb+srv://gmadhuri2224:Abcd%402006@cluster0.yrbovtx.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`MongoDB connected!: ${conn.connection.host}`)
    }
    catch(error){
        console.error(`Error : ${error.message}`);
        process.exit(1); // 1 code means exit with failure , 0-success
    }
}

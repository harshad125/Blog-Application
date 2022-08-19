import mongoose from 'mongoose';
const mongoUrl="mongodb+srv://javiya_125:harshad125@cluster1.lu5bn.mongodb.net/blog?retryWrites=true&w=majority";

const contomongo=()=>{
       mongoose.connect(mongoUrl,()=>{
           console.log("successfully connected");
       }).then(console.log("yes")).catch((err)=>console.log(err))
}

//mongopassword:-c7fRrzm6ze7Yr0ON
export default contomongo;
//catches error in async routes and passes them to the global error handler middleware
module.exports= (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }
}
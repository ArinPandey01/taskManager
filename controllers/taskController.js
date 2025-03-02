
const getAllTasks=(req,res)=>{
    res.status(200).send('all tasks sent');
}

const getATask=(req,res)=>{
    res.status(200).send('a task sent');
}

const postATask=(req,res)=>{
    res.status(200).send('aa task posted');
}

const patchATask=(req,res)=>{
    res.status(200).send('a task updated');
}

const deleteATask=(req,res)=>{
    res.status(200).send('a task deleted');
}

module.exports={
    getATask,
    getAllTasks,
    postATask,
    patchATask,
    deleteATask
};
const {
    getATask,
    getAllTasks,
    postATask,
    patchATask,
    deleteATask
}=require('../controllers/taskController');
const express=require('express');
const router=express.Router();

router.route('/').get(getAllTasks).post(postATask);
router.route('/:id').get(getATask).patch(patchATask).delete(deleteATask);

module.exports=router;
import express from 'express'
import { getAllblog ,addblog,updatablog, getbyid, deleteblog, getuserbyid} from '../controllers/Blog-control';

const blogrouter=express.Router();

blogrouter.get('/',getAllblog)
blogrouter.post('/add',addblog)
blogrouter.put('/update/:id',updatablog)
blogrouter.get('/:id',getbyid)
blogrouter.delete('/:id',deleteblog)
blogrouter.get('/user/:id',getuserbyid)

export default blogrouter;
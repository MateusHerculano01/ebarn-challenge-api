import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';
import TractorController from '../controllers/TractorController';

const tractorRouter = Router();
const upload = multer(uploadConfig);

tractorRouter.use(EnsureAuthenticated);
tractorRouter.get('/', TractorController.getAllTractors);
tractorRouter.get('/my-tractors', TractorController.getTractorsByUserId);
tractorRouter.post('/new', upload.single('photo'), TractorController.createTractor);
tractorRouter.patch('/update/:tractorId', upload.single('photo'), TractorController.updateTractor);
tractorRouter.delete('/delete/:tractorId', TractorController.deleteTractor);

export default tractorRouter;

import { Router } from 'express';

const router = Router();
 
// The home page route
router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

export default router;
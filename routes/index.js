const router = ('express');
const apiRoutes = ('./api');
router.use('./api',apiRoutes);

router.use((req,res) =>{
    res.status(404).end()
});
module.exports = router;
import { Router } from "express";

const router = Router()

router.get("/:city", (req, res) => {
    const { city } = req.params;
    res.send(city)
})

router.get("/:city/forecasts", (req, res) => {
    const { city } = req.params;
    res.send(city)
})

export default router;
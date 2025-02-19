import { getNav } from "../utilities/index.js";

export default async function addNav(req,res,next) {
    res.locals.nav = await getNav();
    next();
}
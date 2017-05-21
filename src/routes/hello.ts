import {NextFunction, Request, Response, Router} from "express";

export default class HelloRoute {


    public static create(router: Router) {
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.send("hello world");
        });


    }
}
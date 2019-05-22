import { Request, Response } from 'express'

class IndexController {

    public index (req: Request, res: Response ) {
        res.send('Hola desde controlador')
    }

}

export const indexController = new IndexController()
import { Request, Response } from 'express'
import pool from '../database'

class GamesController {

    public async list (req: Request, res: Response ) {
        const games = await pool.query('select * from games')
        res.json(games)
        // res.json({text: 'Listando juegos'})
        // pool.query('desc games')
    }

    public async getOne (req: Request, res: Response){
        const {id} = req.params
        const games = await pool.query('select * from games where id = ?', [id])
        if (games.length > 0 ){
            return res.json(games[0])
        }
        // console.log(games);
        res.status(404).json({text: 'El juego no exite'})
        // res.json({text: 'Este es el juego ' + req.params.id })
    }
    
    public async create (req: Request, res: Response){ // Promise<void> esto no es necesario
        await pool.query('INSERT INTO games set ?', [req.body])
        // console.log(req.body);
        res.json({text: 'Juego guardado'})
    }
    
    public async update (req: Request, res: Response){
        const {id} = req.params
        await pool.query('update games set ? where id = ?', [req.body, id])
        res.json({message: 'Juego actualizado correctamente'})
        // res.json({text: 'Actualizando un juego ' + req.params.id})
    }
    
    public async delete (req: Request, res: Response){
        const {id} = req.params
        await pool.query('delete from games where id = ?', [id])
        res.json({message: 'El juego fue eliminado'})
    }
}

const gamesController = new GamesController()
export default gamesController

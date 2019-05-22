"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('select * from games');
            res.json(games);
            // res.json({text: 'Listando juegos'})
            // pool.query('desc games')
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('select * from games where id = ?', [id]);
            if (games.length > 0) {
                return res.json(games[0]);
            }
            // console.log(games);
            res.status(404).json({ text: 'El juego no exite' });
            // res.json({text: 'Este es el juego ' + req.params.id })
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO games set ?', [req.body]);
            // console.log(req.body);
            res.json({ text: 'Juego guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update games set ? where id = ?', [req.body, id]);
            res.json({ message: 'Juego actualizado correctamente' });
            // res.json({text: 'Actualizando un juego ' + req.params.id})
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('delete from games where id = ?', [id]);
            res.json({ message: 'El juego fue eliminado' });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;

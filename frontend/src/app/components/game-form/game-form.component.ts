import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/games';
import { GamesService } from 'src/app/services/games.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  // importar el modelo o interfase
  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  // Si el formulario esta en falso significa que es para guardar datos
  // si esta en verdadero es para editar datos
  edit: boolean = false;

  // importar el servicio y crear evento click

  constructor( private _gs: GamesService, 
                private router: Router,
                private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    // validacion de la ruta para el edit
    const PARAMS = this.activatedRoute.snapshot.params;
    // console.log(PARAMS);
    if ( PARAMS.id ){
      this._gs.getGame(PARAMS.id)
        .subscribe(
          res => { 
            console.log(res);
            this.game = res;
            this.edit = true;
          },
          err => console.error(err)
        );
    }
  }

  // crear metodo save new game
  // en app.module importar FormModule 
  // y enlasar el ngModel con el objeto game
  saveNewGame(){
    console.log(this.game);
    // Se elimina el id y el created at
    // porque esto lo hace mysql, si no da error en el servidor
    delete  this.game.created_at;
    delete this.game.id;

    // Se llama al servicio, al metodor y al modelo
    // para redireccionar luego de gaurdar se importa el router
    this._gs.saveGame(this.game)
      .subscribe(
        res => {
          console.log(res);
          // Redireccion al momento de guardar
          this.router.navigate(['/games']);
        },
        err => console.error(err)
      );
  }

  updateGame(){
    // console.log(this.game);
    delete this.game.created_at;
    this._gs.updateGame(this.game.id, this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/games']);
        },
        err => console.error(err)
      );
  }
}

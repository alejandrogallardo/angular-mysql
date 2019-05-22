import { Component, OnInit, HostBinding } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  games: any = [];

  constructor( private gameService: GamesService ) { }

  ngOnInit() {
    this.getGames();
  }


  getGames(){
    this.gameService.getGames()
    .subscribe(
      // res => console.log(res),
      res => {
        this.games = res;
      },
      err => console.error(err)
    );
    console.log('Vamos bien 🍺');
  }

  deleteGame(id: string){
    this.gameService.deleteGame(id)
      .subscribe(
        res => {
          console.log(res);
          this.getGames();
        },
        err => console.error(err)
      );
  }

  // Este metodo no es necesario ya que se va a redireccionar desde el boton edit
  // editGame(id: string){
  //   console.log(id);
  // }
}

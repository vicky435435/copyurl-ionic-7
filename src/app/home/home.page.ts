import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentUrl: string = '';
  constructor(private platform: Platform, private router: Router,  private toastController: ToastController) {}


  ngOnInit() {
    // Initialize the current URL when the component is loaded
    this.currentUrl = window.location.href;
  }

  async copyUrl() {
    try {
      if (this.platform.is('hybrid')) {
        await Clipboard.write({
          string: this.currentUrl
        });
      } else {
        // Web implementation
        await navigator.clipboard.writeText(this.currentUrl);
      }
      this.presentToast('URL copied to clipboard!');
    } catch (err) {
      console.error('Could not copy text: ', err);
      this.presentToast('Failed to copy URL.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }



  // board: string[][] = [
  //   ['', '', ''],
  //   ['', '', ''],
  //   ['', '', '']
  // ];
  // currentPlayer: 'X' | 'O' = 'X';
  // toastOpen: boolean = false;
  // toastMessage: string = '';

  // constructor(private toastController: ToastController) {}

  // // ngOnInit() {}

  // makeMove(row: number, col: number) {
  //   if (this.board[row][col] === '') {
  //     this.board[row][col] = this.currentPlayer;
  //     if (this.checkWin()) {
  //       this.presentToast(`Player ${this.currentPlayer} wins!`);
  //       this.resetBoard();
  //     } else if (this.checkDraw()) {
  //       this.presentToast('Draw!');
  //       this.resetBoard();
  //     } else {
  //       this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  //     }
  //   }
  // }

  // checkWin(): boolean {
  //   const lines = [
  //     // Rows
  //     [this.board[0][0], this.board[0][1], this.board[0][2]],
  //     [this.board[1][0], this.board[1][1], this.board[1][2]],
  //     [this.board[2][0], this.board[2][1], this.board[2][2]],
  //     // Columns
  //     [this.board[0][0], this.board[1][0], this.board[2][0]],
  //     [this.board[0][1], this.board[1][1], this.board[2][1]],
  //     [this.board[0][2], this.board[1][2], this.board[2][2]],
  //     // Diagonals
  //     [this.board[0][0], this.board[1][1], this.board[2][2]],
  //     [this.board[0][2], this.board[1][1], this.board[2][0]]
  //   ];

  //   return lines.some(line => line.every(cell => cell === this.currentPlayer));
  // }

  // checkDraw(): boolean {
  //   return this.board.every(row => row.every(cell => cell !== ''));
  // }

  // resetBoard() {
  //   this.board = [
  //     ['', '', ''],
  //     ['', '', ''],
  //     ['', '', '']
  //   ];
  // }

  // resetGame() {
  //   this.resetBoard();
  //   this.currentPlayer = 'X';
  // }

  // async presentToast(message: string) {
  //   this.toastMessage = message;
  //   this.toastOpen = true;
  //   setTimeout(() => {
  //     this.toastOpen = false;
  //   }, 2000);
  // }

}

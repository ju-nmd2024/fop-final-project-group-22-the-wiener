// function platform() {
//     fill(0, 100, 0);
//     rect(this.platformX + 400, this.platformY + 450, 100, 20, 20);
//     rect(this.platformX + 500, this.platformY + 400, 100, 20, 20);
//     rect(this.platformX + 600, this.platformY + 350, 100, 20, 20);
//     rect(this.platformX + 800, this.platformY + 450, 100, 20, 20);
//     rect(this.platformX + 900, this.platformY + 400, 100, 20, 20);
//     rect(this.platformX + 1000, this.platformY + 450, 100, 20, 20);
//     rect(this.platformX + 1300, this.platformY + 350, 100, 20, 20);
//     rect(this.platformX + 1500, this.platformY + 450, 100, 20, 20);
//     rect(this.platformX + 1600, this.platformY + 400, 100, 20, 20);
//     rect(this.platformX + 1700, this.platformY + 350, 100, 20, 20);
//     rect(this.platformX + 1800, this.platformY + 300, 100, 20, 20);
//     rect(this.platformX + 1900, this.platformY + 400, 100, 20, 20);
//   }

   

    class Platform{
        constructor(){
            this.platformX = 10;
            this.platformY= 10;
        }
        show(){
            fill(0, 100, 0);
    rect(this.platformX + 400, this.platformY + 450, 100, 20, 20);
    rect(this.platformX + 500, this.platformY + 400, 100, 20, 20);
    rect(this.platformX + 600, this.platformY + 350, 100, 20, 20);
    rect(this.platformX + 800, this.platformY + 450, 100, 20, 20);
    rect(this.platformX + 900, this.platformY + 400, 100, 20, 20);
    rect(this.platformX + 1000, this.platformY + 450, 100, 20, 20);
    rect(this.platformX + 1300, this.platformY + 350, 100, 20, 20);
    rect(this.platformX + 1500, this.platformY + 450, 100, 20, 20);
    rect(this.platformX + 1600, this.platformY + 400, 100, 20, 20);
    rect(this.platformX + 1700, this.platformY + 350, 100, 20, 20);
    rect(this.platformX + 1800, this.platformY + 300, 100, 20, 20);
    rect(this.platformX + 1900, this.platformY + 400, 100, 20, 20);
        }

        movement(){
             //platform moves in the x direction
    this.platformX = this.platformX - 2;
    //reset the x value of the platform to 885, which is the width of the canvas so that it starts from the far right
    if (this.platformX < -2000) {
      this.platformX = width;
    }
        }
    }
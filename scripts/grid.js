
class Grid{

    constructor(){
        this.col = Math.round(window.innerWidth/12);
        this.row = this.col/2;
        let M = [];
        let tM = [];
        for (let i = 0; i < this.row; i++) {
            M.push(new Array(this.col).fill(0));
            tM.push(new Array(this.col).fill(0));
        }
        
        this.matrix = M;
        this.tempMatrix = tM;

        this.image = [];
        this.image[0] = (x,y)=>{return [[x,y],[x+1,y-1],[x+2,y-1],[x+3,y-1],[x+3,y],[x+3,y+1],[x+3,y+2],[x,y+3],[x+2,y+3],]}// nave
        this.image[1] = (x,y)=>{return [[x,y],[x,y+1],[x,y+2],[x+1,y],[x+2,y+1],]} // planador         
        this.image[2] = (x,y)=>{return [[x,y],[x+2,y-1],[x+2,y],[x+1,y+2],[x+2,y+3],[x+2,y+4],[x+2,y+5],]} // acorn
        this.image[3] = (x,y)=>{return [[x,y-1],[x,y],[x+1,y-1],[x+1,y+1],[x+2,y]]} // bote
        this.image[4] = (x,y)=>{return [[x,y-1],[x,y],[x,y+1],[x-1,y],[x-1,y+1],[x-1,y+2]]} // acorn
        this.image[5] = (x,y)=>{return [[x,y-1],[x,y],[x,y+1]]} // piscador
        this.image[6] = (x,y)=>{return [[x,y],[x+1,y-6],[x+1,y-5],[x+2,y-5],[x+2,y-1],[x+2,y],[x+2,y+1],]} // diehard

        for(var i = 0; i < Math.floor(Math.random() * (10-3)+3); i++){
            this.setInit(this.image[Math.floor(Math.random()*7)](Math.floor(Math.random()*100000)%this.row,Math.floor(Math.random()*100000)%this.col));
        }
    }

    getMatrix(){
        return this.matrix;
    }

    getRow(){
        return this.row;
    }
    getCol(){
        return this.col;
    }

    // ===================  POSICÃO DAS CELULAS =====================
    getNeighborsPosition(x, y, gradeLimitada=true){

        let orientacoes = {
            direita: [x,y+1],
            esquerda: [x,y-1],
            superior: [x-1,y],
            inferior: [x+1,y],
            superiorEsquerda: [x-1,y-1],
            superiorDireita: [x-1,y+1],
            inferiorEsquerda: [x+1,y-1],
            inferiorDireita: [x+1,y+1]
        }

        const arrayOrientacoes = [];
        for (const chave in orientacoes) {
            let i = orientacoes[chave][0];
            let j = orientacoes[chave][1];
            
            if (gradeLimitada==false) {
                if (i > this.row-1) {
                    i = 0;
                }
                if (i < 0) {
                    i = this.row-1
                }
                if (j > this.col-1) {
                    j = 0;
                }
                if (j < 0) {
                    j = this.col-1
                } 
            }
        
            arrayOrientacoes.push([i,j])
        }
        return arrayOrientacoes;

    }


    // ================= CONTAGEM DAS CÉLULAS ==========================
    livingCellsAround(x, y){          
        let celulasVisinhas = this.getNeighborsPosition(x,y,false);
        let contador = 0;

        celulasVisinhas.forEach(celula => {
            
            let i = celula[0];
            let j = celula[1];
            if (this.matrix[i] != undefined) {
                if (this.matrix[i][j]==1) {
                    contador += 1;
                }
            }
        });
        return contador;
    }

    // ================= matrix DE CÉLULAS ==========================

    setCellState(x, y,state){
        this.tempMatrix[x][y] += state;
        return this.tempMatrix[x][y];
    }

    getCellState(x,y){
        return this.tempMatrix[x][y];
    }

    itsAlive(x, y){
        return this.tempMatrix[x][y] > 0;
    }

    setTemp(){
        for(let i = 0; i < this.matrix.length; i++){
            for(let j = 0; j < this.matrix[0].length; j++){
                this.tempMatrix[i][j] = this.matrix[i][j];
            }
        }
    }

    setMatrix(){
        for(let i = 0; i < this.matrix.length; i++){
            for(let j = 0; j < this.matrix[0].length; j++){
                this.matrix[i][j] = this.tempMatrix[i][j];
            }
        }
    }

    setInit(posicoes){
        posicoes.forEach(posicao=>{
            let i = posicao[0];
            let j = posicao[1];
            //console.log(i,j);
            if(i >=0 && i < this.matrix.length && j >=0 && j < this.matrix[0].length){
                this.matrix[Math.floor(i)][Math.floor(j)] = 1;
            }
        })
    }
}
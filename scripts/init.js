class gameOfLife{

    constructor(){
        this.money = 0;
        this.moneyBkp = this.money;
        this.lvl = 4;
        this.newMatrix(this.lvl,this.lvl);
        this.initGrid(this.matrix.getMatrix());
        this.moneyShow();

        document.getElementById('newGeneration').addEventListener("click",()=>{this.jogoDaVida(this.matrix)});
        document.getElementById('btnRestart').addEventListener("click",()=>{this.reset()});
        document.getElementById('btnNext').addEventListener("click",()=>{if(this.money>=this.lvl*2){this.nextLevel()}});
    }

    reset(){
        this.money = this.moneyBkp;
        this.newMatrix(this.lvl,this.lvl);
        this.initGrid(this.matrix.getMatrix());
        $('#btnNext').addClass('disabled');
        this.moneyShow();
    }

    nextLevel(){
        if(this.money < this.lvl*2) return;
        this.lvl++;
        this.newMatrix(this.lvl,this.lvl);
        this.initGrid(this.matrix.getMatrix());
        this.money -= this.lvl*2;
        this.moneyBkp = this.money;
        this.moneyShow();
    }

    newMatrix(x,y){
        this.matrix = new Grid(x,y);
    }

    moneyUpdate(val){
        this.money += val;
        this.moneyShow();
    }

    moneyShow(){
        document.getElementById('showMoney').textContent = this.money;
    }

    initGrid(matriz){
        const table = document.getElementById("grade")
        let linhas = ""
        for (let i = 0; i < matriz.length; i++) {     
            let colunas = ""
            for (let j = 0; j < matriz[0].length; j++) {
                colunas += "<td onclick='getStatus(this)' class='bg-secondary' ></td>";
            }
            linhas += "<tr>"  + colunas + "</tr>"  
        }
        table.innerHTML = linhas
    } 

    getStatus(self){
        var col = $(self).index();
        var row = $(self).parent().index();
        console.log(row,col,$(self).css('background-color'));
        console.log(matrix.getCellState(row,col),matrix.livingCellsAround(row,col));
    }

    cellFind(x,y){
        let table = document.getElementById("grade")
        let tbody = table.getElementsByTagName("tbody").item(0)
        let linhas = tbody.getElementsByTagName("tr");
        let linha = linhas.item(x);
        let colunas = linha.getElementsByTagName("td");
        let celula = colunas.item(y)
        return celula
    }

    setState(x, y, state){
        let celula = this.cellFind(x,y);
        celula.style.backgroundColor = (state == 0)?"white":"#"+(state*2000000).toString(16).padStart(6,'0');
        celula.classList.remove("bg-secondary");
    }

    // ================= JOGO DA VIDA ==========================

    jogoDaVida(matrix){
        let numeroDeLinhas = matrix.getRow();
        let numeroDeColunas = matrix.getCol();
        this.matrix.setTemp();
        for (let i = 0; i < numeroDeLinhas; i++) {
            for (let j = 0; j < numeroDeColunas; j++) {
                let neighborsAlive = matrix.livingCellsAround(i,j);

                /* Regras do jogo da vida:
                Toda célula morta com exatamente três vizinhos vivos torna-se viva (nascimento).
                Toda célula viva com menos de dois vizinhos vivos morre por isolamento.
                Toda célula viva com mais de três vizinhos vivos morre por superpopulação.
                Toda célula viva com dois ou três vizinhos vivos permanece viva. */

                if (matrix.itsAlive(i,j) == false) {
                    if (neighborsAlive == 3) {
                        if(matrix.isNew(i,j)){
                            this.moneyUpdate(1);
                        }
                        this.setState(i,j,matrix.setCellState(i,j,+1));
                    }
                }else {
                    if (neighborsAlive < 2 || neighborsAlive > 3) {
                        this.setState(i,j,matrix.setCellState(i,j,-1));
                    } 
                }
        
            } 
        }

        this.matrix.setMatrix();

        if(this.money >= this.lvl*2){
            $('#btnNext').removeClass('disabled');
        }
    }
}

new gameOfLife();
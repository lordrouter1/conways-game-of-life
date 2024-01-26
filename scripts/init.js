console.log("==================Jogo da Vida=====================")

// ================= GRADE NO HTML ==========================

function criarGradeNoHTML(matriz){
    const table = document.getElementById("grade")
    let linhas = ""
    for (let i = 0; i < matriz.length; i++) {     
        let colunas = ""
        for (let j = 0; j < matriz[0].length; j++) {
            if (matriz[i][j] == 1) {
                colunas += "<td onclick='getStatus(this)'> </td>"      
            }else{ 
                colunas += "<td onclick='getStatus(this)'> </td>"   
            }
        }
        linhas += "<tr>"  + colunas + "</tr>"  
    }
    table.innerHTML = linhas
} 

function getStatus(self){
    var col = $(self).index();
    var row = $(self).parent().index();
    console.log(row,col,$(self).css('background-color'));
    console.log(matrix.getCellState(row,col),matrix.livingCellsAround(row,col));
}

function buscarCelulaNoHTML(x,y){
    let table = document.getElementById("grade")
    let tbody = table.getElementsByTagName("tbody").item(0)
    let linhas = tbody.getElementsByTagName("tr");
    let linha = linhas.item(x);
    let colunas = linha.getElementsByTagName("td");
    let celula = colunas.item(y)
    return celula
}

function adicionarCorCelula(x, y, state){
    let celula = buscarCelulaNoHTML(x,y);
    celula.style.backgroundColor = "#"+(state*2000000).toString(16);
    //celula.classList.add("bg-black");
}

function removerCorCelular(x, y, state){
    let celula = buscarCelulaNoHTML(x,y);
    //console.log(state,"#"+(state*2000000).toString(16));
    celula.style.backgroundColor = "#"+(state*2000000).toString(16);
    //celula.classList.remove("bg-black");
}

// ================= JOGO DA VIDA ==========================

function jogoDaVida(matrix){
    let numeroDeLinhas = matrix.getRow();
    let numeroDeColunas = matrix.getCol();
    let tempMatrix = matrix;
    for (let i = 0; i < numeroDeLinhas; i++) {
        for (let j = 0; j < numeroDeColunas; j++) {
            let neighborsAlive = matrix.livingCellsAround(i,j);

            /* Regras do jogo da vida:
            Toda célula morta com exatamente três vizinhos vivos torna-se viva (nascimento).
            Toda célula viva com menos de dois vizinhos vivos morre por isolamento.
            Toda célula viva com mais de três vizinhos vivos morre por superpopulação.
            Toda célula viva com dois ou três vizinhos vivos permanece viva. */

           //novaMatriz[i][j] = matriz[i][j]
            if (matrix.itsAlive(i,j) == false) {
                if (neighborsAlive == 3) {
                    adicionarCorCelula(i,j,tempMatrix.setCellState(i,j,+1));
                }
            }else {
                if (neighborsAlive < 2 || neighborsAlive > 3) {
                    removerCorCelular(i,j,tempMatrix.setCellState(i,j,-1));
                } 
            }
       
        } 
    }

    matrix = tempMatrix;
   
}

// ================= INICIAR JOGO ==========================
var matrix = new Grid();
function run(loop=true){
    criarGradeNoHTML(matrix.getMatrix());

    if(loop){
        setInterval(jogoDaVida, 200, matrix)
    }

}

run(false);

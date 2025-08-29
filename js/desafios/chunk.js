function recursiveChunks(num) {
    if (num === 0) {
          return ""
      }
  
    if (num === 1){ 
          return "chunk"
      } else{
          return "chunk-" + recursiveChunks(num - 1)
      }
}
function recursiveChunks(num) {
    if (num === 0) return ""
    return num === 1 ? "chunk" : "chunk-" + recursiveChunks(num - 1) 
  }//operador ternario-teste?true:false
   // media>=7.0?'aprovado':'reprovado'
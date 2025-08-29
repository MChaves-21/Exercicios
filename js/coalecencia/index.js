let a = 0

let b = a || 42//verifica valores que sao conversiveis para falso

console.log({ a, b })

b = a ?? 42//se a tem algum conteudo b=a,se a nao tiver conteudo b=42

console.log({a, b})

let c = false ?? 42//se tem algum conteudo a esquerda da ??,c=este conteudo,se a nao tiver,se for null ou udefined,c=42

console.log({c})
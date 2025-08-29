function verificar() {
    var data = new Date()
    var ano = data.getFullYear()
    var fano = document.getElementById('txtano')
    var res = document.querySelector('div#res')
    if (fano.value.length === 0 || Number(fano.value) >ano){
        window.alert('[ERRO] Verifique os dados e tente novamente')
    }
    else {
        var fsex = document.getElementsByName('radsex')
        var idade = ano - fano.value
        var genero = ''
        var img = document.createElement('img')
        img.setAttribute('id', 'foto')
    if (fsex[0].checked) {
            genero = 'Homen'
            if (idade >= 0 && idade < 6) {
                img.setAttribute('src', 'hbb.jpg')
            }
            else if (idade < 16) {
                img.setAttribute('src', 'hj.jpg')
            }
             else if (idade < 50) {
            img.setAttribute('src', 'ha.jpg')
            }
            else {
            img.setAttribute('src', 'hv.jpg')
            }
        }
    else if(fsex[1].checked){
        genero = 'Mulher'
        if (idade >= 0 && idade < 6) {
            img.setAttribute('src', 'mbb.jpg')
        }
        else if (idade < 16) {
            img.setAttribute('src', 'mj.jpg')
        }
         else if (idade < 50) {
        img.setAttribute('src', 'ma.jpg')
        }
        else {
        img.setAttribute('src', 'mv.jpg')
        }
    }
    res.style.textAlign = 'center'
    res.innerHTML = `Detctamos ${genero} com ${idade} anos.`
    document.body.style.background ='red'
    img.style.height ='250px'
    img.style.width ='250px'
    img.style.borderRadius ='50%'
    res.appendChild(img)
    }
    }



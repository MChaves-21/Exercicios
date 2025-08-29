function highestLetter(str) {
    const sortedLetters = str.toLowerCase().split('').sort()//o split ira dividir os arrays em varios caracteres
    return sortedLetters[sortedLetters.length - 1]
  }
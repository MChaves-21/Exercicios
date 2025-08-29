function imutableReverse(arr) {
    const reversedArray = []
  
    for (let i = 0; i < arr.length; i++) {
      reversedArray[i] = arr[arr.length - i -1]
    }
  
    return reversedArray
  }
  console.log(imutableReverse('murilo'))
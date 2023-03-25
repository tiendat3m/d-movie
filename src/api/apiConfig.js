const apiConfig = {
    baseUrl:'http://api.themoviedb.org/3/',
    apiKey:'724909abfd096f0c0e8a0a701b6f1358',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,

}


export default apiConfig;
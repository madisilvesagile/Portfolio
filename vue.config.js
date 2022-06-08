module.exports = {
    css: {
        loaderOptions: {
          scss: {
            additionalData: 
              `
              @import "./src/styles/main.scss";
              `
          },
        }
    }
};
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
    },
    publicPath: process.env.NODE_ENV === "production" ? "/Portfolio/" : "/",
};
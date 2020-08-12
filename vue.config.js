module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/YANTUSP/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
};

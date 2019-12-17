const notFound = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page not Found' })
}

module.exports = {
  notFound
}
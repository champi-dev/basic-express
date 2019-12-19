const notFound = (req, res) => {
  res.status(404).render('404', { pageTitle: 'Page not Found' })
}

module.exports = {
  notFound
}
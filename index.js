const { google } = require('googleapis')
const sheets = google.sheets('v4')

module.exports = function (key) {
  return function (req, res, next) {
    var spreadsheetId = req.params.id

    sheets.spreadsheets.values.get({
      spreadsheetId,
      key,
      range: 'A1:Z1000'
    })
      .then(response => {
        const values = response.data.values
        const keys = values.shift()

        const json = values.map(value => {
          var o = {}
          value.forEach((v, i) => {
            o[keys[i]] = v
          })
          return o
        })

        res.json(json)
      })
      .catch(err => {
        res.status(err.code).json(err.errors)
      })
  }
}

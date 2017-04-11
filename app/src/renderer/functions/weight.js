export default {
  getWeights(params) {
    var weight = require('../db/models/weight')
    var weight_extended = require('../db/models/weight_extended')
    weight.hasMany(weight_extended)
    return weight.findAll({
      include: weight_extended,
      order: "weight.id DESC"
    }).then((result) => {
      var list = result.map((o) => {
        var obj = o.toJSON()
        obj.weight_extendeds.forEach((w) => {
          obj[w.key] = w.value
        })
        return obj
      })
      return list
    })
  },
  submitWeight(obj) {
    var weight = require('../db/models/weight')
    return Promise.resolve().then(() => {
      if (obj.id) {
        return weight.upsert(obj).then(() => {
          return obj.id
        })
      } else {
        obj.id = undefined
        return weight.create(obj).then((result) => {
          return result.id
        })
      }
    })
  }
}

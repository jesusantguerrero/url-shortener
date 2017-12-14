module.exports = class dateHelper {
  constructor(date) {
    this.date = date
    return this.transform()
  }
  
  transform() {
    const newDate = new Date(this.date)
    const naturalDate = (newDate) ? newDate.toDateString(): null
    const unixTime = (newDate) ? newDate.UTC() : null
    return {
      "unix": unixTime ,
      "natural": naturalDate 
    }
  }
}
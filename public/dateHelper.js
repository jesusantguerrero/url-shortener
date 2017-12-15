module.exports = class dateHelper {
  constructor(date) {
    this.date = date
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return this.transform()
  }
  
  transform() {
    const isUnixTime = (this.FromUnixTime(this.date))
    const date = (isUnixTime) ? this.FromUnixTime(this.date) : this.date
    
    const newDate = new Date(date)
    const naturalDate = this.naturalFormat(newDate)
    const unixTime = (isUnixTime) ? Number(this.date) : this.toUnixTime(this.date)

    return {
      "unix": unixTime ,
      "natural": naturalDate 
    }
  }

  naturalFormat(date) {
    const month = date.getMonth()
    if (!isNaN(Number(month))) {
      return `${this.months[month]} ${date.getDate()}, ${date.getFullYear()}`
    }
    return null
  }

  FromUnixTime(date) {
    let unixTime
    try{
      unixTime = date * 1000
    } catch(e) {
      unixTime = null
    }
    return unixTime;
  }

  toUnixTime(date) {
    return new Date(date).getTime() / 1000
  }
}
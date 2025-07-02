import affirmationsData from '@/services/mockData/affirmations.json'

class AffirmationService {
  constructor() {
    this.affirmations = [...affirmationsData]
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.affirmations]
  }

  async getById(id) {
    await this.delay()
    return this.affirmations.find(affirmation => affirmation.Id === parseInt(id))
  }

async getTodayAffirmation() {
    await this.delay()
    // Get today's date and use it to select a consistent affirmation for the day
    const today = new Date()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
    const index = dayOfYear % this.affirmations.length
    return { ...this.affirmations[index] }
  }

  async getByDate(date) {
    await this.delay()
    // Get affirmation for specific date using same logic as getTodayAffirmation
    const targetDate = new Date(date)
    const dayOfYear = Math.floor((targetDate - new Date(targetDate.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
    const index = dayOfYear % this.affirmations.length
    return { ...this.affirmations[index] }
  }

  async getDateRange(startDate, endDate) {
    await this.delay()
    const results = []
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
      const index = dayOfYear % this.affirmations.length
      results.push({
        date: new Date(date).toISOString().split('T')[0],
        affirmation: { ...this.affirmations[index] }
      })
    }
    
    return results
  }

  async create(affirmation) {
    await this.delay()
    const maxId = Math.max(...this.affirmations.map(a => a.Id), 0)
    const newAffirmation = {
      ...affirmation,
      Id: maxId + 1
    }
    this.affirmations.push(newAffirmation)
    return { ...newAffirmation }
  }

  async update(id, updatedData) {
    await this.delay()
    const index = this.affirmations.findIndex(affirmation => affirmation.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Affirmation not found')
    }
    this.affirmations[index] = { ...this.affirmations[index], ...updatedData }
    return { ...this.affirmations[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.affirmations.findIndex(affirmation => affirmation.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Affirmation not found')
    }
    const deleted = this.affirmations.splice(index, 1)
    return deleted[0]
  }
}

export const affirmationService = new AffirmationService()
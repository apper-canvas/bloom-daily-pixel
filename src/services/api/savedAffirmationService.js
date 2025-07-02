import savedAffirmationsData from '@/services/mockData/savedAffirmations.json'

class SavedAffirmationService {
  constructor() {
    // Load from localStorage if available, otherwise use default data
    const savedData = localStorage.getItem('bloomDaily_savedAffirmations')
    this.savedAffirmations = savedData ? JSON.parse(savedData) : [...savedAffirmationsData]
  }

  // Save to localStorage
  persist() {
    localStorage.setItem('bloomDaily_savedAffirmations', JSON.stringify(this.savedAffirmations))
  }

  // Simulate API delay
  delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.savedAffirmations]
  }

  async getById(id) {
    await this.delay()
    return this.savedAffirmations.find(saved => saved.Id === parseInt(id))
  }

  async getByAffirmationId(affirmationId) {
    await this.delay()
    return this.savedAffirmations.find(saved => saved.affirmationId === parseInt(affirmationId))
  }

  async create(savedAffirmation) {
    await this.delay()
    const maxId = Math.max(...this.savedAffirmations.map(s => s.Id), 0)
    const newSavedAffirmation = {
      Id: maxId + 1,
      affirmationId: parseInt(savedAffirmation.affirmationId),
      savedAt: savedAffirmation.savedAt || new Date().toISOString(),
      notes: savedAffirmation.notes || ''
    }
    this.savedAffirmations.push(newSavedAffirmation)
    this.persist()
    return { ...newSavedAffirmation }
  }

  async update(id, updatedData) {
    await this.delay()
    const index = this.savedAffirmations.findIndex(saved => saved.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Saved affirmation not found')
    }
    this.savedAffirmations[index] = { ...this.savedAffirmations[index], ...updatedData }
    this.persist()
    return { ...this.savedAffirmations[index] }
  }

  async delete(affirmationId) {
    await this.delay()
    const index = this.savedAffirmations.findIndex(saved => saved.affirmationId === parseInt(affirmationId))
    if (index === -1) {
      throw new Error('Saved affirmation not found')
    }
    const deleted = this.savedAffirmations.splice(index, 1)
    this.persist()
    return deleted[0]
  }
}

export const savedAffirmationService = new SavedAffirmationService()
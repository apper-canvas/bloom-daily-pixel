import affirmationsData from "@/services/mockData/affirmations.json";

// Utility function to simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

class AffirmationService {
  constructor() {
    this.affirmations = [...affirmationsData];
  }

  async getAll() {
    await delay();
    return [...this.affirmations];
  }

  // Alias for backward compatibility
  async getAllAffirmations() {
    return this.getAll();
  }

  async getById(id) {
    await delay();
    return this.affirmations.find(affirmation => affirmation.id === id);
  }

  async getTodayAffirmation() {
    await delay();
    const randomIndex = Math.floor(Math.random() * this.affirmations.length);
    return this.affirmations[randomIndex];
  }

  async getByDate(date) {
    await delay();
    // For demo purposes, return random affirmations for any date
    // In a real app, you'd filter by actual date
    const randomAffirmations = [...this.affirmations]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return randomAffirmations;
  }

  async getDateRange(startDate, endDate) {
    await delay();
    // For demo purposes, return some affirmations
    return this.affirmations.slice(0, 10);
  }

  async create(affirmation) {
    await delay();
    const newAffirmation = {
      ...affirmation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    this.affirmations.push(newAffirmation);
    return newAffirmation;
  }

  async update(id, updatedData) {
    await delay();
    const index = this.affirmations.findIndex(affirmation => affirmation.id === id);
    if (index !== -1) {
      this.affirmations[index] = { ...this.affirmations[index], ...updatedData };
      return this.affirmations[index];
    }
    throw new Error('Affirmation not found');
  }

  async delete(id) {
    await delay();
    const index = this.affirmations.findIndex(affirmation => affirmation.id === id);
    if (index !== -1) {
      const deleted = this.affirmations.splice(index, 1)[0];
      return deleted;
    }
    throw new Error('Affirmation not found');
  }
}

export const affirmationService = new AffirmationService();
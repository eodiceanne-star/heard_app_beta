// Open Peeps Image Management
// This file provides easy access to all Open Peeps illustrations

// Cool Kids Characters
export const coolKidsImages = {
  // Main page illustrations
  plant: '/src/assets/images/openpeeps/plants/cool-kids-plant.png',
  calendar: '/src/assets/images/openpeeps/patterns/cool-kids-calendar.png',
  messages: '/src/assets/images/openpeeps/patterns/cool-kids-messages.png',
  onWheels: '/src/assets/images/openpeeps/coolkids/cool-kids-on-wheels.png',
  notebook: '/src/assets/images/openpeeps/patterns/cool-kids-notebook.png',
  handsContact: '/src/assets/images/openpeeps/patterns/hands-contact.png',
  
  // Additional characters for avatar selection
  sitting: '/src/assets/images/openpeeps/coolkids/cool-kids-sitting.png',
  standing: '/src/assets/images/openpeeps/coolkids/cool-kids-standing.png',
  stayingHome: '/src/assets/images/openpeeps/coolkids/cool-kids-staying-home.png',
  feedback: '/src/assets/images/openpeeps/coolkids/cool-kids-feedback.png',
  ridingAround: '/src/assets/images/openpeeps/patterns/cool-kids-riding-around.png',
  coffeeMug: '/src/assets/images/openpeeps/patterns/cool-kids-coffee-mug.png',
  notes: '/src/assets/images/openpeeps/patterns/cool-kids-notes.png',
  wateringPlants: '/src/assets/images/openpeeps/plants/cool-kids-watering-plants.png'
}

// Plant Illustrations
export const plantImages = {
  decorativePlant: '/src/assets/images/openpeeps/plants/cool-kids-plant.png',
  wateringPlants: '/src/assets/images/openpeeps/plants/cool-kids-watering-plants.png'
}

// Background Patterns
export const patternImages = {
  wavePattern: '/src/assets/images/openpeeps/patterns/wave-pattern.png',
  dotPattern: '/src/assets/images/openpeeps/patterns/dot-pattern.png',
  sageDots: '/src/assets/images/openpeeps/patterns/sage-dots.png',
  pinkWaves: '/src/assets/images/openpeeps/patterns/pink-waves.png'
}

// All images combined
export const allOpenPeepsImages = {
  ...coolKidsImages,
  ...plantImages,
  ...patternImages
}

// Avatar selection options for profile page
export const avatarOptions = [
  { id: 'plant', src: coolKidsImages.plant, name: 'Plant Lover' },
  { id: 'sitting', src: coolKidsImages.sitting, name: 'Sitting' },
  { id: 'standing', src: coolKidsImages.standing, name: 'Standing' },
  { id: 'stayingHome', src: coolKidsImages.stayingHome, name: 'Staying Home' },
  { id: 'feedback', src: coolKidsImages.feedback, name: 'Feedback' },
  { id: 'ridingAround', src: coolKidsImages.ridingAround, name: 'Riding Around' },
  { id: 'coffeeMug', src: coolKidsImages.coffeeMug, name: 'Coffee Mug' },
  { id: 'notes', src: coolKidsImages.notes, name: 'Notes' },
  { id: 'wateringPlants', src: coolKidsImages.wateringPlants, name: 'Watering Plants' },
  { id: 'handsContact', src: coolKidsImages.handsContact, name: 'Hands Contact' }
]

// Helper function to get image by type
export const getImageByType = (type: string): string => {
  const imageMap: { [key: string]: string } = {
    // Page-specific illustrations
    'home-plant': coolKidsImages.plant,
    'calendar': coolKidsImages.calendar,
    'forum-messages': coolKidsImages.messages,
    'doctor-wheels': coolKidsImages.onWheels,
    'symptom-notebook': coolKidsImages.notebook,
    'profile-default': coolKidsImages.handsContact,
    
    // Legacy mappings for existing components
    'forum-discussion': coolKidsImages.messages,
    'profile-portrait': coolKidsImages.handsContact,
    'doctor-helpful': coolKidsImages.onWheels,
    'music-listening': coolKidsImages.coffeeMug,
    'reading-book': coolKidsImages.notebook,
    'appointment-prep': coolKidsImages.notes,
    'symptom-tracker': coolKidsImages.notebook,
    'resource-library': coolKidsImages.plant,
    'group-support': coolKidsImages.plant,
    'plant-decorative': plantImages.decorativePlant,
    'wave-pattern': patternImages.wavePattern,
    'dot-pattern': patternImages.dotPattern
  }
  
  return imageMap[type] || coolKidsImages.plant
}

// Helper function to get avatar by ID
export const getAvatarById = (id: string): string => {
  const avatar = avatarOptions.find(option => option.id === id)
  return avatar ? avatar.src : coolKidsImages.handsContact
}

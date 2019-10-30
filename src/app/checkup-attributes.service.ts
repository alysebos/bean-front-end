import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckupAttributesService {

  getAttributes (checkup) {
    let recordedAttributes = [];
    let allAttributes = Object.keys(checkup);
    for (let i = 0; i < allAttributes.length; i++) {
      if (allAttributes[i] === '_id' || 
        allAttributes[i] === 'date' || 
        allAttributes[i] === 'vet' || 
        allAttributes[i] === 'pet' || 
        allAttributes[i] === 'weight' || 
        allAttributes[i] === 'owner' || 
        allAttributes[i] === '__v') {
      }
      else if (checkup[allAttributes[i]].length > 0) {
        recordedAttributes.push(allAttributes[i]);
      }
    }
    for (let i = 0; i < recordedAttributes.length; i++) {
      let attribute = recordedAttributes[i];
      recordedAttributes[i] = this.renameMap[attribute];
    }
    return recordedAttributes;
  }

  getAttributeKeys(checkup) {
    let recordedAttributes = [];
    let allAttributes = Object.keys(checkup);
    for (let i = 0; i < allAttributes.length; i++) {
      if (allAttributes[i] === '_id' || 
        allAttributes[i] === 'date' || 
        allAttributes[i] === 'vet' || 
        allAttributes[i] === 'pet' || 
        allAttributes[i] === 'weight' || 
        allAttributes[i] === 'owner' || 
        allAttributes[i] === '__v') {
      }
      else if (checkup[allAttributes[i]].length > 0) {
        recordedAttributes.push(allAttributes[i]);
      }
    }
    return recordedAttributes;
  }

  renameMap = {
    weight: 'Weight',
    temperature: 'Temperature',
    pulse: 'Pulse',
    respiration: 'Respiration',
    abdomen: 'Abdomen',
    legs: 'Legs',
    feet: 'Feet',
    joints: 'Joints',
    genitals: 'Genitals',
    anus: 'Anus',
    ears: 'Ears',
    eyes: 'Eyes',
    mouth: 'Mouth',
    coat: 'Coat',
    waste: 'Waste',
    claws: 'Claws',
    temperament: 'Temperament',
    diet: 'Diet',
    wasteHabits: 'Waste Habits',
    energyLevel: 'Energy Level',
    miscNotes: 'Misc Notes'
  }

  constructor() { }
}

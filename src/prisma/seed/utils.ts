import { faker } from '@faker-js/faker';

const INSTITUTE_SUFFIXES = ['University', 'College', 'Institute'];

export const INDUSTRIES = [
  "Technology", 
  "Healthcare", 
  "Finance", 
  "Education", 
  "Retail"
];

export const DEGREES = [
    "Computer Science", 
    "Economics", 
    "Mechanical Engineering", 
    "Biology", 
    "Finance"
];

export const FIELDS_OF_STUDY = [
  'Computer Science', 
  'Electrical Engineering', 
  'Business Administration', 
  'Psychology', 
  'Nursing', 
  'English Literature', 
  'Biology', 
  'Economics'
];

export function generateInstitute() {
    const suffix = faker.helpers.arrayElements(INSTITUTE_SUFFIXES);
    return `${faker.company.name()} ${suffix}`
}

export function getEnumValue<T extends object>(enumObj: T): T[keyof T] {
    return faker.helpers.arrayElement(
        Object.values(enumObj) as T[keyof T][]
    );
}

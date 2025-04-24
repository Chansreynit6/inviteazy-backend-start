import { z } from 'zod';

const nameSchema = z.string();
const portSchema = z.number().int().positive();
console.log(nameSchema.parse("John"));
console.log(portSchema.parse(2));

console.log('Hello world');
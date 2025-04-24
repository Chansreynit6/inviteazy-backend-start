"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const nameSchema = zod_1.z.string();
const portSchema = zod_1.z.number().int().positive();
console.log(nameSchema.parse("John"));
console.log(portSchema.parse(2));
console.log('Hello world');

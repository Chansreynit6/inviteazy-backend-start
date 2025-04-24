"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const nameSchema = zod_1.z.string();
nameSchema.parse("John"); // ✅
// nameSchema.parse("hi");     

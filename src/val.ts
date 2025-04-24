
import { z } from 'zod';

const nameSchema = z.string();
nameSchema.parse("John"); // ✅
// nameSchema.parse("hi");     
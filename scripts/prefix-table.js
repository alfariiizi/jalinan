import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

/* eslint-disable */

// Set up __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.join(__dirname, "prisma", "schema.prisma");

async function updateSchemaWithPrefix() {
  try {
    let schema = await fs.readFile(schemaPath, "utf8");

    // Regular expression to find model declarations
    const modelRegex = /model\s+(\w+)\s+{/g;
    schema = schema.replace(modelRegex, (match, modelName) => {
      return `${match}\n  @@map("af_${modelName.toLowerCase()}")`;
    });

    await fs.writeFile(schemaPath, schema);
    console.log("Schema updated with table prefixes!");
  } catch (error) {
    console.error("Error updating schema:", error);
  }
}

void updateSchemaWithPrefix();

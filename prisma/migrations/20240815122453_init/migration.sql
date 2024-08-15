/*
  Warnings:

  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" DATETIME,
    "passwordHash" TEXT NOT NULL,
    "gogleId" TEXT,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("avatarUrl", "bio", "createdAt", "email", "emailVerified", "gogleId", "id", "name", "passwordHash", "username") SELECT "avatarUrl", "bio", "createdAt", "email", "emailVerified", "gogleId", "id", "name", "passwordHash", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_gogleId_key" ON "users"("gogleId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

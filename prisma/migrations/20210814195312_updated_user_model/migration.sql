-- AlterTable
ALTER TABLE "User" ADD COLUMN     "OneTimePassword" INTEGER,
ADD COLUMN     "PasswordResetToken" TEXT,
ADD COLUMN     "PasswordResetTokenExpiry" DOUBLE PRECISION,
ADD COLUMN     "avatar" TEXT DEFAULT E'https://res.cloudinary.com/iib-webdevs/image/upload/v1601031013/DontDeleteMe/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg',
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastTyped" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "User.email_username_firstName_lastName_index" ON "User"("email", "username", "firstName", "lastName");

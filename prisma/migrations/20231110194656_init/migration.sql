-- CreateTable
CREATE TABLE `userMemoDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `dataTime` DATETIME(3) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    INDEX `userMemoDetails_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `googleId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(255) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,
    `taskListId` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_googleId_key`(`googleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

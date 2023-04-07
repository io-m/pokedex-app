/*
  Warnings:

  - You are about to drop the `_PokemonToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PokemonToUser" DROP CONSTRAINT "_PokemonToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PokemonToUser" DROP CONSTRAINT "_PokemonToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pokemonLikes" INTEGER[];

-- DropTable
DROP TABLE "_PokemonToUser";

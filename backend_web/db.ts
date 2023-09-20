import { Day, Game, PrismaClient, User } from "./generated/client/deno/edge.ts";
import { config } from "https://deno.land/std@0.163.0/dotenv/mod.ts";

const envVars = await config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envVars.DATABASE_URL,
    },
  },
});

/**
 * User CRUD
 */

export async function createUser() {
  const result = await prisma.user.create({});
  return result;
}

export async function upsertUser(id: number) {
  const result = await prisma.user.upsert({
    where: {
      id,
    },
    update: {},
    create: {
      id,
    },
  });
  return result;
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return user;
}

export async function updateUser(user: User) {
  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });
  return result;
}

export async function deleteUser(id: number) {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
}

/**
 * Game CRUD
 */

export async function createGame(
  userId: number,
  number: number,
  name: string,
  year: number,
  playerName?: string,
) {
  const result = await prisma.game.create({
    data: {
      userId,
      number,
      name,
      playerName,
      year,
    },
  });
  return result;
}

export async function getAllGames() {
  const games = await prisma.game.findMany();
  return games;
}

export async function getGameById(id: number) {
  const game = await prisma.game.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return game;
}

export async function getGameByUserIdAndGameNumber(
  userId: number,
  gameNumber: number,
) {
  const game = await prisma.game.findFirstOrThrow({
    where: {
      id: userId,
      number: gameNumber,
    },
  });
  return game;
}

export async function updateGame(game: Game) {
  const result = await prisma.game.update({
    where: {
      id: game.id,
    },
    data: {
      ...game,
    },
  });
  return result;
}

export async function deleteGame(id: number) {
  const result = await prisma.game.delete({
    where: {
      id,
    },
  });
  return result;
}

/**
 * Day CRUD
 */

export async function createDay(
  gameId: number,
  dayNumber: number,
) {
  const result = await prisma.day.create({
    data: {
      number: dayNumber,
      gameId,
    },
  });
  return result;
}

export async function getDayById(id: number) {
  const day = await prisma.day.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return day;
}

export async function getDaysByGameId(gameId: number) {
  const days = await prisma.day.findMany({
    where: {
      gameId,
    },
  });
  return days;
}

export async function updateDay(day: Day) {
  const result = await prisma.day.update({
    where: {
      id: day.id,
    },
    data: {
      ...day,
    },
  });
  return result;
}

/**
 * Challenge Modifier CRUD
 */

export async function getAllChallengeModifiers() {
  const challengeModifiers = await prisma.challengeModifier.findMany();
  return challengeModifiers;
}

/**
 * Modifier Option CRUD
 */

export async function getAllModifierOptions() {
  const modifierOptions = await prisma.modifierOption.findMany();
  return modifierOptions;
}

export async function getModifierOptionsByChallengeModifierId(
  challengeModifierId: number,
) {
  const modifierOptions = await prisma.modifierOption.findMany({
    where: {
      challengeModifierId,
    },
  });
  return modifierOptions;
}

import { Prisma } from '@prisma/client'

export class Constants {
  // uuid validation
  static readonly UUID_LENGTH: number = 36

  // soft delete table names
  static readonly MODEL_NAMES: Prisma.ModelName[] = ['Post']
}

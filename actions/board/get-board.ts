"use server"

import { db } from "@/lib/db";

export async function getBoards(organizationId: string) {
    const boards = await db.board.findMany({
      where: {
        organization: {
          id: organizationId
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return boards;
  }
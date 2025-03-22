'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { boardSchema } from '@/schemas/board.schema';
import { revalidatePath } from 'next/cache';

export interface BoardTypes {
  id?: string;
  title: string;
  organizationId?: string;
}

export default async function createBoard(data: BoardTypes) {
  const parseResult = boardSchema.safeParse({
    title: data?.title
  });
  
  if (!parseResult.success) {
    throw new Error('Invalid board data');
  }
  
  const { title } = parseResult.data;
  
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  
  if (!data.title) {
    throw new Error('Missing Board Title');
  }
  
  try {
    const board = await db.board.create({
      data: {
        title: title,
        createdBy: {
          connect: {
            id: session.user.id
          }
        },
        organization: data.organizationId ? {
          connect: {
            id: data.organizationId
          }
        } : undefined
      },
    });
    
    // Make sure this path matches your actual route structure
    // The leading slash is important
    revalidatePath(`/organization/${data.organizationId}`);
    
    return board;
  } catch (error) {
    console.error('Error creating board:', error);
    throw new Error('Failed to create board');
  }
}